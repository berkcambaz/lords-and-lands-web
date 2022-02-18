import { game } from "..";
import { Tile } from "./tile";

export class Tilemap {
  public readonly TILE_SIZE = 128;

  private tiles: Tile[] = [];
  private buffer: CanvasRenderingContext2D;

  constructor() {
    const buffer = document.createElement("canvas").getContext("2d");
    if (!buffer) throw Error("HTML Canvas is not supported in the browser.");
    this.buffer = buffer;
  }

  public generate(w: number, h: number) {
    this.tiles = [];
    this.buffer.canvas.width = this.TILE_SIZE * w;
    this.buffer.canvas.height = this.TILE_SIZE * h;

    for (let i = 0; i < w * h; ++i) {
      this.tiles.push(new Tile());
    }
  }

  public render() {
    game.ctx.drawImage(
      this.buffer.canvas,
      game.camera.x,
      game.camera.y,
      game.camera.w,
      game.camera.h,
      0,
      0,
      game.camera.w,
      game.camera.h
    )
  }

  public save() {

  }

  public load() {

  }
}