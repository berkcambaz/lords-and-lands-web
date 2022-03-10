import { Soda } from "@dorkodu/soda";
import { game } from "../../../..";

export function New() {
  const [countries, setCountries] = Soda.state([true, true, true, true]);
  const [size, setSize] = Soda.state({ w: 10, h: 10 });
  const inputSeed = Soda.ref();
  const inputOnline = Soda.ref();

  const toggleCountry = (id: number) => {
    let countryCount = 0;
    for (let i = 0; i < countries.length; ++i)
      if (countries[i])
        countryCount++;

    if (countries[id] && countryCount == 2) return;

    countries[id] = !countries[id];
    setCountries(countries);
  }

  const changeSize = (w: number, h: number) => {
    size.w = game.maths.clamp(size.w + w, 5, 25);
    size.h = game.maths.clamp(size.h + h, 5, 25);
    setSize(size);
  }

  const toggleOnline = () => {
    if (game.network.isStarted()) {
      game.network.stop();
    }
    else {
      game.network.start();
    }
  }

  const generate = () => {
    const chosenCountries = [];
    for (let i = 0; i < countries.length; ++i)
      if (countries[i])
        chosenCountries.push(i);

    const seed = parseInt(inputSeed.dom.value) || Date.now();
    game.gameplay.create(size.w, size.h, seed, chosenCountries);
  }

  const start = () => {
    game.gameplay.start();
  }

  return (
    <div class="__new">
      <div class="__img-container">
        <img class={countries[0] ? "enabled" : "disabled"} onclick={() => { toggleCountry(0) }} src={game.resources.URL_SPRITES.ARMY_GREEN_BIG} />
        <img class={countries[1] ? "enabled" : "disabled"} onclick={() => { toggleCountry(1) }} src={game.resources.URL_SPRITES.ARMY_PURPLE_BIG} />
        <img class={countries[2] ? "enabled" : "disabled"} onclick={() => { toggleCountry(2) }} src={game.resources.URL_SPRITES.ARMY_RED_BIG} />
        <img class={countries[3] ? "enabled" : "disabled"} onclick={() => { toggleCountry(3) }} src={game.resources.URL_SPRITES.ARMY_YELLOW_BIG} />
      </div>

      <div>
        Seed: <input ref={inputSeed} type="text" placeholder="Seed..." />
      </div>

      <div>
        <span>Width: </span>
        <button class="btn" onClick={() => { changeSize(-1, 0) }}> &#60; </button>
        <span> {size.w} </span>
        <button class="btn" onClick={() => { changeSize(+1, 0) }}> &#62; </button>
      </div>

      <div>
        <span>Height: </span>
        <button class="btn" onClick={() => { changeSize(0, -1) }}> &#60; </button>
        <span> {size.h} </span>
        <button class="btn" onClick={() => { changeSize(0, +1) }}> &#62; </button>
      </div>

      <div>
        <input type="checkbox" checked={game.network.isStarted()} onchange={toggleOnline} />
        Online
        <input type="text" ref={inputOnline} placeholder={game.network.uid === "" ? "Online code..." : game.network.uid} />
      </div>

      <div>
        <button class="btn" onclick={generate}>Generate</button>
        <button class="btn" onclick={start}>Start</button>
      </div>
    </div>
  )
}