import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class ScheduleRemoveLogService {

  constructor(private readonly loggerService: LoggerService) { }

  private readonly logger = new Logger(ScheduleRemoveLogService.name);


  @Cron(CronExpression.EVERY_WEEKDAY)
  // @Cron('15 * * * * *')
  async handleCron() {
    await this.loggerService.removeLog()
    this.logger.debug('Called when the current second is 45');
  }

}

