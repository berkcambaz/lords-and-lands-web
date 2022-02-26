import { Soda } from "@dorkodu/soda";
import { game } from "../../..";
import { IconBack } from "./icons/Back";

export function MenuNew() {
  const [countries, setCountries] = Soda.state([true, true, true, true]);
  const [size, setSize] = Soda.state({ w: 10, h: 10 });

  const toggleCountry = (id: number) => {
    countries[id] = !countries[id];
    setCountries(countries);
  }

  return (
    <div class="menunew">
      <button class={"btn--country" + (countries[0] ? "" : " disabled")} onClick={() => { toggleCountry(0) }}>
        <img src={game.resources.URL_SPRITES.ARMY_GREEN_BIG} />
      </button>
      <button class={"btn--country" + (countries[1] ? "" : " disabled")} onClick={() => { toggleCountry(1) }}>
        <img src={game.resources.URL_SPRITES.ARMY_PURPLE_BIG} />
      </button>
      <button class={"btn--country" + (countries[2] ? "" : " disabled")} onClick={() => { toggleCountry(2) }}>
        <img src={game.resources.URL_SPRITES.ARMY_RED_BIG} />
      </button>
      <button class={"btn--country" + (countries[3] ? "" : " disabled")} onClick={() => { toggleCountry(3) }}>
        <img src={game.resources.URL_SPRITES.ARMY_YELLOW_BIG} />
      </button>
      <div>
        Seed: <input type="text" placeholder="Seed..." />
      </div>
      <div>
        <button> &#60; </button>
        Width: {size.w}
        <button> &#62; </button>
      </div>
      <div>
        <button> &#60; </button>
        Height: {size.h}
        <button> &#62; </button>
      </div>
      <div>
        <button>Generate</button>
        <button>Start</button>
      </div>
    </div>
  )
}