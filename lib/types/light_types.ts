export type Light = {
  state: LightState;
  swupdate: SWUpdate;
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname: string;
  capabilities: Capabilities;
  config: LightConfig;
  uniqueid: string;
  swversion: string;
  swconfigid: string;
  productid: string;
};
export type Lights = {
  [lightId: string]: Light;
};
export type LightConfig = {
  archetype: string;
  function: string;
  direction: string;
  startup: { mode: string; configured: boolean };
};
export type Capabilities = {
  certified: boolean;
  control: { mindimlevel: number; maxlumen: number };
  streaming: { renderer: boolean; proxy: boolean };
};
export type SWUpdate = {
  state: string;
  lastinstall: Date;
};
export type LightState = {
  on: boolean;
  bri: number;
  alert: string;
  mode: string;
  reachable: boolean;
};
