import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataBaseModule, CustomConfigModule, UserModule } from '@/modules';

@Module({
  imports: [CustomConfigModule, DataBaseModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
