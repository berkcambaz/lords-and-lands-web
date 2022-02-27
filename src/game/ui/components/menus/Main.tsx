import { Soda } from "@dorkodu/soda";

import { game } from "../../../..";
import { MENU_STATE } from "../../ui";

function menuMain() {
  game.ui.menuState = MENU_STATE.MAIN;
  game.ui.menuHandler();
}

export function Main() {
  const menuNew = () => {
    game.ui.pushPrevious(menuMain);
    game.ui.menuState = MENU_STATE.NEW;
    game.ui.menuHandler();
  }
  const menuLoad = () => {
    game.ui.pushPrevious(menuMain);
    game.ui.menuState = MENU_STATE.LOAD;
    game.ui.menuHandler();
  }
  const menuSave = () => {
    game.ui.pushPrevious(menuMain);
    game.ui.menuState = MENU_STATE.SAVE;
    game.ui.menuHandler();
  }
  const menuSettings = () => {
    game.ui.pushPrevious(menuMain);
    game.ui.menuState = MENU_STATE.SETTINGS;
    game.ui.menuHandler();
  }

  return (
    <div class="__main">
      <button class="__btn" onclick={menuNew}>New</button>
      <button class="__btn" onclick={menuLoad}>Load</button>
      <button class="__btn" onclick={menuSave}>Save</button>
      <button class="__btn" onclick={menuSettings}>Settings</button>
    </div>
  )
}