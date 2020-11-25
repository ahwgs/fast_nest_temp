import { DataBaseModule } from '@/modules/database.module';
import { LoggingInterceptor } from '@/interceptor/logger.interceptor';
import { UserModule } from '@/modules/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomConfigModule } from './modules/config.module';

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
