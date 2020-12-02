import { RegisterDTO } from '@/dtos';
import { UserService } from '@/services';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

/*
 * 用户模块控制器
 * @Author: ahwgs
 * @Date: 2020-11-21 14:46:44
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-01 15:36:50
 */

@ApiBearerAuth()
@ApiTags('用户模块')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    console.log('body', body);
  }
}
