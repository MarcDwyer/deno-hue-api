import { connectToBridge, Credentials } from "../lib/hue_api.ts";

try {
  const decoder = new TextDecoder();

  const reader = await Deno.readFile("../bridge_data.json");

  const jsonData = decoder.decode(reader);
  const creds: Credentials = JSON.parse(jsonData);

  const bridge = await connectToBridge(creds);
  const groups = await bridge.getGroups();
  const groupName = "Upstairs room";
  for (const group of groups.values()) {
    if (group.name === groupName) {
      for (const light of group.lights) {
        if (light.isColor) {
          light.changeColorRGB([217, 125, 87]);
        }
        light.on();
      }
    }
  }
} catch (e) {
  console.error(e);
}

export {};
