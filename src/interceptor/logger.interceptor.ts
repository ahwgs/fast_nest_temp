import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Logger } from '@/utils/log4js';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const method = request.method;
    const url = request.url;
    const status = response.statusCode;
    const now = Date.now();

    return next.handle().pipe(
      tap((res) => {
        // 系统错误的进错误日志
        // 其他的都进access
        Logger.access(
          `method:${method} httpstatusCode:${status} originUrl:${url} responseTime:${
            Date.now() - now
          }ms`,
          context.getClass().name,
        );
        Logger.access(
          `req header:${JSON.stringify(
            request.headers,
          )} req query:${JSON.stringify(
            request.query,
          )} req body:${JSON.stringify(request.body)} res:${JSON.stringify(
            res,
          )} res :${response}`,
          context.getClass().name,
        );
      }),
      catchError((err) => {
        Logger.error(err);
        throw new Error(err);
      }),
    );
  }
}
