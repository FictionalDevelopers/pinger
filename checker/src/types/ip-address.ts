import { isIP } from 'node:net';

export class IPAddress {
  static fromString(ip: string): IPAddress {
    if (!isIP(ip)) {
      throw new Error('Invalid IP');
    }

    return new IPAddress(ip);
  }

  private constructor(public address: string) {}
}
