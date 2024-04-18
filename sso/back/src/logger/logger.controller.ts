import { Body, Controller, Post } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { Logger } from '@prisma/client';

export interface loggerParams extends Logger {
  pageSize: number
  pageNum: number
}

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) { }

  @Post('/list')
  getlist(@Body() parms: loggerParams) {
    return this.loggerService.getList(parms)
  }
}
