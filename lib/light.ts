import { LightStatusResp } from "./types/light_responses.ts";
import { LightInfo } from "./types/light_types.ts";
import { HueFetch } from "./util.ts";
type LightActionConfig = {
  fetch: HueFetch;
  id: number | string;
  info: LightInfo;
};
export class Light {
  info: LightInfo;
  id: number | string;
  fetch: HueFetch;
  constructor({ fetch, id, info }: LightActionConfig) {
    this.fetch = fetch;
    this.id = id;
    this.info = info;
  }

  private async changePowerState(on: boolean) {
    const body = { on };
    const { id } = this;
    const resp = await this.fetch<LightStatusResp[]>(`/lights/${id}/state`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    if (!resp.length) throw `Empty response from ${id}`;
    const succ = resp[0];
    if ("error" in succ) {
      throw `Error setting: ${id}`;
    }
    return succ;
  }
  on() {
    return this.changePowerState(true);
  }
  off() {
    return this.changePowerState(false);
  }
}
