import { Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("角色")
@Controller("role")
export class RoleController {
  @ApiOperation({ summary: "角色列表" })
  @Post("list")
  list() {
    return null;
  }

  @ApiOperation({ summary: "添加角色" })
  @Post("add")
  add() {
    return null;
  }

  @ApiOperation({ summary: "修改角色" })
  @Post("update")
  update() {
    return null;
  }
}
