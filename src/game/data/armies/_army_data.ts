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

  public onHit(from: Province, to: Province) {

  }

  public onGetHit(from: Province, to: Province) {

  }

  public onMove(from: Province, to: Province) {

  }

  public onFree(province: Province) {

  }

  public onInvade(province: Province) {

  }

  public onOccupy(province: Province) {

  }

  public onRecruit(province: Province) {

  }

  public onDisband(province: Province) {

  }
}