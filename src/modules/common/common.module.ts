import { Module } from '@nestjs/common';
import { CodeModule } from './code.module';
import { JwtModule } from './jwt.module';
import { RedisModule } from './redis.module';

/**
 * 基础服务模块
 */
@Module({
  imports: [CodeModule, RedisModule, JwtModule],
  controllers: [],
  exports: [CodeModule, RedisModule, JwtModule],
})
export class CommonModule {}
