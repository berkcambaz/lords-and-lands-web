import { Country } from "./country";

export class Province {
  public x: number;
  public y: number;
  public country: Country;

  constructor(x: number, y: number, country: Country) {
    this.x = x;
    this.y = y;
    this.country = country;
  }
}