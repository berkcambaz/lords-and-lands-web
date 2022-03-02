import { Soda } from "@dorkodu/soda";
import { game } from "../../../..";
import { INGAME_STATE } from "../../ui";

export function Main() {
  const army = () => {
    game.ui.ingameState = INGAME_STATE.ARMY;
    game.ui.ingameHandler();
  }

  const building = () => {
    game.ui.ingameState = INGAME_STATE.BUILDING;
    game.ui.ingameHandler();
  }

  const diplomacy = () => {
    game.ui.ingameState = INGAME_STATE.DIPLOMACY;
    game.ui.ingameHandler();
  }

  const nextTurn = () => {
    game.gameplay.nextTurn();
  }

  return (
    <div class="__main">
      <img src={game.resources.URL_SPRITES.UI_ICON_ARMY} onclick={army} />
      <img src={game.resources.URL_SPRITES.UI_ICON_BUILDING} onclick={building} />
      <img src={game.resources.URL_SPRITES.UI_ICON_DIPLOMACY} onclick={diplomacy} />
      <img src={game.resources.URL_SPRITES.UI_ICON_ARROW_LEFT} />
      <img src={game.resources.URL_SPRITES.UI_ICON_ARROW_RIGHT} />
      <img src={game.resources.URL_SPRITES.UI_ICON_ARROW_RIGHT} />
      <img src={game.resources.URL_SPRITES.LANDMARK_CAPITAL} onClick={nextTurn} />
    </div>
  )
}