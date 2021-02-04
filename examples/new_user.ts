import { createUser } from "../lib/create_user.ts";
import { discoverBridges } from "../lib/discovery.ts";
import { HueApi } from "../lib/hue_api.ts";

try {
  const disc = await discoverBridges();
  const bridge = disc[0];
  console.log(bridge);

  const { username } = await createUser("marcdeno", bridge);
  console.log({ username, ip: bridge.internalipaddress });

  const hueApi = new HueApi(username, bridge.internalipaddress);

  console.log(await hueApi.getGroups());
} catch (e) {
  console.error(e);
}
