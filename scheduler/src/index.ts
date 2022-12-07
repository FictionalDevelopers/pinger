/**
 * Welcome to Cloudflare Workers! This is your first scheduled worker.
 *
 * - Run `wrangler dev --local` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/cdn-cgi/mf/scheduled"` to trigger the scheduled event
 * - Go back to the console to see what your worker has logged
 * - Update the Cron trigger in wrangler.toml (see https://developers.cloudflare.com/workers/wrangler/configuration/#triggers)
 * - Run `wrangler publish --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/
 */

import { Env } from "./env";

export { IPState } from "./IPState";

export default {
  async scheduled(controller: ScheduledController, env: Env): Promise<void> {
    const [ips, isEnabled] = await Promise.all([
      env.PINGER.get("ips").then((ips): string[] =>
        ips ? JSON.parse(ips) : []
      ),
      env.PINGER.get("is_scheduler_enabled").then(
        (isEnabled) => isEnabled === "true"
      ),
    ]);

    if (!isEnabled) {
      return;
    }

    await Promise.all(ips.map((ip) => env.PING_QUEUE.send({ ip })));
  },

  async queue(batch: MessageBatch<{ ip: string }>, env: Env) {
    await Promise.all(
      batch.messages.map(({ body }) => {
        console.log("body.ip", body.ip);
        const id = env.IP_STATE.idFromString(body.ip);
        console.log("id", id);

        const stub = env.IP_STATE.get(id);

        return stub.fetch(
          new Request(`https://ping.fictionaldev.com/ping/${body.ip}`)
        );
      })
    );
  },
};
