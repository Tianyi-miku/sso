import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(@Inject('REDIS_CLIENT') private redisClient: Redis) { }

  async set(key: string, value: any, ttl?: number) {
    if (ttl) {
      return this.redisClient.set(key, JSON.stringify(value), 'EX', ttl);
    }
    return this.redisClient.set(key, JSON.stringify(value), 'EX', 86400);
  }

  async get(key: string) {
    const value = await this.redisClient.get(key);
    if (!value) return null;
    return JSON.parse(value);
  }

  async deleteKey(key: string): Promise<number> {
    return this.redisClient.del(key);
  }
}