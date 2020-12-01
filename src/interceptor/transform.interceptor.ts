import { ApiCodeEnum } from '@/enum';
import { THttpResponse } from '@/interfaces';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as express from 'express';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpArguments = context.switchToHttp();
    const request: express.Request = httpArguments.getRequest();
    const timestamp = Date.now();
    return next.handle().pipe(
      map((data) => ({
        result: data,
        code: ApiCodeEnum.SUCCESS,
        message: 'success',
        timestamp,
        path: request.url,
        method: request.method,
      })),
    );
  }
}
