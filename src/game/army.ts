import { Country } from "./country";
import { ArmyNormal } from "./data/armies/army_normal";
import { ArmyData, ARMY_ID } from "./data/armies/_army_data";
import { Province, PROVINCE_STATE } from "./province";

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

  public static availableToRecruit(country: Country, province: Province, army: ArmyData) {
    // If not the owner
    if (country.id !== province.owner.id) return false;

    // If there is already an army
    if (province.army) return false;

    // If there is no recruitable building
    if (!province.landmark?.data.recruitable) return false;

    return true;
  }

  public static canRecruit(country: Country, province: Province, army: ArmyData) {
    // If province is not free
    if (province.state !== PROVINCE_STATE.FREE) return false;

    // If not enough money
    if (province.owner.gold < army.cost) return false;

    return true;
  }

  public static availableToDisband(country: Country, province: Province, army: ArmyData) {
    // If there's no army
    if (!province.army) return false;

    // If not the owner
    if (province.army.country.id !== country.id) return false;

    return true;
  }

  public static canDisband(country: Country, province: Province, army: ArmyData) {
    // TODO: Check if allies land, and if so, allow to disband
    // TODO: Check if adjacent to non-ally army, if so, don't allow to disband

    // If not on own country
    if (country.id !== province.owner.id) return false;

    return true;
  }

  public static availableToMove(country: Country, province: Province, army: ArmyData) {

  }

  public static canMove(country: Country, province: Province, army: ArmyData) {

  }

  public static recruit(country: Country, province: Province, army: ArmyData) {

  }

  public static disband(country: Country, province: Province, army: ArmyData) {

  }

  public static move(country: Country, province: Province, army: ArmyData) {

  }
}