import { connectToBridge, Credentials } from "../lib/hue_api.ts";

try {
  const decoder = new TextDecoder();

  const reader = await Deno.readFile("../bridge_data.json");

  const jsonData = decoder.decode(reader);
  const creds: Credentials = JSON.parse(jsonData);

  const bridge = await connectToBridge(creds);
  if (bridge.lights) {
    for (const light of bridge.lights?.values()) {
      console.log(await light.on());
    }
  }
  const groups = await bridge.getGroups();
  const groupName = "Upstairs room";
  for (const group of groups.values()) {
    if (group.name === groupName) {
      for (const light of group.lights) {
        // console.log(await light.changeColorRGB([222,202,241]));
        light.off();
      }
    }
  }
} catch (e) {
  console.error(e);
}

export {};
