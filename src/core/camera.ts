import { game } from "..";

export class Camera {
  public x: number;
  public y: number;
  public w: number;
  public h: number;
  public zoom: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.zoom = 1;

    game.signals.onResize.add(this.onResize);
  }

  public setZoom(zoom: number) {
    this.zoom = zoom;
  }

  private onResize(w: number, h: number) {
    this.w = w;
    this.h = h;

    game.canvas.width = w;
    game.canvas.height = h;
  }
}