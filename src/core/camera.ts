import { game } from "..";

export class Camera {
  public x: number;
  public y: number;
  public w: number;
  public h: number;
  public zoom: number;
  private zoomPoint: { x: number, y: number };

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.zoom = 0.5;
    this.zoomPoint = { x: this.w / (this.zoom * 2), y: this.h / (this.zoom * 2) }

    game.signals.onResize.add((w, h) => { this.onResize(w, h) });
  }

  public setZoom(delta: number) {
    const dt = Math.sign(-delta) * 0.05;
    this.zoom = game.maths.clamp(this.zoom + dt, 0.50, 1);

    game.ctx.setTransform(this.zoom, 0, 0, this.zoom, 0, 0);

    const newZoomPointX = window.innerWidth / (this.zoom * 2);
    const newZoomPointY = window.innerHeight / (this.zoom * 2);

    this.x -= -this.zoomPoint.x + newZoomPointX;
    this.y -= -this.zoomPoint.y + newZoomPointY;

    this.zoomPoint.x = newZoomPointX;
    this.zoomPoint.y = newZoomPointY;

    this.w = window.innerWidth / this.zoom;
    this.h = window.innerHeight / this.zoom;
  }

  private onResize(w: number, h: number) {

    game.canvas.width = w;
    game.canvas.height = h;

    game.ctx.setTransform(this.zoom, 0, 0, this.zoom, 0, 0);

    this.w = w / this.zoom;
    this.h = h / this.zoom;

    this.zoomPoint.x = w / (this.zoom * 2);
    this.zoomPoint.y = h / (this.zoom * 2);
  }
}