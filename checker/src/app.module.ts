import { Module } from '@nestjs/common';
import { DummyPingEffectNotificationService } from './ping/ping-effect-notification/ping-effect-notification.service';
import { DummyPingHistoryRepository } from './ping/ping-history/ping-history.repository';
import { DummyPingHistoryService } from './ping/ping-history/ping-history.service';
import { PingController } from './ping/ping.controller';
import { RepositoryProvider } from './provider-tokens/repository-provider-tokens';
import { ServiceProvider } from './provider-tokens/service-provider-tokens';
import { ChildProcessPingService } from './ping/ping-service/child-process.ping.service';
import { HealthzController } from './healthz/healthz.controller';

@Module({
  imports: [],
  controllers: [PingController, HealthzController],
  providers: [
    {
      provide: ServiceProvider.Ping,
      useClass: ChildProcessPingService,
    },
    {
      provide: ServiceProvider.PingHistory,
      useClass: DummyPingHistoryService,
    },
    {
      provide: ServiceProvider.PingEffectNotificationService,
      useClass: DummyPingEffectNotificationService,
    },
    {
      provide: RepositoryProvider.PingHistory,
      useClass: DummyPingHistoryRepository,
    },
  ],
})
export class AppModule {}
