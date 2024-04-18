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
import { LoggingInterceptor } from './logger/logger';
import { LoggerService } from './logger/logger.service';
import { RoleModule } from './role/role.module';
import { LoggerController } from './logger/logger.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleRemoveLogModule } from './schedule-remove-log/schedule-remove-log.module';
import { RedisModule } from './redis/redis.module';
import { CacheService } from './redis/cache.serve';
import { ClientModule } from './client/client.module';
import { LoginloggerModule } from './loginlogger/loginlogger.module';
import { LoginloggerService } from './loginlogger/loginlogger.service';

@Module({
  imports: [LoginModule, UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    RoleModule,
    ScheduleModule.forRoot(),
    ScheduleRemoveLogModule,
    RedisModule,
    ClientModule,
    LoginloggerModule,
  ],
  controllers: [AppController, UserController, LoggerController],
  providers: [AppService, UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    LoggerService,
    CacheService,
    LoginloggerService
  ],
})
export class AppModule { }
