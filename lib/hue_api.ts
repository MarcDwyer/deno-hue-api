import { LightApi } from "./light.ts";
import { Groups } from "./types/group_types.ts";
import { Lights } from "./types/light_types.ts";
import { HueFetch, hueFetch } from "./util.ts";

export class HueApi {
  fetch: HueFetch;
  lights: Map<string, LightApi> | null = null;

  constructor(username: string, hostname: string) {
    this.fetch = hueFetch(`http://${hostname}/api/${username}`);
  }
  async loadLights() {
    const payload = await this.fetch<Lights>("/lights");
    const lights = Object.entries(payload).reduce(
      (map: Map<string, LightApi>, [k, lightInfo]) => {
        const light = new LightApi({
          fetch: this.fetch,
          id: k,
          info: lightInfo,
        });
        map.set(k, light);
        return map;
      },
      new Map()
    );
    this.lights = lights;
    return lights;
  }
  getLight(id: string) {
    if (!this.lights)
      throw new Error("Lights need to be loaded before running this function");
    return this.lights.get(id);
  }
  getGroups() {
    return this.fetch<Groups>("/groups");
  }
  getConfig() {
    return this.fetch("/config");
  }
}
