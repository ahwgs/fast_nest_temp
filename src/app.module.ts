import { LoggingInterceptor } from '@/interceptor';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataBaseModule, CustomConfigModule, UserModule } from '@/modules';

@Module({
  imports: [CustomConfigModule, DataBaseModule, UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // 定义日志拦截器
    },
  ],
})
export class AppModule {}
