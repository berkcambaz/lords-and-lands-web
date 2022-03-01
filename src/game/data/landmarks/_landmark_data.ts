import { game } from "../../..";
import { Signal } from "../../../core/signal";
import { Country } from "../../country";
import { Landmark } from "../../landmark";
import { Province, PROVINCE_STATE } from "../../province";
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

  public availableToBuild(country: Country, province: Province) {
    // If not the owner
    if (country.id !== province.owner.id) return false;

    // If there is already a landmark
    if (province.landmark) return false;

    // If capital is not built and currently building a capital, allow it
    let capitalBuilt = game.util.hasLandmark(province.owner, this.id);
    if (!capitalBuilt) capitalBuilt = this.id === LANDMARK_ID.CAPITAL;

    // If it's unique and not build, allow it
    let alreadyBuilt = this.unique && game.util.hasLandmark(province.owner, this.id);

    return capitalBuilt && !this.unbuildable && !alreadyBuilt;
  }

  public canBuild(country: Country, province: Province) {
    // If province is not free
    if (province.state !== PROVINCE_STATE.FREE) return false;

    // If has not enough gold
    if (country.gold < this.cost) return false;

    return true;
  }

  public availableToDemolish(country: Country, province: Province) {
    // If not the owner
    if (country.id !== province.owner.id) return false;

    // If there is no landmark
    if (!province.landmark) return false;

    return !this.undestroyable;
  }

  public canDemolish(country: Country, province: Province) {
    // If province is not free
    if (province.state !== PROVINCE_STATE.FREE) return false;

    return true;
  }

  public onBuild(province: Province | undefined) {
    if (!province) return;

    if (!this.availableToBuild(game.gameplay.currentCountry, province) ||
      !this.canBuild(game.gameplay.currentCountry, province))
      return;

    province.owner.gold -= this.cost;
    province.owner.income += this.income;
    province.owner.manpower += this.manpower;

    province.landmark = new Landmark(this);

    // Update the UI
  }

  public onDemolish(province: Province | undefined) {
    if (!province) return;

    if (!this.availableToDemolish(game.gameplay.currentCountry, province) ||
      !this.canDemolish(game.gameplay.currentCountry, province))
      return;

    province.owner.income -= this.income;
    province.owner.manpower -= this.manpower;

    province.landmark = undefined;

    // Update the UI
  }
}