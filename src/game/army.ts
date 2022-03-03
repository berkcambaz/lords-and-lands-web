import { game } from "..";
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
    if (country.gold < army.cost) return false;

    // If not enough manpower
    if (country.army >= country.manpower) return false;

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
    // If no army
    if (!province.army) return false;

    // If not the owner
    if (province.army.country.id !== country.id) return false;

    return true;
  }

  public static canMove(country: Country, province: Province, army: ArmyData) {
    // If army is not in ready state
    if (province.army?.state !== ARMY_STATE.READY) return false;

    return true;
  }

  public static recruit(country: Country, province: Province | undefined, army: ArmyData) {
    if (!province) return;

    if (!Army.availableToRecruit(country, province, army) ||
      !Army.canRecruit(country, province, army))
      return;

    country.gold -= army.cost;
    country.army += 1;

    province.army = new Army(country, army, ARMY_STATE.NOT_READY, 0);

    // Call onRecruit 
    army.onRecruit(province);

    // Update the UI
    game.ui.ingameHandler();

    // Update the tilemap
    game.tilemap.drawTile(province);
  }

  public static disband(country: Country, province: Province | undefined, army: ArmyData) {
    if (!province) return;

    if (!Army.availableToDisband(country, province, army) ||
      !Army.canDisband(country, province, army))
      return;

    country.army -= 1;

    province.army = undefined;

    // Call onDisband
    army.onDisband(province);

    // Update the UI
    game.ui.ingameHandler();

    // Update the tilemap
    game.tilemap.drawTile(province);
  }

  public static move(country: Country, from: Province | undefined, to: Province, army: ArmyData) {
    if (!from) return;
    if (!from.army) return;

    if (!Army.availableToMove(country, from, army) ||
      !Army.canMove(country, from, army))
      return;

    from.army.state = ARMY_STATE.NOT_READY;

    // Call onMove
    army.onMove(from, to);

    // Update the UI
    game.ui.ingameHandler();

    // Update the tilemap
    game.tilemap.drawTile(from);
    game.tilemap.drawTile(to);
  }
}