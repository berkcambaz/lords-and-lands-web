import { Component_Menu } from "./components/menu";
import { Component_Stats } from "./components/stats";

export class UI {
  private menu: Component_Menu;
  private stats: Component_Stats;

  constructor() {
    this.menu = new Component_Menu();
    this.stats = new Component_Stats();
  }

  public init() {
    this.menu.render();
    this.stats.render();
  }
}