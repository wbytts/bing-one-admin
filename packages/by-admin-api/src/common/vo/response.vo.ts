import { ResponseCode } from "../enum/response-code.enum";

export class R {
  static ok(data: any, code: string | number = ResponseCode.SUCCESS, msg: string = '操作成功'): object {
    return { code, data, msg };
  }

  static error(data: any, code: string | number = ResponseCode.FAILED, msg: string = '操作失败'): object {
    return { code, data, msg };
  }
}
