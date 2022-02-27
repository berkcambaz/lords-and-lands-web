import { Soda } from "@dorkodu/soda";

import { game } from "../../..";

import { ICONS } from "./Icons";

import { Main } from "./menus/Main";
import { New } from "./menus/New";
import { Load } from "./menus/Load";
import { Save } from "./menus/Save";
import { Settings } from "./menus/Settings";

import { MENU_STATE } from "../ui";

function getMenuStateComponent() {
  switch (game.ui.menuState) {
    case MENU_STATE.MAIN: return <Main />
    case MENU_STATE.NEW: return <New />
    case MENU_STATE.LOAD: return <Load />
    case MENU_STATE.SAVE: return <Save />
    case MENU_STATE.SETTINGS: return <Settings />
    default: throw new Error(`Menu state with id ${game.ui.menuState} not found.`);
  }
}

export function Menu() {
  return (
    <div class="ui-menu">
      <div class="__top">
        <ICONS.Back class="__icon" />
        <div class="__name-title">Lords and Lands</div>
        <div class="__version-title">v0.0.1</div>
      </div>
      <div class="__mid">{getMenuStateComponent()}</div>
    </div>
  )
}