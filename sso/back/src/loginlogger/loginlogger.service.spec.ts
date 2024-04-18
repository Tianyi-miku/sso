import { Test, TestingModule } from '@nestjs/testing';
import { LoginloggerService } from './loginlogger.service';

describe('LoginloggerService', () => {
  let service: LoginloggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginloggerService],
    }).compile();

    service = module.get<LoginloggerService>(LoginloggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
