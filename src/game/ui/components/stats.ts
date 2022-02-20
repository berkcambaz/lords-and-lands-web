import { game } from "../../..";
import { COUNTRY_ID } from "../../country";
import { UI_Component } from "../ui_component";

export class Component_Stats extends UI_Component {
  private state = {
    countryId: COUNTRY_ID.GREEN,
    gold: 0,
    income: 0,
    army: 0,
    manpower: 0,
  };

  private dom = {
    elem: () => document.getElementById("stats"),

    elemGold: () => document.getElementById("stats_gold"),
    elemIncome: () => document.getElementById("stats_income"),
    elemArmy: () => document.getElementById("stats_army"),
    elemManpower: () => document.getElementById("stats_manpower"),
  }

  protected html() {
    return `
      <img class="img--country" src="${game.util.countryIdToSprite(this.state.countryId)}" />
      <div class="info">
        <span>Gold: ${this.state.gold}</span>
        <span>Income: ${this.state.income}</span>
        <span>Army: ${this.state.army}</span>
        <span>Manpower: ${this.state.manpower}</span>
      </div>
    `;
  }

  public render(state?: typeof this.state) {
    if (state) this.state = state;

    this.container = document.createElement("div");
    this.container.id = "stats";
    this.container.innerHTML = this.html();
    document.body.appendChild(this.container);
  }

  public update(state?: typeof this.state) {
    if (state) this.state = state;
  }

  public clear() {
    const elem = this.dom.elem();
    if (elem) elem.parentElement?.removeChild(elem);
  }
}