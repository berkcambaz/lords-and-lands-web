import { game } from "..";
import { Country } from "../game/country";
import { Province } from "../game/province";

export class Tilemap {
  public readonly TILE_SIZE = 128;

  private buffer: CanvasRenderingContext2D;

  constructor() {
    const buffer = document.createElement("canvas").getContext("2d");
    if (!buffer) throw Error("HTML Canvas is not supported in the browser.");
    this.buffer = buffer;
  }

  public generate(width: number, height: number, seed: number, countries: Country[], provinces: Province[]) {
    this.buffer.canvas.width = this.TILE_SIZE * width;
    this.buffer.canvas.height = this.TILE_SIZE * height;

    const origins = this.chooseOrigins(width, height, countries.length);
    this.chooseProvinces(width, height, countries, provinces, origins);
    this.sprinkleNature();

    for (let i = 0; i < provinces.length; ++i) {
      this.drawTile(provinces[i]);
    }
  }

  public drawTile(province: Province) {
    this.buffer.drawImage(
      game.util.provinceToSprite(province),
      province.x * this.TILE_SIZE,
      province.y * this.TILE_SIZE
    )
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

  private chooseOrigins(width: number, height: number, countryCount: number) {
    const origins: { x: number, y: number }[][] = [];

    for (let i = 0; i < countryCount; ++i) {
      origins[i] = [{ x: game.random.number(0, width), y: game.random.number(0, height) }];

      for (let j = i - 1; j >= 0; --j) {
        if (origins[j][0].x === origins[i][0].x && origins[j][0].y === origins[i][0].y) {
          --i;
          break;
        }
      }
    }

    return origins;
  }

  private chooseProvinces(
    width: number,
    height: number,
    countries: Country[],
    provinces: Province[],
    origins: { x: number, y: number }[][]
  ) {
    let unoccupiedProvincesLeft = true;
    while (unoccupiedProvincesLeft) {
      unoccupiedProvincesLeft = false;

      for (let countryId = 0; countryId < countries.length; ++countryId) {
        if (origins[countryId].length === 0) continue;

        const originX = origins[countryId][0].x;
        const originY = origins[countryId][0].y;

        const upIndex = (originX) + (originY - 1) * width;
        const rightIndex = (originX + 1) + (originY) * width;
        const downIndex = (originX) + (originY + 1) * width;
        const leftIndex = (originX - 1) + (originY) * width;

        if (originY - 1 > -1 && !provinces[upIndex]) {
          origins[countryId].push({ x: originX, y: originY - 1 })
          provinces[upIndex] = new Province(originX, originY - 1, countries[countryId]);
        } else if (originX + 1 < width && !provinces[rightIndex]) {
          origins[countryId].push({ x: originX + 1, y: originY })
          provinces[rightIndex] = new Province(originX + 1, originY, countries[countryId]);
        } else if (originY + 1 < height && !provinces[downIndex]) {
          origins[countryId].push({ x: originX, y: originY + 1 })
          provinces[downIndex] = new Province(originX, originY + 1, countries[countryId]);
        } else if (originX - 1 > -1 && !provinces[leftIndex]) {
          origins[countryId].push({ x: originX - 1, y: originY })
          provinces[leftIndex] = new Province(originX - 1, originY, countries[countryId]);
        } else {
          origins[countryId].splice(0, 1);
        }

        unoccupiedProvincesLeft = unoccupiedProvincesLeft || origins[countryId] as unknown as number !== 0;
      }
    }
  }

  private sprinkleNature() {

  }
}