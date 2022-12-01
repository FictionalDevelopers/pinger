import { IPAddress } from 'src/types/ip-address';
import { TargetStatus } from './entities/target-status';

export interface PingService {
  pingIp(ip: IPAddress): Promise<TargetStatus>;
}
