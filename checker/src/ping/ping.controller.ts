import {
  BadGatewayException,
  Controller,
  Get,
  Inject,
  Param,
} from '@nestjs/common';
import { ServiceProvider } from 'src/provider-tokens/service-provider-tokens';
import { IPAddress } from 'src/types/ip-address';
import { PingHistoryService } from './ping-history/ping-history.service';
import { PingService } from './ping-service/ping.service';

@Controller('ping')
export class PingController {
  constructor(
    @Inject(ServiceProvider.Ping)
    private readonly pingService: PingService,

    @Inject(ServiceProvider.PingHistory)
    private readonly pingHistoryService: PingHistoryService,
  ) {}

  @Get('/:ip')
  async ping(@Param('ip') ip: string) {
    try {
      const status = await this.pingService.pingIp(IPAddress.fromString(ip));

      await this.pingHistoryService.acknowledge({
        host: ip,
        status,
        time: new Date(),
      });

      return { status };
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
