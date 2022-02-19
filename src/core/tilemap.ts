import { game } from "..";
import { Country } from "../game/country";
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

  public generate(width: number, height: number, seed: number) {
    this.tiles = [];
    this.buffer.canvas.width = this.TILE_SIZE * width;
    this.buffer.canvas.height = this.TILE_SIZE * height;

    this.chooseOrigins();
    this.chooseProvinces();
    this.sprinkleNature();
  }

  public render() {
    // TODO: Only render what is seen, since iOS Safari crashes if you try to 
    // render an image out of bounds
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

  private chooseOrigins() {

  }

  private chooseProvinces() {

  }

  private sprinkleNature() {

  }
}