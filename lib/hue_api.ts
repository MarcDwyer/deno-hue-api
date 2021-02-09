import { LightApi } from "./light_api.ts";
import { GroupMap, Groups, MyGroup } from "./types/group_types.ts";
import { Lights } from "./types/light_types.ts";
import { HueFetch, hueFetch } from "./util.ts";

export type Credentials = {
  username: string;
  bridgeIp: string;
};

export async function connectToBridge(credentials: Credentials) {
  try {
    const api = new HueApi(credentials);
    await api.loadLights();
    return api;
  } catch (e) {
    throw new Error(e);
  }
}

export class HueApi {
  fetch: HueFetch;
  lights: Map<string, LightApi> | null = null;

  constructor(private credentials: Credentials) {
    const { bridgeIp, username } = credentials;
    this.fetch = hueFetch(`http://${bridgeIp}/api/${username}`);
  }
  /**
   * Caches the lights and also being used to check if credentials
   * are valid
   */
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
  async getGroups() {
    if (!this.lights)
      throw new Error(`You have not connected to the bridge yet.`);
    const groups = await this.fetch<Groups>("/groups");
    const groupMap: GroupMap = new Map();

    for (const [id, group] of Object.entries(groups)) {
      //@ts-ignore
      const myGroup: MyGroup = { ...group };
      for (let i = 0; i < myGroup.lights.length; ++i) {
        const light = myGroup.lights[i];
        if (typeof light !== "string") continue;
        myGroup.lights[i] = this.lights.get(light) || light;
      }
      //@ts-ignore
      groupMap.set(id, myGroup);
    }
    return groupMap;
  }
  getConfig() {
    return this.fetch("/config");
  }
}
