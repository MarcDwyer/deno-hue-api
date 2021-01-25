import { createUser } from "./lib/create_user.ts";
import { discoverBridges } from "./mod.ts";

try {
  const appName = "marc_deno";
  const bridges = await discoverBridges();
  const bridge = bridges[0];
  const auth = await createUser(appName, bridge);
  console.log(auth.username);
} catch (e) {
  console.error(e);
}
