import { createUser } from "./lib/create_user.ts";
import { HueApi } from "./lib/hue_api.ts";
import { discoverBridges } from "./mod.ts";

async function withCreate() {
  try {
    const appName = "marc_deno";
    const bridges = await discoverBridges();
    const bridge = bridges[0];
    const auth = await createUser(appName, bridge);
    console.log(auth.username);
  } catch (e) {
    console.error("Error", "\n", e);
  }
}

async function withUser(username: string, ip: string) {
  try {
    const api = new HueApi(username, ip);
    console.log(await api.getLights());
  } catch (e) {
    console.error(e);
  }
}
const ip = "192.168.1.70";
const user = "-o3vp6zrGXA7LSRCCAgL8J0CwWjBKNvsg7dh-iFx";

withUser(user, ip);
