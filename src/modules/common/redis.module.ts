import { RedisClientService } from '@/services/common/redis/redis-client.service';
import { RedisCacheService } from '@/services/common/redis/redis.cache.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [RedisClientService, RedisCacheService],
  exports: [RedisClientService, RedisCacheService],
})
export class RedisModule {}
