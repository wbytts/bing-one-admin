import { Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { R } from "src/common/vo/response.vo";


@ApiTags("系统管理")
@Controller("system")
export class SystemController {

  @ApiOperation({ summary: "获取当前系统时间戳" })
  @Post("/timestamp")
  async getCurrentTimestamp() {
    return R.ok(new Date().getTime())
  }

}
