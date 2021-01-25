export type FBridge = {
  id: string;
  internalipaddress: string;
};

export async function discoverBridges() {
  const endpoint = "https://discovery.meethue.com/";
  const f = await fetch(endpoint);
  const data: FBridge[] = await f.json();
  if (!data.length) throw "No bridges were found";
  return data;
}
