import { Vec2 } from "../core/vec2";
import { Army } from "./army";
import { Country } from "./country";
import { Landmark } from "./landmark";

export enum PROVINCE_STATE {
  FREE,
  INVADED,
  OCCUPIED
}

export class Province {
  public pos: Vec2;

  public state: PROVINCE_STATE;

  public owner: Country;
  public occupier?: Country;

  public landmark?: Landmark;
  public army?: Army;

  constructor(pos: Vec2, owner: Country, occupier?: Country, landmark?: Landmark, army?: Army) {
    this.pos = pos;

    this.state = PROVINCE_STATE.FREE;

    this.owner = owner;
    this.occupier = occupier;

    this.landmark = landmark;
    this.army = army;
  }

  public static equals(a: Province, b: Province) {
    return Vec2.equals(a.pos, b.pos);
  }
}