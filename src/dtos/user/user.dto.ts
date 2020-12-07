/*
 * @Author: ahwgs
 * @Date: 2020-12-01 15:31:12
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-03 16:57:28
 */

import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserAccountDTO {
  @ApiProperty({
    name: 'account',
  })
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString({ message: '账号必须是 String 类型' })
  readonly account: string;

  @ApiProperty({
    name: 'password',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是 String 类型' })
  readonly password: string;

  @ApiProperty({
    name: 'accountType',
  })
  @IsNotEmpty({ message: '账号类型不能为空' })
  @IsNumber(
    {},
    {
      message: '账号类型只能是数字',
    },
  )
  readonly accountType: number;
}
export class LoginDTO extends UserAccountDTO {
  @ApiProperty({
    name: 'code',
  })
  @IsNotEmpty({ message: '图形验证码不能为空' })
  @IsString({ message: '图形验证码必须是 String 类型' })
  readonly code: string;

  @ApiProperty({
    name: 'codeId',
  })
  @IsNotEmpty({ message: '图形验证码唯一id不能为空' })
  @IsUUID(4, { message: 'codeId不是UUID' })
  readonly codeId: string;
}

export class RegisterDTO extends UserAccountDTO {
  @ApiProperty({
    name: 'code',
  })
  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString({ message: '验证码必须是 String 类型' })
  readonly code: string;
}

export class EmailDTO {
  @ApiProperty({
    name: 'email',
  })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '请输入正确的邮箱' })
  readonly email: string;
}
