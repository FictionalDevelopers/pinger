import {
  BadGatewayException,
  Controller,
  Get,
  Inject,
  Param,
} from '@nestjs/common';
import { ServiceProvider } from 'src/provider-tokens/service-provider-tokens';
import { IPAddress } from 'src/types/ip-address';
import { PingService } from './service/ping.service';

@Controller('ping')
export class PingController {
  constructor(
    @Inject(ServiceProvider.PingService)
    private readonly pingService: PingService,
  ) {}

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
