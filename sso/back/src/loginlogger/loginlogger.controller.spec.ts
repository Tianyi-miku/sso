import { Test, TestingModule } from '@nestjs/testing';
import { LoginloggerController } from './loginlogger.controller';

describe('LoginloggerController', () => {
  let controller: LoginloggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginloggerController],
    }).compile();

    controller = module.get<LoginloggerController>(LoginloggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
