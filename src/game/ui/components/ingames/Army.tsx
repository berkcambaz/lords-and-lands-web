import { Soda } from "@dorkodu/soda";
import { game } from "../../../..";
import { ARMY_ID } from "../../../data/armies/_army_data";
import { INGAME_STATE } from "../../ui";

export function Army() {
  const goback = () => {
    game.ui.ingameState = INGAME_STATE.MAIN;
    game.ui.ingameHandler();
  }

  const classRecruit = () => {
    return "";
  }

  const classMove = () => {
    return "";
  }

  const classDisband = () => {
    return "";
  }

  const eventRecruit = (id: ARMY_ID) => {

  }

  const eventMove = () => {

  }

  const eventDisband = () => {

  }

  return (
    <div>
      <img src={game.resources.URL_SPRITES.UI_ICON_ARMY} onclick={goback} />
      <img src={game.resources.URL_SPRITES.ARMY_GREEN_BIG} class={classRecruit()} onclick={() => { eventRecruit(ARMY_ID.NORMAL) }} />
      <img src={game.resources.URL_SPRITES.UI_ICON_ARROW_RIGHT} class={classMove()} onclick={eventMove} />
      <img src={game.resources.URL_SPRITES.UI_ICON_CANCEL} class={classDisband()} onclick={eventDisband} />
    </div>
  )
}