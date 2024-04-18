import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/guard';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from './redis/redis.module';
import { CacheService } from './redis/cache.serve';

@Module({
  imports: [
    LoginModule,
    UserModule,
    HttpModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    RedisModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    CacheService
  ],
})
export class AppModule { }
