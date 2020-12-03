import { Injectable } from '@nestjs/common';
import { RedisClientService } from './redis-client.service';
@Injectable()
export class RedisCacheService extends RedisClientService {
  /**
   * 设置
   * @param key
   * @param value
   * @param second
   */
  public async set(key: string, value: any, second?: number): Promise<any> {
    value = JSON.stringify(value);
    if (!this.client) {
      this.getClient();
    }
    if (!second) {
      await this.client.set(key, value);
    } else {
      await this.client.set(key, value, 'EX', second);
    }
  }

  public async get(key: string): Promise<any> {
    if (!this.client) {
      this.getClient();
    }
    const data = await this.client.get(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  public async del(key: string): Promise<any> {
    if (!this.client) {
      this.getClient();
    }
    await this.client.del(key);
  }

  public async flushall(): Promise<any> {
    if (!this.client) {
      this.getClient();
    }
    await this.client.flushall();
  }
}
