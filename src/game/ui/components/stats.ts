import { game } from "../../..";
import { UI_Component } from "../ui_component";

export class Component_Stats extends UI_Component {
  private state = {

  };

  protected html() {
    return `
      <img class="img--country" src="${game.resources.URL_SPRITES.ARMY_GREEN_BIG}" />
      <div class="info">
        <span>Gold: 0</span>
        <span>Income: 0</span>
        <span>Army: 0</span>
        <span>Manpower: 0</span>
      </div>
    `;
  }

  public render() {
    this.container = document.createElement("div");
    this.container.id = "stats";
    this.container.innerHTML = this.html();
    document.body.appendChild(this.container);
  }

  public update() {

  }

  public clear() {
    const elem = document.getElementById("stats");
    if (elem) elem.parentElement?.removeChild(elem);
  }
}