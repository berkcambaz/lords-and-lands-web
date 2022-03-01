import { game } from "..";
import { Country, COUNTRY_ID } from "./country";
import { Province } from "./province";
import { INGAME_STATE, MENU_STATE } from "./ui/ui";

export class Gameplay {
  public countries!: Country[];
  public provinces!: Province[];
  public width!: number;
  public height!: number;
  public seed!: number;

  public currentCountry!: Country;
  public currentProvince!: Province | undefined;
  public turn!: number;

  public create(width: number, height: number, seed: number, countries: COUNTRY_ID[]) {
    this.countries = [];
    this.provinces = [];
    this.width = width;
    this.height = height;
    this.seed = seed;

    for (let i = 0; i < countries.length; ++i) {
      this.countries[i] = new Country(countries[i], 0, 0, 0, 0);
    }

    game.tilemap.generate(width, height, seed, this.countries, this.provinces);
  }

  public start() {
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
    this.currentProvince = province;
    game.ui.ingameHandler();
  }

  public nextTurn() {
    // TODO: Implement
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