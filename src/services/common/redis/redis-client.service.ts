import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisClientService {
  public client: Redis;
  constructor(private redisService: RedisService) {}

  onModuleInit() {
    this.getClient();
  }

  public getClient() {
    this.client = this.redisService.getClient();
  }

  public async set(
    key: string,
    value: Record<string, unknown> | string,
    second?: number,
  ) {
    value = JSON.stringify(value);
    // 如果没有传递时间就默认时间
    if (!second) {
      await this.client.setex(key, 24 * 60 * 60, value); // 秒为单位
    } else {
      await this.client.set(key, value, 'EX', second);
    }
  }

  public async get(key: string): Promise<any> {
    const data = await this.client.get(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  public async del(key: string): Promise<any> {
    await this.client.del(key);
  }

  public async flushall(): Promise<any> {
    await this.client.flushall();
  }
}
