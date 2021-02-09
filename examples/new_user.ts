import { createUser } from "../lib/create_user.ts";
import { discoverBridges } from "../lib/discovery.ts";
import { connectToBridge, Credentials } from "../lib/hue_api.ts";

const yourUsername = "marcdeno";

try {
  const disc = await discoverBridges();
  const bridgeData = disc[0];

  const { username } = await createUser(yourUsername, bridgeData);
  const credentials: Credentials = {
    username,
    bridgeIp: bridgeData.internalipaddress,
  };

  /**
   * Store your credentials so we can sign in as an existing user
   * in the future
   */
  const write = Deno.writeTextFile(
    "../bridge_data.json",
    JSON.stringify(credentials)
  );

  await write;

  /**
   * Now that we have the proper credentials and have saved it.
   * We can now receive data from the bridge
   */

  const bridge = await connectToBridge(credentials);
  console.log(bridge.lights);
} catch (e) {
  console.error(e);
}
