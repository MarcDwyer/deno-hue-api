import { RGBtoXY } from "./colors.ts";
import { LightStatusResp } from "./types/light_responses.ts";
import { LightInfo, LightStateChange } from "./types/light_types.ts";
import { HueFetch } from "./util.ts";

type LightActionConfig = {
  fetch: HueFetch;
  id: number | string;
  info: LightInfo;
};
export type ColorChange = {
  r: number;
  g: number;
  b: number;
};
export class LightApi {
  info: LightInfo;
  id: number | string;
  fetch: HueFetch;
  constructor({ fetch, id, info }: LightActionConfig) {
    this.fetch = fetch;
    this.id = id;
    this.info = info;
  }
  get isColor() {
    return Boolean(this.info.capabilities.control.colorgamut);
  }
  private async sendChange(body: LightStateChange) {
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
    return this.sendChange({ on: true });
  }
  off() {
    return this.sendChange({ on: false });
  }
  async changeColorRGB({ r, g, b }: ColorChange) {
    if (!this.isColor)
      throw `Light: ${this.id}. Does not have color capabilities`;
    const xy = RGBtoXY(r, g, b);

    try {
      const resp = await this.sendChange({ xy });
      console.log(resp);
    } catch (e) {
      console.error(e);
    }
  }
}
