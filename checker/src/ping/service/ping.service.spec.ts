import { Test, TestingModule } from '@nestjs/testing';
import { ChildProcessPingService } from './child-process.ping.service';
import { PingService } from './ping.service';

describe('PingService', () => {
  let service: PingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChildProcessPingService],
    }).compile();

    service = module.get<PingService>(ChildProcessPingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
