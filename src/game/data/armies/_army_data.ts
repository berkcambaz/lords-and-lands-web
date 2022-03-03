import { game } from "../../..";
import { ARMY_STATE } from "../../army";
import { Country } from "../../country";
import { Landmark } from "../../landmark";
import { Province, PROVINCE_STATE } from "../../province";
import { LANDMARK_ID } from "../landmarks/_landmark_data";
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

  public onUpdate(province: Province) {
    if (!province.army) return;

    this.onHitProvince(province);

    // Reduce exhaust if ready
    if (province.army.state === ARMY_STATE.READY)
      province.army.exhaust = game.maths.clamp(province.army.exhaust - 0.25, 0, 6);

    province.army.state = ARMY_STATE.READY;
  }

  public onHit(from: Province, to: Province) {
    let ally = 0;
    let enemy = 0;

    // Add dice
    ally += game.random.dice();
    enemy += game.random.dice();

    // Add offensive for ally & defensive for enemy
    if (from.army) ally += from.army.data.offensive;
    if (to.army) enemy += to.army.data.defensive;

    // Add land bonus (offensive for ally, defensive for enemy)
    if (from.landmark) ally += from.landmark.data.offensive;
    if (to.landmark) enemy += to.landmark.data.defensive;

    // Add support bonus
    ally += game.util.getSupportBonus(from);
    enemy += game.util.getSupportBonus(to);

    // Subtract exhaust modifier from enemy
    if (to.army) enemy -= to.army.exhaust;

    if (ally > enemy) {
      if (to.army) to.army.country.army -= 1;

      to.army = from.army;
      from.army = undefined;
    }
    else if (ally === enemy) {
      if (to.army) to.army.exhaust += 0.5;
    }
    else if (ally < enemy) {
      if (from.army) from.army.country.army -= 1;

      from.army = undefined;
      if (to.army) to.army.exhaust += 0.25;
    }
  }

  public onHitProvince(province: Province) {
    // If owner & province is free
    if (province.owner.id === province.army?.country.id && province.state === PROVINCE_STATE.FREE) return;

    // If army is not ready
    if (province.army?.state !== ARMY_STATE.READY) return;

    let ally = 0;
    let enemy = 0;

    // Add dice
    ally += game.random.dice();
    enemy += game.random.dice();

    // Add breakthrough for ally & resistance for enemy
    if (province.army) ally += province.army.data.breakthrough;
    if (province.landmark) enemy += province.landmark.data.resistance;

    // Subtract exhaust modifier from ally
    if (province.army) ally -= province.army.exhaust;

    // Add support bonus
    ally += game.util.getSupportBonus(province);

    if (ally > enemy) {
      // If freeing own province
      if (province.owner.id === province.army.country.id) {
        this.onFree(province.army.country, province);
      }
      // If occupying unoccupied province or occupied by someone else
      else if (!province.occupier || province.occupier.id !== province.army.country.id) {
        this.onOccupy(province.army.country, province);
      }
      // If conquering sieged province
      else {
        this.onConquer(province.army.country, province);
      }

      // Update UI
      game.ui.ingameHandler();

      // Update tilemap
      game.tilemap.drawTile(province);
    } else if (province.landmark?.data.id === LANDMARK_ID.CAPITAL) {
      this.onOccupy(province.army.country, province);
    }
  }

  public onMove(from: Province, to: Province) {
    if (!to.army) {
      // If the old province was invaded & not ours, set it to free
      if (from.state === PROVINCE_STATE.INVADED && from.owner.id !== from.army?.country.id)
        from.state = PROVINCE_STATE.FREE;

      // If the new province is free & not ours, set it to invaded
      if (to.state === PROVINCE_STATE.FREE && to.owner.id !== from.army?.country.id)
        to.state = PROVINCE_STATE.INVADED;

      to.army = from.army;
      from.army = undefined;
    }
    else {
      this.onHit(from, to);
    }
  }

  public onFree(country: Country, province: Province) {
    province.occupier = undefined;
    province.state = PROVINCE_STATE.FREE;
    Landmark.addEffects(province);
  }

  public onOccupy(country: Country, province: Province) {
    if (province.landmark?.data.id === LANDMARK_ID.CAPITAL) {
      for (let i = 0; i < game.gameplay.provinces.length; ++i) {
        const target = game.gameplay.provinces[i];

        // If not own
        if (target.owner.id === country.id) continue;

        // If not enemy's
        if (target.owner.id !== province.owner.id) continue;

        // If capital
        if (target.landmark?.data.id === LANDMARK_ID.CAPITAL) continue;

        // If occupied by someone else
        if (target.occupier && target.occupier.id !== country.id) continue;

        // If invaded by someone else
        if (target.state === PROVINCE_STATE.INVADED && target.army?.country.id !== country.id) continue;

        if (game.random.dice() > 5) {
          if (target.state === PROVINCE_STATE.OCCUPIED) this.onConquer(country, target);
          else this.onOccupy(country, target);

          // Update tilemap
          game.tilemap.drawTile(target);
        }
      }

      // If there is only one province left, allow it to be occupieed
      if (game.util.getProvinceCount(province.owner) !== 1) return;
    }

    province.occupier = country;
    province.state = PROVINCE_STATE.OCCUPIED;
    Landmark.removeEffects(province);
  }

  public onConquer(country: Country, province: Province) {
    if (province.landmark?.data.id === LANDMARK_ID.CAPITAL) {
      // If there is only one province left, allow it to be occupieed
      if (game.util.getProvinceCount(province.owner) !== 1) return;

      // Remove the country
      for (let i = 0; i < game.gameplay.countries.length; ++i) {
        if (game.gameplay.countries[i].id === province.owner.id) {
          game.gameplay.countries.splice(i, 1);
          break;
        }
      }

      // Remove the capital landmark
      province.landmark = undefined;
    }

    province.owner = country;
    province.occupier = undefined;
    province.state = PROVINCE_STATE.FREE;
    Landmark.addEffects(province);
  }

  public onRecruit(province: Province) {

  }

  public onDisband(province: Province) {
    // If the province was invaded & not ours, set it to free
    if (province.state === PROVINCE_STATE.INVADED && province.owner.id !== province.army?.country.id)
      province.state = PROVINCE_STATE.FREE;
  }
}