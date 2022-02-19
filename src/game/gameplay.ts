import { game } from "..";
import { Country, COUNTRY_ID } from "./country";
import { Province } from "./province";

export class Gameplay {
  public countries!: Country[];
  public provinces!: Province[];
  public width!: number;
  public height!: number;
  public seed!: number;

  public create(width: number, height: number, seed: number, countries: COUNTRY_ID[]) {
    this.countries = [];
    this.provinces = [];
    this.width = width;
    this.height = height;
    this.seed = seed;

    for (let i = 0; i < countries.length; ++i) {
      this.countries[i] = new Country(countries[i], 10, 1, 0, 3);
    }

    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        this.provinces[x + width * y] = new Province(x, y);
      }
    }

    game.tilemap.generate(width, height, seed);
  }

  public start() {

  }

  public save() {

  }

  public load() {

  }
}