import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleRemoveLogService } from './schedule-remove-log.service';

describe('ScheduleRemoveLogService', () => {
  let service: ScheduleRemoveLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleRemoveLogService],
    }).compile();

    service = module.get<ScheduleRemoveLogService>(ScheduleRemoveLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
