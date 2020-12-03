import { RegisterDTO, LoginDTO } from '@/dtos/user/user.dto';
import { UserService } from '@/services/user/user.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

/*
 * 用户模块控制器
 * @Author: ahwgs
 * @Date: 2020-11-21 14:46:44
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-03 16:59:51
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

  @ApiOperation({ summary: '图形验证码', description: '账号注册' })
  @Get('captcha')
  async imgCaptcha() {
    return this.userService.createImgCaptcha();
  }

  @ApiOperation({ summary: '登录', description: '账号登录' })
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.userService.login(body);
  }
}
