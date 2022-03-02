import { game } from "../../..";
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
    if (to.landmark) enemy += to.landmark.data.offensive;

    // Add support bonus
    ally += game.util.getSupportBonus(from);
    enemy += game.util.getSupportBonus(to);

    // Subtract exhaust modifier from enemy
    if (to.army) enemy -= to.army.exhaust;

    if (ally > enemy) {
      to.army = from.army;
      from.army = undefined;
    }
    else if (ally === enemy) {
      if (from.army) from.army.exhaust += 0.5;
    }
    else if (ally < enemy) {
      from.army = undefined;
      if (to.army) to.army.exhaust += 0.25;
    }
  }

  public onGetHit(from: Province, to: Province) {

  }

  public onMove(from: Province, to: Province) {
    if (!to.army) {
      to.army = from.army;
      from.army = undefined;
    }
    else {
      this.onHit(from, to);
    }
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