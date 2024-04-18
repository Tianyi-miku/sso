import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { CacheService } from 'src/redis/cache.serve';
import { RedisModule } from 'src/redis/redis.module';
import { LoginloggerService } from 'src/loginlogger/loginlogger.service';

@Module({
  imports: [RedisModule],
  controllers: [LoginController],
  providers: [LoginService, CacheService, LoginloggerService]
})
export class LoginModule { }
