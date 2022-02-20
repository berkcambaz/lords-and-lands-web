import { Vec2 } from "../core/vec2";
import { Country } from "./country";
import { Landmark } from "./landmark";

export class Province {
  public pos: Vec2;

  public country: Country;
  public landmark: Landmark;

  constructor(pos: Vec2, country: Country, landmark: Landmark) {
    this.pos = pos;
    this.country = country;
    this.landmark = landmark;
  }
}