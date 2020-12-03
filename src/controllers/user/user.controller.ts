import { RegisterDTO } from '@/dtos/user/user.dto';
import { UserService } from '@/services/user/user.service';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

/*
 * 用户模块控制器
 * @Author: ahwgs
 * @Date: 2020-11-21 14:46:44
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-03 13:56:26
 */

@ApiBearerAuth()
@ApiTags('用户模块')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册', description: '账号注册' })
  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return this.userService.register(body);
  }
}
