import { Module } from '@nestjs/common';
import { ScheduleRemoveLogService } from './schedule-remove-log.service';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  providers: [ScheduleRemoveLogService, LoggerService]
})
export class ScheduleRemoveLogModule { }
