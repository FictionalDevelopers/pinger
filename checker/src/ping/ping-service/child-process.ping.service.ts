import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { IPAddress } from 'src/types/ip-address';
import { TargetStatus } from './entities/target-status';
import { PingService } from './ping.service';

@Injectable()
export class ChildProcessPingService implements PingService {
  async pingIp(ip: IPAddress): Promise<TargetStatus> {
    return new Promise((resolve, reject) => {
      let result = '';

      const ping = spawn('ping', ['-W', '100', '-c', '1', ip.address]);

      ping.once('error', reject);

      ping.once('close', () => {
        console.log('[RESULT]', result);

        return resolve(
          result.includes('1 packets received')
            ? TargetStatus.Online
            : TargetStatus.Offline,
        );
      });

      ping.stdout.on('data', (chunk: Buffer) => {
        result += `\n${chunk.toString('utf-8')}`;
      });
    });
  }
}
