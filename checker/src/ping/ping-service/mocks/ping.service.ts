import { PingService } from '../ping.service';
import { TargetStatus } from '../entities/target-status';

export class MockPingService implements PingService {
  async pingIp(): Promise<TargetStatus> {
    return Date.now() % 2 === 0 ? TargetStatus.Online : TargetStatus.Offline;
  }
}
