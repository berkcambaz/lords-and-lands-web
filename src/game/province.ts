import { Country } from "./country";
import { Landmark } from "./landmark";

export class Province {
  public x: number;
  public y: number;

  public country: Country;
  public landmark: Landmark;

  constructor(x: number, y: number, country: Country, landmark: Landmark) {
    this.x = x;
    this.y = y;
    this.country = country;
    this.landmark = landmark;
  }
}