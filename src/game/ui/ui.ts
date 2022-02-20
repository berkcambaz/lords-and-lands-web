import { Component_Menu } from "./components/menu";

export class UI {
  private menu!: Component_Menu;

  constructor() {
    this.menu = new Component_Menu();
  }

  public init() {
    this.menu.render();
  }
}