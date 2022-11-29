import { BadGatewayException, Controller, Get, Param } from '@nestjs/common';
import { IPAddress } from 'src/types/ip-address';
import { PingService } from './ping.service';

@Controller('ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @Get('/:ip')
  async ping(@Param('ip') ip: string) {
    try {
      await this.pingService.pingIp(IPAddress.fromString(ip));
    } catch (error) {
      throw new BadGatewayException(error.message);
    }

    return {};
  }
}
