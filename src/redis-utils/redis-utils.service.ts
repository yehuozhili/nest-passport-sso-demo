import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisUtilsService {
  public client: Redis;
  constructor(private redisService: RedisService) {}

  onModuleInit(): void {
    this.getClient();
  }

  public getClient(): void {
    this.client = this.redisService.getClient();
  }

  public async set(
    key: string,
    value: { [propsName: string]: any } | string,
    second?: number,
  ): Promise<'OK'> {
    value = JSON.stringify(value);
    if (!second) {
      return await this.client.setex(key, 24 * 60 * 60, value);
    } else {
      return await this.client.set(key, value, 'EX', second);
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

  public async del(key: string): Promise<number> {
    return await this.client.del(key);
  }

  public async flushall(): Promise<'OK'> {
    return await this.client.flushall();
  }
}
