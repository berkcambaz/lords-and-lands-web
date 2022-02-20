import { game } from "../../..";
import { COUNTRY_ID } from "../../country";
import { UI_Component } from "../ui_component";

export class Component_Menu extends UI_Component {
  private state = {
    width: 10,
    height: 10,
    countries: [true, true, true, true],

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
  };

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

  public render() {
    this.container = document.createElement("div");
    this.container.id = "menu";
    this.container.innerHTML = this.html();
    document.body.appendChild(this.container);

    // Initialize country buttons
    this.state.buttonCountryGreen()?.addEventListener("click", (ev) => {
      this.state.countries[0] = !this.state.countries[0];
      (this.state.buttonCountryGreen() as HTMLElement).classList.toggle("disabled");
    })
    this.state.buttonCountryPurple()?.addEventListener("click", (ev) => {
      this.state.countries[1] = !this.state.countries[1];
      (this.state.buttonCountryPurple() as HTMLElement).classList.toggle("disabled");
    })
    this.state.buttonCountryRed()?.addEventListener("click", (ev) => {
      this.state.countries[2] = !this.state.countries[2];
      (this.state.buttonCountryRed() as HTMLElement).classList.toggle("disabled");
    })
    this.state.buttonCountryYellow()?.addEventListener("click", (ev) => {
      this.state.countries[3] = !this.state.countries[3];
      (this.state.buttonCountryYellow() as HTMLElement).classList.toggle("disabled");
    })

    // Initialize width elements
    this.state.buttonWidthIncrease()?.addEventListener("click", (ev) => {
      ++this.state.width;
      (this.state.elemWidth() as HTMLElement).textContent = this.state.width.toString();
    })
    this.state.buttonWidthDecrease()?.addEventListener("click", (ev) => {
      --this.state.width;
      (this.state.elemWidth() as HTMLElement).textContent = this.state.width.toString();
    })

    // Initialize height elements
    this.state.buttonHeightIncrease()?.addEventListener("click", (ev) => {
      ++this.state.height;
      (this.state.elemHeight() as HTMLElement).textContent = this.state.height.toString();
    })
    this.state.buttonHeightDecrease()?.addEventListener("click", (ev) => {
      --this.state.height;
      (this.state.elemHeight() as HTMLElement).textContent = this.state.height.toString();
    })

    this.state.buttonGenerate()?.addEventListener("click", (ev) => {
      const countries: COUNTRY_ID[] = [];
      for (let i = 0; i < this.state.countries.length; ++i) {
        if (this.state.countries[i]) countries.push(i);
      }

      game.gameplay.create(this.state.width, this.state.height, 0, countries)
    })
    this.state.buttonStart()?.addEventListener("click", (ev) => {
      game.gameplay.start();
    })
  }

  public update() {

  }

  public clear() {

  }
}