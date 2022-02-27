import { Soda } from "@dorkodu/soda";
import { game } from "../../..";
import { INGAME_STATE, MENU_STATE } from "../ui";
import { ICONS } from "./Icons";

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

      </div>
    </div>
  )
}