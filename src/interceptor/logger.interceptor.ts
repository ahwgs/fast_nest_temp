import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Logger } from '@/utils';
import { ApiException } from '@/exception/api-exception';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private genAccessLog(request, time, res, status, context): any {
    const log = {
      statusCode: status,
      responseTime: `${Date.now() - time}ms`,
      ip: request.ip,
      header: request.headers,
      query: request.query,
      params: request.params,
      body: request.body,
      response: res,
    };
    Logger.access(JSON.stringify(log), `${context.getClass().name}`);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const status = response.statusCode;
    const now = Date.now();

    return next.handle().pipe(
      tap((res) => {
        // 其他的都进access
        this.genAccessLog(
          request,
          `${Date.now() - now}ms`,
          res,
          status,
          context,
        );
      }),
      catchError((err) => {
        if (err instanceof ApiException) {
          // 其他的都进access
          this.genAccessLog(
            request,
            `${Date.now() - now}ms`,
            err.getErrorMessage(),
            status,
            context,
          );
          Logger.error(err);
        } else {
          Logger.error(err);
        }
        // 返回原异常
        throw err;
      }),
    );
  }
}
