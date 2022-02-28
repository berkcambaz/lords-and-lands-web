import { Soda } from "@dorkodu/soda";
import { game } from "../../../..";
import { INGAME_STATE } from "../../ui";

export function Diplomacy() {
  const goback = () => {
    game.ui.ingameState = INGAME_STATE.MAIN;
    game.ui.ingameHandler();
  }

  return (
    <div>
      <img src={game.resources.URL_SPRITES.UI_ICON_DIPLOMACY} onclick={goback} />
    </div>
  )
}