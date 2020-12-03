/*
 * @Author: ahwgs
 * @Date: 2020-12-03 17:16:39
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-03 18:58:05
 */
import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvRedisOptions } from '@/config/env/redis.config';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisOptions = configService.get<EnvRedisOptions>(
          'EnvRedisOptions',
        );
        return {
          host: redisOptions.host,
          port: redisOptions.port as number,
          password: redisOptions.password,
          db: 0, // default
        };
      },
    }),
  ],
  exports: [],
})
export class CustomRedisModule {}
