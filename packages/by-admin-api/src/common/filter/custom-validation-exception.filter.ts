import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus, LoggerService } from '@nestjs/common';
import * as moment from 'moment';
import * as requestIp from 'request-ip';
import { CustomValidationException } from '../exception/custom-validation.exception';

@Catch(CustomValidationException)
export class CustomValidationExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: BadRequestException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    // 拿到响应和请求对象
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    // const status = exception.getStatus();
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // 记录日志
    this.logger.error(JSON.stringify(exception));

    // 响应错误信息
    response.status(httpStatus).json({
      code: `HTTP_${httpStatus}`,
      msg: '参数校验未通过',
      data: exception.getResponse()
    });
  }
}
