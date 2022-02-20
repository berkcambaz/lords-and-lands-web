import { game } from "..";
import { Country, COUNTRY_ID } from "./country";
import { Province } from "./province";

export class Gameplay {
  public countries!: Country[];
  public provinces!: Province[];
  public width!: number;
  public height!: number;
  public seed!: number;

  public currentCountry!: Country;

  public create(width: number, height: number, seed: number, countries: COUNTRY_ID[]) {
    this.countries = [];
    this.provinces = [];
    this.width = width;
    this.height = height;
    this.seed = seed;

    for (let i = 0; i < countries.length; ++i) {
      this.countries[i] = new Country(countries[i], 10, 1, 0, 3);
    }

    game.tilemap.generate(width, height, seed, this.countries, this.provinces);
  }

  public start() {
    // First country's turn
    this.currentCountry = this.countries[0];

    // Render the stats ui
    game.ui.stats.render({
      countryId: this.currentCountry.id,
      gold: this.currentCountry.gold,
      income: this.currentCountry.income,
      army: this.currentCountry.army,
      manpower: this.currentCountry.manpower
    })
  }

  public nextTurn() {

  }

  public previousTurn() {
    // TODO: Implement
  }

  public save() {
    // TODO: Implement
  }

  public load() {
    // TODO: Implement
  }
}