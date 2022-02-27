import { Soda } from "@dorkodu/soda";
import { game } from "../../..";
import { ICONS } from "./Icons";

export function Ingame() {
  const [_, update] = Soda.state(0);
  game.ui.ingameHandler = update;

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
        <ICONS.Settings class="__icon" />
      </div>

      <div class="__bottom">

      </div>
    </div>
  )
}