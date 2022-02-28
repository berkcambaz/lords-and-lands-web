import { Soda } from "@dorkodu/soda";
import { game } from "../../../..";
import { INGAME_STATE } from "../../ui";

export function Building() {
  const goback = () => {
    game.ui.ingameState = INGAME_STATE.MAIN;
    game.ui.ingameHandler();
  }

  return (
    <div>
      <img src={game.resources.URL_SPRITES.UI_ICON_BUILDING} onclick={goback} />
      <img src={game.resources.URL_SPRITES.LANDMARK_CAPITAL} />
      <img src={game.resources.URL_SPRITES.LANDMARK_CHURCH} />
      <img src={game.resources.URL_SPRITES.LANDMARK_HOUSE} />
      <img src={game.resources.URL_SPRITES.LANDMARK_TOWER} />
      <img src={game.resources.URL_SPRITES.UI_ICON_CANCEL} />
    </div>
  )
}