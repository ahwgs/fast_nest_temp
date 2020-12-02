/*
 * @Author: ahwgs
 * @Date: 2020-12-02 10:22:19
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-02 11:19:15
 */

import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ApiException } from '@/exception/api-exception';
import { ApiCodeEnum } from '@/enum';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    // 如果没有传入验证规则，则不验证，直接返回数据
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      //获取第一个错误并且返回
      const msg = Object.values(errors[0].constraints)[0];
      // 统一抛出异常
      throw new ApiException(`${msg}`, ApiCodeEnum.WARN, HttpStatus.OK);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
