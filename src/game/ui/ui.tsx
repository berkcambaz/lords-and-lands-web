import { Soda } from "@dorkodu/soda";

import { App } from "./components/App";

export enum MENU_STATE {
  MAIN,
  NEW,
  LOAD,
  SAVE,
  SETTINGS
}

export enum INGAME_STATE {
  MAIN
}

export class UI {
  public menuState: MENU_STATE;
  public ingameState: INGAME_STATE;

  constructor() {
    this.menuState = MENU_STATE.MAIN;
    this.ingameState = INGAME_STATE.MAIN;
  }

  public init() {
    Soda.render(<App />, document.body);
  }

  public setMenuState(state: MENU_STATE) {
    this.menuState = state;
  }

  public setIngameState(state: INGAME_STATE) {
    this.ingameState = state;
  }
}