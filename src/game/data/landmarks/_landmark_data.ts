import { Signal } from "../../../core/signal";
import { Province } from "../../province";

export enum LANDMARK_ID {
  CAPITAL,
  CHURCH,
  HOUSE,
  MOUNTAINS,
  FOREST,
  TOWER
}

interface LandmarkSignals {
  onBuild: Signal<[province: Province]>,
  onDemolish: Signal<[province: Province]>
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

  signals: LandmarkSignals;

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

    this.signals = {
      onBuild: new Signal(),
      onDemolish: new Signal()
    }

    this.signals.onBuild.add(this.onBuild);
    this.signals.onDemolish.add(this.onDemolish);
  }

  protected onBuild(province: Province) {

  }

  protected onDemolish(province: Province) {

  }
}