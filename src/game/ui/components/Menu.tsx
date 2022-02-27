import { Soda } from "@dorkodu/soda";

import { ICONS } from "./Icons";

export function Menu() {
  return (
    <div class="main-menu">
      <div class="__top">
        <ICONS.Back class="__icon" />
        <div class="__name-title">Lords and Lands</div>
        <div class="__version-title">v0.0.1</div>
      </div>
      <div class="__mid">
        <button class="__main-btn">New</button>
        <button class="__main-btn">Load</button>
        <button class="__main-btn">Save</button>
        <button class="__main-btn">Settings</button>
      </div>
    </div>
  )
}