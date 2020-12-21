import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccountModule } from './modules/account/account.module';
import { CustomConfigModule } from './modules/base/config.module';
import { DataBaseModule } from './modules/base/database.module';
import { EmailModule } from './modules/base/email.module';
import { CustomRedisModule } from './modules/base/redis.module';
import { CommonModule } from './modules/common/common.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CustomConfigModule,
    DataBaseModule,
    CustomRedisModule,
    EmailModule,
    CommonModule,
    UserModule,
    AccountModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
