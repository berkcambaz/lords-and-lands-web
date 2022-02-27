import { Soda } from "@dorkodu/soda";

import { App } from "./components/App";

export enum MENU_STATE {
  NONE = -1,
  MAIN,
  NEW,
  LOAD,
  SAVE,
  SETTINGS
}

export enum INGAME_STATE {
  NONE = -1,
  MAIN
}

export class UI {
  public menuState: MENU_STATE;
  public ingameState: INGAME_STATE;
  public menuHandler!: () => any;
  public ingameHandler!: () => any;

  constructor() {
    this.menuState = MENU_STATE.MAIN;
    this.ingameState = INGAME_STATE.NONE;
  }

  public init() {
    Soda.render(<App />, document.body);
  }

  public setMenuState(state: MENU_STATE) {
    this.menuState = state;
    this.menuHandler();
  }

  public setIngameState(state: INGAME_STATE) {
    this.ingameState = state;
    //this.ingameHandler();
  }
}