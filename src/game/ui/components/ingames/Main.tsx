import { Soda } from "@dorkodu/soda";
import { game } from "../../../..";

export function Main() {
  return (
    <div class="__main">
      <img src={game.resources.URL_SPRITES.UI_ICON_ARMY} />
      <img src={game.resources.URL_SPRITES.UI_ICON_BUILDING} />
      <img src={game.resources.URL_SPRITES.UI_ICON_DIPLOMACY} />
    </div>
  )
}