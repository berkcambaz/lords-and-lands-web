import { game } from "../../..";
import { Signal } from "../../../core/signal";
import { Country } from "../../country";
import { Landmark } from "../../landmark";
import { Province, PROVINCE_STATE } from "../../province";

export enum LANDMARK_ID {
  CAPITAL,
  CHURCH,
  HOUSE,
  MOUNTAINS,
  FOREST,
  TOWER
}

export class LandmarkData {
  id: LANDMARK_ID;

  cost: number;

  income: number;
  manpower: number;

  unique: boolean;
  recruitable: boolean;
  unbuildable: boolean;
  undestroyable: boolean;

  offensive: number;
  defensive: number;
  resistance: number;

  constructor(
    id: LANDMARK_ID,
    cost: number,
    income: number,
    manpower: number,
    unique: boolean,
    recruitable: boolean,
    unbuildable: boolean,
    undestroyable: boolean,
    offensive: number,
    defensive: number,
    resistance: number
  ) {
    this.id = id;

    this.cost = cost;

    this.income = income;
    this.manpower = manpower;

    this.unique = unique;
    this.recruitable = recruitable;
    this.unbuildable = unbuildable;
    this.undestroyable = undestroyable;

    this.offensive = offensive;
    this.defensive = defensive;
    this.resistance = resistance;
  }

  public onBuild(province: Province) {

  }

  public onDemolish(province: Province) {

  }
}