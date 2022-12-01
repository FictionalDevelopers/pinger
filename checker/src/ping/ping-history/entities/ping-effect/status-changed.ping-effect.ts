import { TargetStatus } from 'src/ping/ping-service/entities/target-status';
import { PingEffect } from './ping-effect';

type Fields = {
  elapsedTime: number;
  previousStatus: TargetStatus;
  newStatus: TargetStatus;
};

export class StatusChangedPingEffect extends PingEffect {
  public elapsedTime: Fields['elapsedTime'];
  public previousStatus: Fields['previousStatus'];
  public newStatus: Fields['newStatus'];

  constructor(fields: Fields) {
    super();

    this.elapsedTime = fields.elapsedTime;
    this.previousStatus = fields.previousStatus;
    this.newStatus = fields.newStatus;
  }
}
