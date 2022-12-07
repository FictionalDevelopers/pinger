export interface Env {
  PINGER: KVNamespace;
  PING_QUEUE: Queue<{ ip: string }>;
  IP_STATE: DurableObjectNamespace;
}
