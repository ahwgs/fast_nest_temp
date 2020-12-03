import { ApiCodeEnum } from '@/enum/api-code.enum';
import { THttpResponse } from '@/interfaces/http.interface';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as express from 'express';
import { classToPlain } from 'class-transformer';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, THttpResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<THttpResponse<T>> {
    const httpArguments = context.switchToHttp();
    const request: express.Request = httpArguments.getRequest();
    const timestamp = Date.now();
    return next.handle().pipe(
      map((data) => ({
        result: classToPlain(data) || data,
        code: ApiCodeEnum.SUCCESS,
        message: 'success',
        timestamp,
        path: request.url,
        method: request.method,
      })),
    );
  }
}
