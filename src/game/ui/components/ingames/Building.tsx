import { Soda } from "@dorkodu/soda";
import { game } from "../../../..";
import { LANDMARK_ID } from "../../../data/landmarks/_landmark_data";
import { Landmark } from "../../../landmark";
import { INGAME_STATE } from "../../ui";

export function Building() {
  const goback = () => {
    game.ui.ingameState = INGAME_STATE.MAIN;
    game.ui.ingameHandler();
  }

  const classLandmark = (id: LANDMARK_ID) => {
    if (!game.gameplay.currentProvince) return "__hidden";

    const landmark = Landmark.create(id);

    if (!Landmark.availableToBuild(game.gameplay.currentCountry, game.gameplay.currentProvince, landmark))
      return "__hidden";

    if (!Landmark.canBuild(game.gameplay.currentCountry, game.gameplay.currentProvince, landmark))
      return "__disabled";
  }

  const classDemolish = () => {
    if (!game.gameplay.currentProvince) return "__hidden";
    if (!game.gameplay.currentProvince.landmark) return "__hidden";

    const landmark = game.gameplay.currentProvince.landmark.data;

    if (!Landmark.availableToDemolish(game.gameplay.currentCountry, game.gameplay.currentProvince, landmark))
      return "__hidden";

    if (!Landmark.canDemolish(game.gameplay.currentCountry, game.gameplay.currentProvince, landmark))
      return "__disabled";
  }

  const eventBuild = (id: LANDMARK_ID) => {
    const landmark = Landmark.create(id);
    Landmark.build(game.gameplay.currentProvince, landmark);
  }

  const eventDemolish = () => {
    const landmark = game.gameplay.currentProvince?.landmark?.data;
    if (!landmark) return;
    Landmark.demolish(game.gameplay.currentProvince, landmark);
  }

  return (
    <div>
      <img src={game.resources.URL_SPRITES.UI_ICON_BUILDING} onclick={goback} />
      <img src={game.resources.URL_SPRITES.LANDMARK_CAPITAL} class={classLandmark(LANDMARK_ID.CAPITAL)} onclick={() => { eventBuild(LANDMARK_ID.CAPITAL) }} />
      <img src={game.resources.URL_SPRITES.LANDMARK_CHURCH} class={classLandmark(LANDMARK_ID.CHURCH)} onclick={() => { eventBuild(LANDMARK_ID.CHURCH) }} />
      <img src={game.resources.URL_SPRITES.LANDMARK_HOUSE} class={classLandmark(LANDMARK_ID.HOUSE)} onclick={() => { eventBuild(LANDMARK_ID.HOUSE) }} />
      <img src={game.resources.URL_SPRITES.LANDMARK_TOWER} class={classLandmark(LANDMARK_ID.TOWER)} onclick={() => { eventBuild(LANDMARK_ID.TOWER) }} />
      <img src={game.resources.URL_SPRITES.UI_ICON_CANCEL} class={classDemolish()} onclick={eventDemolish()} />
    </div>
  )
}