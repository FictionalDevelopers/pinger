import { Module } from '@nestjs/common';
import { PingController } from './ping/ping.controller';
import { ChildProcessPingService } from './ping/service/child-process.ping.service';
import { ServiceProvider } from './provider-tokens/service-provider-tokens';

@Module({
  imports: [],
  controllers: [PingController],
  providers: [
    {
      provide: ServiceProvider.PingService,
      useClass: ChildProcessPingService,
    },
  ],
})
export class AppModule {}
