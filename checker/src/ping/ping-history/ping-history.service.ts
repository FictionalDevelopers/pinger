import { Inject, Injectable } from '@nestjs/common';
import { RepositoryProvider } from 'src/provider-tokens/repository-provider-tokens';
import { ServiceProvider } from 'src/provider-tokens/service-provider-tokens';
import { PingHistoryEntry } from '../entities/ping-history-entry.entity';
import { PingEffectNotificationService } from '../ping-effect-handler/ping-effect-notification.service';
import {
  IdlePingEffect,
  PingEffect,
  StatusChangedPingEffect,
} from './entities/ping-effect';
import { FirstEntryPingEffect } from './entities/ping-effect/first-entry.ping-effect';
import { PingHistoryRepository } from './ping-history.repository';

export interface PingHistoryService {
  acknowledge(entry: PingHistoryEntry): Promise<void>;
}

@Injectable()
export class DummyPingHistoryService implements PingHistoryService {
  constructor(
    @Inject(ServiceProvider.PingEffectNotificationService)
    private pingEffectHandlerService: PingEffectNotificationService,

    @Inject(RepositoryProvider.PingHistory)
    private pingHistoryRepository: PingHistoryRepository,
  ) {}

  async acknowledge(entry: PingHistoryEntry): Promise<void> {
    const previousEntry = await this.pingHistoryRepository.getLastEntry(
      entry.host,
    );

    const effect = this.getPingEffect(entry, previousEntry);

    await this.handlePingEffect(entry, effect);
    await this.pingEffectHandlerService.handle(effect);
  }

  private getPingEffect(
    newEntry: PingHistoryEntry,
    previousEntry?: PingHistoryEntry,
  ): PingEffect {
    if (!previousEntry) {
      return new FirstEntryPingEffect({ status: newEntry.status });
    }

    if (previousEntry.status !== newEntry.status) {
      return new StatusChangedPingEffect({
        elapsedTime: newEntry.time.getTime() - previousEntry.time.getTime(),
        newStatus: newEntry.status,
        previousStatus: previousEntry.status,
      });
    }

    return new IdlePingEffect();
  }

  private async handlePingEffect(entry: PingHistoryEntry, effect: PingEffect) {
    if (
      effect instanceof FirstEntryPingEffect ||
      effect instanceof StatusChangedPingEffect
    ) {
      await this.pingHistoryRepository.insertEntry(entry);
    }
  }
}
