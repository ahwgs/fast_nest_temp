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
import { classToPlain } from 'class-transformer';
import { isObject } from 'util';
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, THttpResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<THttpResponse<T>> {
    const req = context.getArgByIndex(1).req;
    const timestamp = Date.now();
    return next.handle().pipe(
      map((data) => {
        if (isObject(data)) {
          return {
            result: data,
            code: ApiCodeEnum.SUCCESS,
            message: 'success',
            timestamp,
            path: req.url,
            method: req.method,
          };
        }
        return {
          message: 'success',
          result: classToPlain(data),
          code: ApiCodeEnum.SUCCESS,
          path: req.url,
          method: req.method,
          timestamp,
        };
      }),
    );
  }
}
