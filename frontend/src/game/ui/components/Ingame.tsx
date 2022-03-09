import { Soda } from "@dorkodu/soda";
import { game } from "../../..";
import { INGAME_STATE, MENU_STATE } from "../ui";
import { ICONS } from "./Icons";
import { Main } from "./ingames/Main";
import { ArmyUI } from "./ingames/Army";
import { LandmarkUI } from "./ingames/Landmark";
import { DiplomacyUI } from "./ingames/Diplomacy";

function getIngameStateComponent() {
  switch (game.ui.ingameState) {
    case INGAME_STATE.NONE: return "";
    case INGAME_STATE.MAIN: return <Main />
    case INGAME_STATE.ARMY: return <ArmyUI />
    case INGAME_STATE.BUILDING: return <LandmarkUI />
    case INGAME_STATE.DIPLOMACY: return <DiplomacyUI />
    default: throw new Error(`Ingame state with id ${game.ui.ingameState} not found.`);
  }
}

export function Ingame() {
  const [_, update] = Soda.state(0);
  game.ui.ingameHandler = update;

  const settings = () => {
    game.ui.pushPrevious(() => {
      game.ui.menuState = MENU_STATE.NONE;
      game.ui.ingameState = INGAME_STATE.MAIN;
      game.ui.appHandler();
      game.ui.menuHandler();
      game.ui.ingameHandler();
    })
    game.ui.menuState = MENU_STATE.MAIN;
    game.ui.ingameState = INGAME_STATE.NONE;
    game.ui.appHandler();
    game.ui.menuHandler();
    game.ui.ingameHandler();
  }

  return (
    <div class="ui-ingame">
      <div class="__top">
        <img src={game.util.countryIdToSprite(game.gameplay.currentCountry.id)} />
        <div class="__info">
          <div>Gold: {game.gameplay.currentCountry.gold}</div>
          <div>Income: {game.gameplay.currentCountry.income}</div>
        </div>
        <div class="__info">
          <div>Army: {game.gameplay.currentCountry.army}</div>
          <div>Manpower: {game.gameplay.currentCountry.manpower}</div>
        </div>
        <ICONS.Settings class="__icon" onclick={settings} />
      </div>
      <div class="__bottom">
        {getIngameStateComponent()}
      </div>
    </div>
  )
}