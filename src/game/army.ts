import { Country } from "./country";
import { ArmyNormal } from "./data/armies/army_normal";
import { ArmyData, ARMY_ID } from "./data/armies/_army_data";

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

  public static create(id: ARMY_ID) {
    switch (id) {
      case ARMY_ID.NORMAL:
        return new ArmyNormal();
      default:
        throw new Error(`Army with id ${id} doesn't exist.`);
    }
  }
}