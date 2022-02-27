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
  public appHandler!: () => any;

  private previous: (() => any)[];

  constructor() {
    this.menuState = MENU_STATE.MAIN;
    this.ingameState = INGAME_STATE.NONE;
    this.previous = [];
  }

  public init() {
    Soda.render(<App />, document.body);
  }

  public pushPrevious(previous: () => any) {
    this.previous.push(previous);
  }

  public hasPrevious() {
    return this.previous.length > 0;
  }

  public popPrevious() {
    const previous = this.previous.pop();
    if (previous) previous();
  }

  public clearPrevious() {
    this.previous = [];
  }
}