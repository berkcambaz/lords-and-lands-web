import { game } from "../../..";
import { UI_Component } from "../ui_component";

interface State {
  width: number;
  height: number;
  input: HTMLInputElement | null;
}

export class Component_Menu extends UI_Component {
  private state: State = {
    width: 10,
    height: 10,
    input: null
  };

  protected html() {
    return `
      <div>
        <button class="button--country">
          <img src=${game.resources.URL_SPRITES.ARMY_GREEN_BIG} />
        </button>
        <button class="button--country">
          <img src=${game.resources.URL_SPRITES.ARMY_PURPLE_BIG} />
        </button>
        <button class="button--country">
          <img src=${game.resources.URL_SPRITES.ARMY_RED_BIG} />
        </button>
        <button class="button--country">
          <img src=${game.resources.URL_SPRITES.ARMY_YELLOW_BIG} />
        </button>
      </div>

      <div>
        Seed:
        <input type="text" placeholder="Seed..." />
      </div>

      <div>
        Width:
        <button> < </button>
        ${this.state.width}
        <button> > </button>
      </div>

      <div>
        Height:
        <button> < </button>
        ${this.state.height}
        <button> > </button>
      </div>

      <div>
        <button>Generate</button>
        <button>Start</button>
      </div>
    `;
  }

  public render() {
    this.container = document.createElement("div");
    this.container.id = "menu";
    this.container.innerHTML = this.html();
    document.body.appendChild(this.container);
  }

  public update() {

  }

  public clear() {

  }
}