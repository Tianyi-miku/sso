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
          host: 'localhost',
          port: 6379
          // 其他选项...
        })
      }
    }
  ],
  exports: ['REDIS_CLIENT']
})
export class RedisModule { }

