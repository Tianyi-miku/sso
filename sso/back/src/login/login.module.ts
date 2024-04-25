import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { CacheService } from 'src/redis/cache.serve';
import { RedisModule } from 'src/redis/redis.module';
import { LoginloggerService } from 'src/loginlogger/loginlogger.service';
import { CryptoService } from 'src/auth/cryptoService';
import { ConfigService } from '@nestjs/config';
import { RoleService } from 'src/role/role.service';

@Module({
  imports: [RedisModule,],
  controllers: [LoginController],
  providers: [LoginService, CacheService, LoginloggerService, CryptoService, ConfigService,
    RoleService
  ]
})
export class LoginModule { }
