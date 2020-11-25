import { Controller, Get, Render } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
    // return '123123';
    // return [];
    // throw new Error('1231');
  }
}
