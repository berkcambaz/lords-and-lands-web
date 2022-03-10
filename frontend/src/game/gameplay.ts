import { game } from "..";
import { Country, COUNTRY_ID } from "./country";
import { LANDMARK_ID } from "./data/landmarks/_landmark_data";
import { Province } from "./province";
import { INGAME_STATE, MENU_STATE } from "./ui/ui";

export class Gameplay {
  public countries!: Country[];
  public provinces!: Province[];
  public width!: number;
  public height!: number;
  public seed!: number;

  public started!: boolean;

  public currentCountry!: Country;
  public currentProvince!: Province | undefined;
  public turn!: number;

  public create(width: number, height: number, seed: number, countries: COUNTRY_ID[]) {
    this.countries = [];
    this.provinces = [];
    this.width = width;
    this.height = height;
    this.seed = seed;

    this.started = false;

    for (let i = 0; i < countries.length; ++i) {
      this.countries[i] = new Country(countries[i], 0, 0, 0, 0);
    }

    game.tilemap.generate(width, height, seed, this.countries, this.provinces);
  }

  public start() {
    this.started = true;

    // First country's turn
    this.currentCountry = this.countries[0];
    this.currentProvince = undefined;
    this.turn = 1;

    // Handle the ui states and update
    game.ui.clearPrevious();
    game.ui.menuState = MENU_STATE.NONE;
    game.ui.ingameState = INGAME_STATE.MAIN;
    game.ui.appHandler();
    game.ui.menuHandler();
    game.ui.ingameHandler();
  }

  public selectProvince(province: Province | undefined) {
    // If game is not started, ingamehandler is not a function
    if (this.started) {
      this.currentProvince = province;
      game.ui.ingameHandler();
    }
  }

  public nextTurn() {
    // If doesn't have a capital, return
    if (!game.util.hasLandmark(this.currentCountry, LANDMARK_ID.CAPITAL)) return;

    // Increase gold by the amount of income & update armies
    this.currentCountry.gold += this.currentCountry.income;
    for (let i = 0; i < this.provinces.length; ++i) {
      // Only update the current country's armies not the others
      if (this.provinces[i].army?.country.id === this.currentCountry.id)
        this.provinces[i].army?.data.onUpdate(this.provinces[i]);
    }

    for (let i = 0; i < this.countries.length; ++i) {
      if (this.countries[i].id === this.currentCountry.id) {
        this.currentCountry = this.countries[(i + 1) % this.countries.length];
        break;
      }
    }

    // Update UI
    game.ui.ingameHandler();
  }

  public undo() {
    // TODO: Implement
  }

  public redo() {
    // TODO: Implement
  }

  public save() {
    // TODO: Implement
  }

  public load() {
    // TODO: Implement
  }
}