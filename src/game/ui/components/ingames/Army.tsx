import { Soda } from "@dorkodu/soda";
import { game } from "../../../..";
import { Army } from "../../../army";
import { ARMY_ID } from "../../../data/armies/_army_data";
import { Landmark } from "../../../landmark";
import { INGAME_STATE } from "../../ui";

export function ArmyUI() {
  const goback = () => {
    game.ui.ingameState = INGAME_STATE.MAIN;
    game.ui.ingameHandler();
  }

  const classRecruit = (id: ARMY_ID) => {
    if (!game.gameplay.currentProvince) return "__hidden";

    const army = Army.create(id);

    if (!Army.availableToRecruit(game.gameplay.currentCountry, game.gameplay.currentProvince, army))
      return "__hidden";

    if (!Army.canRecruit(game.gameplay.currentCountry, game.gameplay.currentProvince, army))
      return "__disabled";
  }

  const classMove = () => {
    if (!game.gameplay.currentProvince) return "__hidden";
    if (!game.gameplay.currentProvince.army) return "__hidden";

    const army = game.gameplay.currentProvince.army.data;

    if (!Army.availableToMove(game.gameplay.currentCountry, game.gameplay.currentProvince, army))
      return "__hidden";

    if (!Army.canMove(game.gameplay.currentCountry, game.gameplay.currentProvince, army))
      return "__disabled";
  }

  const classDisband = () => {
    if (!game.gameplay.currentProvince) return "__hidden";
    if (!game.gameplay.currentProvince.army) return "__hidden";

    const army = game.gameplay.currentProvince.army.data;

    if (!Army.availableToDisband(game.gameplay.currentCountry, game.gameplay.currentProvince, army))
      return "__hidden";

    if (!Army.canDisband(game.gameplay.currentCountry, game.gameplay.currentProvince, army))
      return "__disabled";
  }

  const eventRecruit = (id: ARMY_ID) => {
    const army = Army.create(id);
    Army.recruit(game.gameplay.currentCountry, game.gameplay.currentProvince, army);
  }

  const eventMove = () => {
    if (!game.gameplay.currentProvince) return;
    if (!game.gameplay.currentProvince.army) return;

    const army = game.gameplay.currentProvince.army.data;

    if (!Army.availableToMove(game.gameplay.currentCountry, game.gameplay.currentProvince, army) ||
      !Army.canMove(game.gameplay.currentCountry, game.gameplay.currentProvince, army))
      return;

    const provinces = game.util.getAdjacentProvinces(game.gameplay.currentProvince);
    const moveables = game.util.checkMoveableProvinces(provinces);
    game.tilemap.showProvinces(moveables);
  }

  const eventDisband = () => {
    const army = game.gameplay.currentProvince?.army?.data;
    if (!army) return;
    Army.disband(game.gameplay.currentCountry, game.gameplay.currentProvince, army);
  }

  return (
    <div>
      <img src={game.resources.URL_SPRITES.UI_ICON_ARMY} onclick={goback} />
      <img src={game.resources.URL_SPRITES.ARMY_GREEN_BIG} class={classRecruit(ARMY_ID.NORMAL)} onclick={() => { eventRecruit(ARMY_ID.NORMAL) }} />
      <img src={game.resources.URL_SPRITES.UI_ICON_ARROW_RIGHT} class={classMove()} onclick={eventMove} />
      <img src={game.resources.URL_SPRITES.UI_ICON_CANCEL} class={classDisband()} onclick={eventDisband} />
    </div>
  )
}