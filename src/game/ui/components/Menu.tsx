import { Soda } from "@dorkodu/soda";

import { ICONS } from "./Icons";

import { Main } from "./menus/Main";
import { New } from "./menus/New";
import { Load } from "./menus/Load";
import { Settings } from "./menus/Settings";

export function Menu() {
  return (
    <div class="ui-menu">
      <div class="__top">
        <ICONS.Back class="__icon" />
        <div class="__name-title">Lords and Lands</div>
        <div class="__version-title">v0.0.1</div>
      </div>
      <div class="__mid">
        <Main />
      </div>
    </div>
  )
}