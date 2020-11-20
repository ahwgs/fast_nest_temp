import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // return 'Hello World!';
    throw new Error('11111');
  }
}
