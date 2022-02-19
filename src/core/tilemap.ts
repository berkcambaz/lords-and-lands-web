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

  public generate(w: number, h: number, countries: number) {
    this.tiles = [];
    this.buffer.canvas.width = this.TILE_SIZE * w;
    this.buffer.canvas.height = this.TILE_SIZE * h;

    for (let height = 0; height < h; ++height) {
      for (let width = 0; width < w; ++width) {
        this.tiles.push(new Tile(game.resources.SPRITES.TILE_GREEN));
        this.buffer.drawImage(
          game.resources.SPRITES.TILE_GREEN,
          width * this.TILE_SIZE,
          height * this.TILE_SIZE
        );
      }
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

  private chooseOrigins() {
    const origins: { x: number, y: number }[][] = [];

    let unoccupiedProvincesLeft = true;
    while (unoccupiedProvincesLeft) {
      unoccupiedProvincesLeft = false;

      for (let countryId = 0; countryId < countryCount; ++countryId) {
        if (origins[countryId].length === 0) continue;

        const originX = origins[countryId][0].x;
        const originY = origins[countryId][0].y;

        const upIndex = (originX) + (originY - 1) * width;
        const rightIndex = (originX + 1) + (originY) * width;
        const downIndex = (originX) + (originY + 1) * width;
        const leftIndex = (originX - 1) + (originY) * width;

        if (originY - 1 > -1 && provinces[upIndex].country.id === COUNTRY.NONE) {
          origins[countryId].push({ x: originX, y: originY - 1 })
          provinces[upIndex].country = countries[countryId];
          //provinces[upIndex].l1 = util.countryIdToSprite(countryId);
        } else if (originX + 1 < width && provinces[rightIndex].country.id === COUNTRY.NONE) {
          origins[countryId].push({ x: originX + 1, y: originY })
          provinces[rightIndex].country = countries[countryId];
          //provinces[rightIndex].l1 = util.countryIdToSprite(countryId);
        } else if (originY + 1 < height && provinces[downIndex].country.id === COUNTRY.NONE) {
          origins[countryId].push({ x: originX, y: originY + 1 })
          provinces[downIndex].country = countries[countryId];
          //provinces[downIndex].l1 = util.countryIdToSprite(countryId);
        } else if (originX - 1 > -1 && provinces[leftIndex].country.id === COUNTRY.NONE) {
          origins[countryId].push({ x: originX - 1, y: originY })
          provinces[leftIndex].country = countries[countryId];
          //provinces[leftIndex].l1 = util.countryIdToSprite(countryId);
        } else {
          origins[countryId].splice(0, 1);
        }

        unoccupiedProvincesLeft |= origins[countryId] !== 0;
      }
    }
  }
}