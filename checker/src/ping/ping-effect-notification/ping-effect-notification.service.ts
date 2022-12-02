import { Injectable } from '@nestjs/common';
import { addMilliseconds, formatDistance } from 'date-fns';
import {
  PingEffect,
  StatusChangedPingEffect,
} from '../ping-history/entities/ping-effect';

export interface PingEffectNotificationService {
  handle(effect: PingEffect): Promise<void>;
}

@Injectable()
export class DummyPingEffectNotificationService
  implements PingEffectNotificationService
{
  async handle(effect: PingEffect): Promise<void> {
    if (effect instanceof StatusChangedPingEffect) {
      console.log('EFFECT !!', {
        ...effect,
        elapsedTime: formatDistance(
          new Date(),
          addMilliseconds(new Date(), effect.elapsedTime),
          { includeSeconds: true },
        ),
      });
    } else {
      console.log('EFFECT', effect);
    }
  }
}
