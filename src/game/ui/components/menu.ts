import { game } from "../../..";
import { COUNTRY_ID } from "../../country";
import { UI_Component } from "../ui_component";

export class Component_Menu extends UI_Component {
  private state = {
    width: 10,
    height: 10,
    countries: [true, true, true, true],
  };

  private dom = {
    elem: () => document.getElementById("menu"),

    buttonCountryGreen: () => document.getElementById("menu_country_green"),
    buttonCountryPurple: () => document.getElementById("menu_country_purple"),
    buttonCountryRed: () => document.getElementById("menu_country_red"),
    buttonCountryYellow: () => document.getElementById("menu_country_yellow"),

    inputSeed: () => document.getElementById("menu_input_seed"),

    buttonWidthIncrease: () => document.getElementById("menu_width_increase"),
    buttonWidthDecrease: () => document.getElementById("menu_width_decrease"),
    elemWidth: () => document.getElementById("menu_width"),

    buttonHeightIncrease: () => document.getElementById("menu_height_increase"),
    buttonHeightDecrease: () => document.getElementById("menu_height_decrease"),
    elemHeight: () => document.getElementById("menu_height"),

    buttonGenerate: () => document.getElementById("menu_generate"),
    buttonStart: () => document.getElementById("menu_start"),
  }

  protected html() {
    return `
      <div>
        <button id="menu_country_green" class="button--country">
          <img src=${game.resources.URL_SPRITES.ARMY_GREEN_BIG} />
        </button>
        <button id="menu_country_purple" class="button--country">
          <img src=${game.resources.URL_SPRITES.ARMY_PURPLE_BIG} />
        </button>
        <button id="menu_country_red" class="button--country">
          <img src=${game.resources.URL_SPRITES.ARMY_RED_BIG} />
        </button>
        <button id="menu_country_yellow" class="button--country">
          <img src=${game.resources.URL_SPRITES.ARMY_YELLOW_BIG} />
        </button>
      </div>

      <div>
        Seed:
        <input id="menu_input_seed" type="text" placeholder="Seed..." />
      </div>

      <div>
        Width:
        <button id="menu_width_decrease"> < </button>
        <span id="menu_width">${this.state.width}</span>
        <button id="menu_width_increase"> > </button>
      </div>

      <div>
        Height:
        <button id="menu_height_decrease"> < </button>
        <span id="menu_height">${this.state.height}</span>
        <button id="menu_height_increase"> > </button>
      </div>

      <div>
        <button id="menu_generate">Generate</button>
        <button id="menu_start">Start</button>
      </div>
    `;
  }

  public render(state?: typeof this.state) {
    if (state) this.state = state;

    this.container = document.createElement("div");
    this.container.id = "menu";
    this.container.innerHTML = this.html();
    document.body.appendChild(this.container);

    // Initialize country buttons
    this.dom.buttonCountryGreen()?.addEventListener("click", (ev) => {
      this.state.countries[0] = !this.state.countries[0];
      (this.dom.buttonCountryGreen() as HTMLElement).classList.toggle("disabled");
    })
    this.dom.buttonCountryPurple()?.addEventListener("click", (ev) => {
      this.state.countries[1] = !this.state.countries[1];
      (this.dom.buttonCountryPurple() as HTMLElement).classList.toggle("disabled");
    })
    this.dom.buttonCountryRed()?.addEventListener("click", (ev) => {
      this.state.countries[2] = !this.state.countries[2];
      (this.dom.buttonCountryRed() as HTMLElement).classList.toggle("disabled");
    })
    this.dom.buttonCountryYellow()?.addEventListener("click", (ev) => {
      this.state.countries[3] = !this.state.countries[3];
      (this.dom.buttonCountryYellow() as HTMLElement).classList.toggle("disabled");
    })

    // Initialize width elements
    this.dom.buttonWidthIncrease()?.addEventListener("click", (ev) => {
      this.state.width = game.maths.clamp(this.state.width + 1, 5, 25);
      (this.dom.elemWidth() as HTMLElement).textContent = this.state.width.toString();
    })
    this.dom.buttonWidthDecrease()?.addEventListener("click", (ev) => {
      this.state.width = game.maths.clamp(this.state.width - 1, 5, 25);
      (this.dom.elemWidth() as HTMLElement).textContent = this.state.width.toString();
    })

    // Initialize height elements
    this.dom.buttonHeightIncrease()?.addEventListener("click", (ev) => {
      this.state.height = game.maths.clamp(this.state.height + 1, 5, 25);
      (this.dom.elemHeight() as HTMLElement).textContent = this.state.height.toString();
    })
    this.dom.buttonHeightDecrease()?.addEventListener("click", (ev) => {
      this.state.height = game.maths.clamp(this.state.height - 1, 5, 25);
      (this.dom.elemHeight() as HTMLElement).textContent = this.state.height.toString();
    })

    this.dom.buttonGenerate()?.addEventListener("click", (ev) => {
      const countries: COUNTRY_ID[] = [];
      for (let i = 0; i < this.state.countries.length; ++i) {
        if (this.state.countries[i]) countries.push(i);
      }

      // There has to be at least 2 countries 
      if (countries.length < 2) return;

      game.gameplay.create(this.state.width, this.state.height, 0, countries)
    })
    this.dom.buttonStart()?.addEventListener("click", (ev) => {
      // Disable menu ui
      this.clear();

      game.gameplay.start();
    })
  }

  public update(state?: typeof this.state) {
    if (state) this.state = state;
  }

  public clear() {
    const elem = this.dom.elem();
    if (elem) elem.parentElement?.removeChild(elem);
  }
}