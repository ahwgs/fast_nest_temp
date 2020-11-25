import { ApiCodeEnum } from '@/enum/api-code.enum';
import { ApiException } from '@/exception/api-exception';
import { CommonText } from '@/config/module/cmomon.text';
import { IHttpResponse } from '@/interfaces/http.interface';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const timestamp = Date.now();
    let errorResponse: IHttpResponse = null;
    const message = exception.message;
    const path = request.url;
    const method = request.method;
    const result = null;

    if (exception instanceof ApiException) {
      const message = exception.getErrorMessage();
      errorResponse = {
        result,
        code: exception.getErrorCode(),
        message,
        path,
        method,
        timestamp,
      };
    } else {
      errorResponse = {
        result,
        message:
          typeof message === 'string'
            ? message || CommonText.REQUEST_ERROR
            : JSON.stringify(message),
        path,
        method,
        timestamp,
        code: ApiCodeEnum.SYSTEM_ERROR,
      };
    }

    response.status(HttpStatus.OK);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
