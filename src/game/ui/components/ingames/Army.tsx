import { Soda } from "@dorkodu/soda";
import { game } from "../../../..";
import { INGAME_STATE } from "../../ui";

export function Army() {
  const goback = () => {
    game.ui.ingameState = INGAME_STATE.MAIN;
    game.ui.ingameHandler();
  }

  return (
    <div>
      <img src={game.resources.URL_SPRITES.UI_ICON_ARMY} onclick={goback} />
      <img src={game.resources.URL_SPRITES.ARMY_GREEN_BIG} />
      <img src={game.resources.URL_SPRITES.UI_ICON_ARROW_RIGHT} />
      <img src={game.resources.URL_SPRITES.UI_ICON_CANCEL} />
    </div>
  )
}