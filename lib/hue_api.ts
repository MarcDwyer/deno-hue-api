import { Groups } from "./types/group_types.ts";
import { LightStatusResp } from "./types/light_responses.ts";
import { Lights } from "./types/light_types.ts";
import { hueFetch } from "./util.ts";

export class HueApi {
  constructor(private username: string, private hostname: string) {
    this.fetch = hueFetch(`http://${hostname}/api/${username}`);
  }
  async getLights() {
    const payload = await this.fetch<Lights>("/lights");
    const lights = Object.entries(payload).reduce((map, [k, light]) => {},
    new Map());
    return lights;
  }
  getGroups() {
    return this.fetch<Groups>("/groups");
  }
  getConfig() {
    return this.fetch("/config");
  }
  /**
   * Turn a light on or off
   * @param id ID of light
   * @param status Must be  "on" or "off"
   */
  async lightPowerState(id: string | number, status: "on" | "off") {
    const isOn = status === "on" ? true : false;
    const body = {
      on: isOn,
    };
    try {
      const resp = await this.fetch<LightStatusResp[]>(`/lights/${id}/state`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      const status = resp[0];
      if ("error" in status) throw `Error setting light: ${id}`;
    } catch (e) {
      console.error(e);
    }
  }
  // async setLightConfig(id: string | number, config: ) {

  // }
  setLight(id: number) {}
}
