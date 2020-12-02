/*
 * @Author: ahwgs
 * @Date: 2020-12-01 15:31:12
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-02 10:05:02
 */

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class RegisterDTO {
  @ApiProperty()
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString({ message: '账号必须是 String 类型' })
  readonly account: string;

  @ApiProperty()
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是 String 类型' })
  readonly password: string;
}
