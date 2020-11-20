import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: '默认路径接口',
    description: '所在位置：app.controller.ts',
  })
  @ApiCreatedResponse({
    description: '链接成功创建,其实就是201状态的描述',
    status: 200,
  })
  @HttpCode(200)
  getHello(): string {
    return this.appService.getHello();
  }
}
