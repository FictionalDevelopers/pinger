import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { IPAddress } from 'src/types/ip-address';

@Injectable()
export class PingService {
  async pingIp(ip: IPAddress): Promise<void> {
    return new Promise((resolve, reject) => {
      let result = '';

      const ping = spawn('ping', ['-W', '100', '-c', '1', ip.address]);

      ping.once('error', reject);

      ping.once('close', () => {
        if (result.includes('1 packets received')) {
          return resolve();
        }

        return reject(new Error('No connection'));
      });

      ping.stdout.on('data', (chunk: Buffer) => {
        result += `\n${chunk.toString('utf-8')}`;
      });
    });
  }
}
