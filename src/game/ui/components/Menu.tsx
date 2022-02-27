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
        <button>New</button>
        <button>Load</button>
        <button>Save</button>
        <button>Settings</button>
      </div>
    </div>
  )
}