import { FBridge } from "./discovery.ts";
import { Lights } from "./types/light_types.ts";

export class HueApi {
  baseUrl: string;
  constructor(private username: string, private ipaddress: string) {
    this.baseUrl = `http://${ipaddress}/api/`;
  }
  async getLights() {
    const url = this.baseUrl + `${this.username}/lights`;
    const f = await fetch(url);
    const lights: Lights = await f.json();
    if (!Object.values(lights).length) throw "No lights were found";
    return lights;
  }
}
