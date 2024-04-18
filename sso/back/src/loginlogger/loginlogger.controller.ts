import { Body, Controller, Post } from '@nestjs/common';
import { LoginLogger } from '@prisma/client';
import { LoginloggerService } from './loginlogger.service';

export interface loggerParams extends LoginLogger {
  pageSize: number
  pageNum: number
}
@Controller('loginlogger')

export class LoginloggerController {
  constructor(private readonly loginloggerService: LoginloggerService) { }

  @Post('/list')
  getlist(@Body() parms: loggerParams) {
    return this.loginloggerService.getList(parms)
  }
}
