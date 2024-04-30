import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, LoggerService } from '@nestjs/common';
import * as moment from 'moment';
import * as requestIp from 'request-ip';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    // 拿到响应和请求对象
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    // const status = exception.getStatus();
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // 记录日志
    this.logger.error(exception.message, exception.stack);

    console.log(exception);

    // 响应错误信息
    response.status(httpStatus).json({
      code: `HTTP_${httpStatus}`,
      msg: exception.message || exception.name,
      data: {
        headers: request.headers,
        query: request.query,
        body: request.body,
        params: request.params,
        code: httpStatus,
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        path: request.url,
        method: request.method,
        ip: requestIp.getClientIp(request),
        error: exception.message || exception.name
      }
    });
  }
}
