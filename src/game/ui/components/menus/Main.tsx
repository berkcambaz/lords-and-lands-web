import { Soda } from "@dorkodu/soda";

import { game } from "../../../..";
import { MENU_STATE } from "../../ui";

export function Main() {
  const [_, update] = Soda.state(0);

  return (
    <div class="__main">
      <button class="__btn" onclick={() => { game.ui.setMenuState(MENU_STATE.NEW) }}>New</button>
      <button class="__btn" onclick={() => { game.ui.setMenuState(MENU_STATE.LOAD) }}>Load</button>
      <button class="__btn" onclick={() => { game.ui.setMenuState(MENU_STATE.SAVE) }}>Save</button>
      <button class="__btn" onclick={() => { game.ui.setMenuState(MENU_STATE.SETTINGS) }}>Settings</button>
    </div>
  )
}