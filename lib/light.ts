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

  async on() {}
}
