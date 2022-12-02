import { Controller, Get, Param } from '@nestjs/common';

@Controller('ping')
export class PingController {
  @Get('/:ip')
  async ping(@Param('ip') ip: string) {
    return { ip };
    // try {
    //   const status = await this.pingService.pingIp(IPAddress.fromString(ip));
    //
    //   await this.pingHistoryService.acknowledge({
    //     host: ip,
    //     status,
    //     time: new Date(),
    //   });
    //
    //   return { status };
    // } catch (error) {
    //   throw new BadGatewayException(error.message);
    // }
  }
}
