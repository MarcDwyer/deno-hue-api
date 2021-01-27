export type LightInfo = {
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
  [lightId: string]: LightInfo;
};

export type LightConfig = {
  archetype: string;
  function: string;
  direction: string;
  startup: {
    mode: string;
    configured: boolean;
  };
};
/**
 * If property colorgamut exists, the bulb is color capable.
 */
export type Capabilities = {
  certified: boolean;
  control: {
    mindimlevel: number;
    maxlumen: number;
    colorgamuttype?: string;
    colorgamut?: string;
    ct?: [min: number, max: number];
  };
  streaming: { renderer: boolean; proxy: boolean };
};
export type SWUpdate = {
  state: string;
  lastinstall: Date;
};
export interface LightState {
  on: boolean;
  bri: number;
  alert: string;
  mode: string;
  reachable: boolean;
}

export interface LightStateChange {
  xy?: [x: number, y: number];
  sat?: number;
  ct?: number;
  on?: boolean;
}
