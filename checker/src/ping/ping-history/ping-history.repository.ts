import { Injectable } from '@nestjs/common';
import { PingHistoryEntry } from '../entities/ping-history-entry.entity';

export interface PingHistoryRepository {
  getLastEntry(host: string): Promise<PingHistoryEntry | null>;
  insertEntry(entry: PingHistoryEntry): Promise<void>;
}

@Injectable()
export class DummyPingHistoryRepository implements PingHistoryRepository {
  private hostEntries = new Map<string, PingHistoryEntry[]>();

  async getLastEntry(host: string): Promise<PingHistoryEntry | null> {
    const entries = this.hostEntries.get(host) ?? [];

    return entries.at(-1) ?? null;
  }

  async insertEntry(entry: PingHistoryEntry): Promise<void> {
    const entries = this.hostEntries.get(entry.host) ?? [];

    this.hostEntries.set(entry.host, [...entries, entry]);
  }
}
