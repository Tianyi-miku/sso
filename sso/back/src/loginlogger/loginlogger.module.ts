import { Module } from '@nestjs/common';
import { LoginloggerController } from './loginlogger.controller';
import { LoginloggerService } from './loginlogger.service';

@Module({
  controllers: [LoginloggerController],
  providers: [LoginloggerService]
})
export class LoginloggerModule {}
