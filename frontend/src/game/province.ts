import { Vec2 } from "../core/vec2";
import { Army } from "./army";
import { Country } from "./country";
import { Landmark } from "./landmark";

export class Province {
  public pos: Vec2;

  public owner: Country;
  public occupier?: Country;

  public landmark?: Landmark;
  public army?: Army;

  constructor(pos: Vec2, owner: Country, occupier?: Country, landmark?: Landmark, army?: Army) {
    this.pos = pos;

    this.owner = owner;
    this.occupier = occupier;

    this.landmark = landmark;
    this.army = army;
  }

  public isFree() {
    return !this.isInvaded() && !this.isOccupied();
  }

  public isInvaded() {
    return !!this.army && this.army.country.id !== this.owner.id;
  }

  public isOccupied() {
    return !!this.occupier;
  }

  public static equals(a: Province, b: Province) {
    return Vec2.equals(a.pos, b.pos);
  }

  public static equalsArray(a: Province[], b: Province[]) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (!Vec2.equals(a[i].pos, b[i].pos)) return false;
    }

    return true;
  }
}