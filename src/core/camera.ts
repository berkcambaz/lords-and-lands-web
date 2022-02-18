import { game } from "..";
import { Game } from "../game/game";

export class Camera {
  public x: number;
  public y: number;
  public w: number;
  public h: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    game.signals.onResize.add(this.onResize);
  }

  private onResize(w: number, h: number) {
    this.w = w;
    this.h = h;

    game.canvas.width = w;
    game.canvas.height = h;
  }
}