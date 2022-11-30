import { IPAddress } from 'src/types/ip-address';

export interface PingService {
  pingIp(ip: IPAddress): Promise<void>;
}
