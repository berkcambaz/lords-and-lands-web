import { Province } from "../../province";
import { ArmyNormal } from "./army_normal";

export enum ARMY_ID {
  NORMAL
}

export class ArmyData {
  id: ARMY_ID;

  cost: number;

  offensive: number;
  defensive: number;
  breakthrough: number;

  constructor(id: ARMY_ID, cost: number, offensive: number, defensive: number, breakthrough: number) {
    this.id = id;

    this.cost = cost;

    this.offensive = offensive;
    this.defensive = defensive;
    this.breakthrough = breakthrough;
  }

  protected onHit(from: Province, to: Province) {

  }

  protected onGetHit(from: Province, to: Province) {

  }

  protected onMove(from: Province, to: Province) {

  }

  protected onFree(province: Province) {

  }

  protected onInvade(province: Province) {

  }

  protected onOccupy(province: Province) {

  }

  protected onRecruit(province: Province) {

  }

  protected onDisband(province: Province) {

  }

  public static createArmy(id: ARMY_ID) {
    switch (id) {
      case ARMY_ID.NORMAL:
        return new ArmyNormal();
      default:
        throw new Error(`Army with id ${id} doesn't exist.`);
    }
  }
}