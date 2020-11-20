import { ApiCodeEnum } from '@/enum/api-code.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * api请求异常类
 *
 * @export
 * @class ApiException
 * @extends {HttpException}
 */
export class ApiException extends HttpException {
  private errorMessage: string;
  private errorCode: ApiCodeEnum;

  constructor(
    errorMessage: string,
    errorCode: ApiCodeEnum,
    statusCode: HttpStatus,
  ) {
    super(errorMessage, statusCode);
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }
  getErrorCode(): ApiCodeEnum {
    return this.errorCode;
  }
  getErrorMessage(): string {
    return this.errorMessage;
  }
}
