import { Country } from "./country";
import { ArmyData } from "./data/armies/_army_data";

export enum ARMY_STATE {
  READY,
  NOT_READY
}

export class Army {
  public country: Country;

  public data: ArmyData;

  public state: ARMY_STATE;
  public exhaust: number;

  constructor(country: Country, data: ArmyData, state: ARMY_STATE, exhaust: number) {
    this.country = country;
    this.data = data;
    this.state = state;
    this.exhaust = exhaust;
  }
}