import { TargetStatus } from '../ping-service/entities/target-status';

export type PingHistoryEntry = {
  host: string;
  time: Date;
  status: TargetStatus;
};
