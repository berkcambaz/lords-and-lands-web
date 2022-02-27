import { Soda } from "@dorkodu/soda";
import { ICONS } from "./Icons";

export function MainMenu() {
  return (
    <div class="main-menu">
      <div class="__bar">
        <ICONS.Back class="__icon" />
        <div class="__name-title">Lords and Lands</div>
        <div class="__version-title">v0.0.1</div>
      </div>
    </div>
  )
}