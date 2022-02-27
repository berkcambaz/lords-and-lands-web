import { Soda } from "@dorkodu/soda";
import { game } from "../../../..";

export function New() {
  const [countries, setCountries] = Soda.state([true, true, true, true]);
  const [size, setSize] = Soda.state({ w: 10, h: 10 });

  const toggleCountry = (id: number) => {
    countries[id] = !countries[id];
    setCountries(countries);
  }

  return (
    <div class="__new">
      <div class="__img-container">
        <img class={countries[0] ? "enabled" : "disabled"} onclick={() => { toggleCountry(0) }} src={game.resources.URL_SPRITES.ARMY_GREEN_BIG} />
        <img class={countries[1] ? "enabled" : "disabled"} onclick={() => { toggleCountry(1) }} src={game.resources.URL_SPRITES.ARMY_YELLOW_BIG} />
        <img class={countries[2] ? "enabled" : "disabled"} onclick={() => { toggleCountry(2) }} src={game.resources.URL_SPRITES.ARMY_RED_BIG} />
        <img class={countries[3] ? "enabled" : "disabled"} onclick={() => { toggleCountry(3) }} src={game.resources.URL_SPRITES.ARMY_PURPLE_BIG} />
      </div>

      <div>
        Seed: <input type="text" placeholder="Seed..." />
      </div>

      <div>
        <span>Width: </span>
        <button> &#60; </button>
        <span> 0 </span>
        <button> &#62; </button>
      </div>

      <div>
        <span>Height: </span>
        <button> &#60; </button>
        <span> 0 </span>
        <button> &#62; </button>
      </div>

      <div>
        <button>Generate</button>
        <button>Start</button>
      </div>
    </div>
  )
}