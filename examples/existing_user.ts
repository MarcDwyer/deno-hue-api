import { HueApi } from "../lib/hue_api.ts";

const bridgeIp = Deno.env.get("HUEIP");
const bridgeUserName = Deno.env.get("HUEUSER");
if (!bridgeIp || !bridgeUserName) throw new Error("No bridge info provided");
try {
  const api = new HueApi(bridgeUserName, bridgeIp);
  await api.loadLights();
  const groups = await api.getGroups();

  for (const group of Object.values(groups)) {
  }
} catch (e) {
  console.error(e);
}

export {};
