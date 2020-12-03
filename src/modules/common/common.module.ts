import { Module } from '@nestjs/common';
import { CodeModule } from './code.module';
import { RedisModule } from './redis.module';

/**
 * 基础服务模块
 */
@Module({
  imports: [CodeModule, RedisModule],
  providers: [],
  controllers: [],
  exports: [CodeModule, RedisModule],
})
export class CommonModule {}
