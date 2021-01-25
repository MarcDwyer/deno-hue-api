import { FBridge } from "./discovery.ts";

type CreateError = {
  type: number;
  address: string;
  description: string;
};
type CreateSuccess = {
  username: string;
};
/**
 * If you do not have a username, one must be created and authorized
 * @param username can be any name
 * @param bridge
 */
export async function createUser(username: string, bridge: FBridge) {
  const { internalipaddress } = bridge;
  const endpoint = `http://${internalipaddress}/api`;
  const body = {
    devicetype: username,
  };
  const f = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const res = await f.json();
  const payload = res[0];
  if ("error" in payload) {
    throw payload["error"] as CreateError;
  }
  return payload["success"] as CreateSuccess;
}
