import { Module } from '@nestjs/common';
import * as Redis from 'ioredis'

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        //@ts-expect-error
        return new Redis({
          // Redis服务器配置
          host: process.env.Redis_URL,
          port: process.env.Redis_HOST
          // 其他选项...
        })
      }
    }
  ],
  exports: ['REDIS_CLIENT']
})
export class RedisModule { }

