import { Soda } from "@dorkodu/soda";
import { game } from "../../..";

import { IconSettings } from "./icons/Settings";

export function Stats() {
  const toggleSettings = () => {
    console.log("Toggle settings");
  }

  return (
    <div class="stats" >
      <img class="img--country" src={game.resources.URL_SPRITES.ARMY_GREEN_BIG} />

      <div class="section">
        <div>Gold: {game.gameplay.currentCountry.gold}</div>
        <div>Income: {game.gameplay.currentCountry.income}</div>
      </div>
      <div class="section">
        <div>Army: {game.gameplay.currentCountry.army}</div>
        <div>Manpower: {game.gameplay.currentCountry.manpower}</div>
      </div>
      <div class="section">
        Turn {game.gameplay.turn}
      </div>

      <IconSettings onclick={toggleSettings} classname={"icon"} />
    </div >
  )
}