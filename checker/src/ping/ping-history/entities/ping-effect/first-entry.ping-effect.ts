import { TargetStatus } from 'src/ping/ping-service/entities/target-status';
import { PingEffect } from './ping-effect';

type Fields = {
  status: TargetStatus;
};

export class FirstEntryPingEffect extends PingEffect {
  public status: Fields['status'];

  constructor(fields: Fields) {
    super();

    this.status = fields.status;
  }
}
