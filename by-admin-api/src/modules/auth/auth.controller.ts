import {Body, Controller, Post} from '@nestjs/common';
import {LoginDto} from "./dto/login.dto";
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";


@ApiTags("登录鉴权")
@Controller('auth')
export default class AuthController {


  @ApiOperation({summary: "用户登录"})
  @Post('/login')
  async login(@Body() params: LoginDto) {
    return {
      code: 200,
      data: {
        token: "test-token"
      },
      message: "登陆成功"
    }
  }

  @ApiOperation({summary: "用户注册"})
  @Post("/register")
  async register() {
    return {message: "接口开发中"}
  }

}
