/*
 * @Author: ahwgs
 * @Date: 2020-12-01 15:31:12
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-02 18:05:11
 */

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDTO {
  @ApiProperty({
    name: '账号',
  })
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString({ message: '账号必须是 String 类型' })
  readonly account: string;

  @ApiProperty({
    name: '密码',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是 String 类型' })
  readonly password: string;

  @ApiProperty({
    name: '账号类型',
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
