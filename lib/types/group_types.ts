import { LightApi } from "../light_api.ts";

export type Group = {
  name: string;
  lights: string[] | LightApi[];
  sensors: any[];
  type: string;
  state: { all_on: boolean; any_on: boolean };
  recycle: boolean;
  class: string;
  action: GroupAction;
};

export type GroupAction = {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: [x: number, y: number];
  ct: number;
  alert: string;
  colormode: string;
};

export type Groups = {
  [groupId: string]: Group;
};

export interface MyGroup extends Group {
  lights: LightApi[];
}
export type GroupMap = Map<string, MyGroup>;
