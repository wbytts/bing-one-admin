export class R {
  static ok(data: any, code: string | number = 0, msg: string = '操作成功'): object {
    return { code, data, msg };
  }

  static error(data: any, code: string | number = 1, msg: string = '操作失败'): object {
    return { code, data, msg };
  }
}
