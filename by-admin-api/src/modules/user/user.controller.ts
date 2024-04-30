import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { EntityManager, Repository } from "typeorm";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import QueryUserDto from "./dto/query-user.dto";

// import { Logger } from "nestjs-pino";

@ApiBearerAuth()
@ApiTags("用户")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  private logger: Logger;

  @InjectEntityManager()
  private manager: EntityManager;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @ApiOperation({ summary: "创建用户" })
  @ApiResponse({ status: 200, description: "返回用户信息" })
  @ApiBody({ schema: { title: "用户信息" } })
  @Post("/create")
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return { code: 200, message: "添加成功" };
  }

  @ApiOperation({ summary: "分页查询" })
  @ApiBody({ schema: { title: "用户列表" } })
  @Post("/list")
  async list(@Body() params: QueryUserDto) {
    const [users, total] = await this.userService.queryPage(params.pageNum, params.pageSize);
    return {
      code: 200,
      msg: "查询成功",
      data: {
        list: users,
        total,
        pageNum: params.pageNum,
        pageSize: params.pageSize
      }
    };
  }

  @ApiOperation({ summary: "查询用户信息" })
  @Post("/findOne/:id")
  async findOne(@Param("id") id: string) {
    return await this.userService.findOne(id);
  }

  @ApiOperation({ summary: "修改用户信息" })
  @Post("/update/:id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(+id, updateUserDto);
    return "修改成功";
  }

  @ApiOperation({ summary: "删除用户" })
  @Post("/remove")
  async remove(@Param("id") id: string) {
    await this.userService.remove(+id);
    return "删除成功";
  }

  @ApiOperation({ summary: "获取当前用户信息" })
  @Post("/info")
  async getCurrentUserInfo() {
    return { message: "接口开发中" };
  }
}
