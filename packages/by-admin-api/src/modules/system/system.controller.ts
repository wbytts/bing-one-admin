import { Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags("系统管理")
@Controller("system")
export class SystemController {

  @ApiOperation({ summary: "获取当前系统时间戳" })
  @Post("/timestamp")
  async getCurrentTimestamp() {
    return {
      code: 200,
      message: "请求成功",
      data: new Date().getTime()
    };
  }

}
