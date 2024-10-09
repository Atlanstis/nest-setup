import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseData } from '../classes';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = exception.message;

    // 处理 404 异常
    if (exception instanceof NotFoundException) {
      message = `未查询到接口：${request.url}`;
    }

    // 快速创建满足格式的数据
    const data = ResponseData.error(undefined, message);

    response.status(HttpStatus.OK).json(data);
  }
}
