import {
  BadGatewayException,
  Controller,
  Get,
  Inject,
  Query,
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

  @Get('/')
  async ping(@Query('host') host: string) {
    try {
      const status = await this.pingService.pingIp(IPAddress.fromString(host));

      await this.pingHistoryService.acknowledge({
        host,
        status,
        time: new Date(),
      });

      return { status };
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
