import { RGB, RGBtoXY, XYB, xyBriToRgb } from "./color_converters.ts";
import { LightStatusResp } from "./types/light_responses.ts";
import { LightInfo, LightStateChange } from "./types/light_types.ts";
import { HueFetch } from "./util.ts";

type LightActionConfig = {
  fetch: HueFetch;
  id: number | string;
  info: LightInfo;
};

export class LightApi {
  info: LightInfo;
  id: number | string;

  private fetch: HueFetch;
  constructor({ fetch, id, info }: LightActionConfig) {
    this.fetch = fetch;
    this.id = id;
    this.info = info;
  }
  get isColor() {
    return "colormode" in this.info.state;
  }
  private async sendChange(change: LightStateChange) {
    const { id } = this;
    const resp = await this.fetch<LightStatusResp[]>(`/lights/${id}/state`, {
      method: "PUT",
      body: JSON.stringify(change),
    });
    if (!resp.length) throw `Empty response from ${id}`;
    const succ = resp[0];
    if ("error" in succ) {
      throw succ["error"];
    }
    this.info.state = { ...this.info.state, ...change };
    return succ;
  }
  on() {
    return this.sendChange({ on: true });
  }
  off() {
    return this.sendChange({ on: false });
  }
  async changeColorRGB(rgb: RGB) {
    if (!this.isColor)
      throw `Light: ${this.id}. Does not have color capabilities`;
    const xy = RGBtoXY(rgb);
    try {
      const resp = await this.sendChange({ xy });
      return resp;
    } catch (e) {
      console.error(e);
    }
  }
  get currentColor(): RGB {
    if (!this.isColor) {
      return [255, 255, 255];
    }
    const { state } = this.info;
    const [x, y] = state.xy;
    const xyb: XYB = [x, y, state.bri];
    return xyBriToRgb(xyb);
  }
}
