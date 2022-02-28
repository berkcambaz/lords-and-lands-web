import { Soda } from "@dorkodu/soda";
import { game } from "../../../..";

export function Main() {
  return (
    <div class="__main">
      <img src={game.resources.URL_SPRITES.UI_ICON_ARMY} class="__first" />
      <img src={game.resources.URL_SPRITES.UI_ICON_BUILDING} />
      <img src={game.resources.URL_SPRITES.UI_ICON_DIPLOMACY} />
      <img src={game.resources.URL_SPRITES.UI_ICON_ARROW_LEFT} />
      <img src={game.resources.URL_SPRITES.UI_ICON_ARROW_RIGHT} />
      <img src={game.resources.URL_SPRITES.UI_ICON_ARROW_RIGHT} />
      <img src={game.resources.URL_SPRITES.LANDMARK_CAPITAL} class="__last" />
    </div>
  )
}