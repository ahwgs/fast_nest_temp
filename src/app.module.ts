import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomConfigModule } from './modules/base/config.module';
import { DataBaseModule } from './modules/base/database.module';
import { CommonModule } from './modules/common/common.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CustomConfigModule, DataBaseModule, CommonModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
