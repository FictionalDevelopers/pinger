import { DurableObjectState } from "@cloudflare/workers-types";

export class IPState implements DurableObject {
  constructor(private state: DurableObjectState) {}

  fetch(request: Request): Response | Promise<Response> {
    console.log("REQ", request);

    this.state.storage.put("url", request.url);

    // fetch(`https://ping.fictionaldev.com/ping/${request.body.ip}`)
    //   .then((r) => r.json<{ status: "online" | "offline" }>())
    //   .then((r) => r.status);

    return new Response();
  }
}
