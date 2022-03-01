import { Signal } from "../../../core/signal";
import { Province } from "../../province";
import { LandmarkCapital } from "./landmark_capital";
import { LandmarkChurch } from "./landmark_church";
import { LandmarkForest } from "./landmark_forest";
import { LandmarkHouse } from "./landmark_house";
import { LandmarkMountains } from "./landmark_mountains";
import { LandmarkTower } from "./landmark_tower";

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

  protected onBuild(province: Province) {

  }

  protected onDemolish(province: Province) {

  }

  public static createLandmark(id: LANDMARK_ID) {
    switch (id) {
      case LANDMARK_ID.CAPITAL:
        return new LandmarkCapital();
      case LANDMARK_ID.CHURCH:
        return new LandmarkChurch();
      case LANDMARK_ID.FOREST:
        return new LandmarkForest();
      case LANDMARK_ID.HOUSE:
        return new LandmarkHouse();
      case LANDMARK_ID.MOUNTAINS:
        return new LandmarkMountains();
      case LANDMARK_ID.TOWER:
        return new LandmarkTower();
      default:
        throw new Error(`Landmark with id ${id} doesn't exist.`);
    }
  }
}