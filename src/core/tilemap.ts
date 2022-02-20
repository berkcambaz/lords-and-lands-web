import { game } from "..";
import { Country } from "../game/country";
import { Landmark, LANDMARK_ID } from "../game/landmark";
import { Province } from "../game/province";

export class Tilemap {
  public readonly TILE_SIZE = 128;

  private buffer: CanvasRenderingContext2D;
  private highlightedProvince: Province | undefined;
  private selectedProvince: Province | undefined;

  constructor() {
    const buffer = document.createElement("canvas").getContext("2d");
    if (!buffer) throw Error("HTML Canvas is not supported in the browser.");
    this.buffer = buffer;
  }

  public generate(width: number, height: number, seed: number, countries: Country[], provinces: Province[]) {
    this.buffer.canvas.width = this.TILE_SIZE * width;
    this.buffer.canvas.height = this.TILE_SIZE * height;

    const origins = this.chooseOrigins(width, height, countries, provinces);
    this.chooseProvinces(width, height, countries, provinces, origins);
    this.sprinkleNature(width, height, provinces);

    for (let i = 0; i < provinces.length; ++i) {
      this.drawTile(provinces[i]);
    }
  }

  public drawTile(province: Province) {
    this.buffer.clearRect(province.x * this.TILE_SIZE, province.y * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE);

    const provinceSprite = game.util.provinceToSprite(province);
    this.buffer.drawImage(provinceSprite, province.x * this.TILE_SIZE, province.y * this.TILE_SIZE)

    const landmarkSprite = game.util.provinceToLandmarkSprite(province);
    if (landmarkSprite) {
      this.buffer.drawImage(landmarkSprite, province.x * this.TILE_SIZE, province.y * this.TILE_SIZE)
    }

    if (this.selectedProvince
      && province.x === this.selectedProvince.x
      && province.y === this.selectedProvince.y) {
      this.buffer.drawImage(
        game.resources.SPRITES.TILEMAP_SELECTED,
        province.x * this.TILE_SIZE,
        province.y * this.TILE_SIZE
      );
    }

    if (this.highlightedProvince
      && province.x === this.highlightedProvince.x
      && province.y === this.highlightedProvince.y) {
      this.buffer.drawImage(
        game.resources.SPRITES.TILEMAP_SELECT_WHITE,
        province.x * this.TILE_SIZE,
        province.y * this.TILE_SIZE
      );
    }
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

  public highlightProvince(province: Province | undefined) {
    // Mouse is not over the tilemap
    if (!province) {
      if (!this.highlightedProvince) return;

      const oldProvince = this.highlightedProvince;
      this.highlightedProvince = undefined;

      this.drawTile(oldProvince);
      return;
    }

    const x = province.x;
    const y = province.y;

    // Mouse is still over the same province
    if (this.highlightedProvince && this.highlightedProvince.x === x && this.highlightedProvince.y === y)
      return;

    // Remove highlight from old province
    const oldProvince = this.highlightedProvince;
    this.highlightedProvince = undefined;
    if (oldProvince) this.drawTile(oldProvince);

    // Add highlight to new province
    this.highlightedProvince = province;
    this.drawTile(province);
  }

  public selectProvince(province: Province | undefined) {
    // Un-select the old province
    const oldProvince = this.selectedProvince;
    this.selectedProvince = undefined;
    if (oldProvince) this.drawTile(oldProvince);

    // Select the new province if it exists and not the same province as the old one
    if (province && (!oldProvince || oldProvince.x !== province.x || oldProvince.y !== province.y)) {
      this.selectedProvince = province;
      this.drawTile(province);
    }
  }

  private chooseOrigins(width: number, height: number, countries: Country[], provinces: Province[]) {
    const origins: { x: number, y: number }[][] = [];

    for (let i = 0; i < countries.length; ++i) {
      origins[i] = [{ x: game.random.number(0, width), y: game.random.number(0, height) }];

      for (let j = i - 1; j >= 0; --j) {
        if (origins[j][0].x === origins[i][0].x && origins[j][0].y === origins[i][0].y) {
          --i;
          break;
        }
      }
    }

    for (let i = 0; i < countries.length; ++i) {
      provinces[origins[i][0].x + origins[i][0].y * width] = new Province(
        origins[i][0].x,
        origins[i][0].y,
        countries[i],
        new Landmark(LANDMARK_ID.NONE)
      );
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
          provinces[upIndex] = new Province(originX, originY - 1, countries[countryId], new Landmark(LANDMARK_ID.NONE));
        } else if (originX + 1 < width && !provinces[rightIndex]) {
          origins[countryId].push({ x: originX + 1, y: originY })
          provinces[rightIndex] = new Province(originX + 1, originY, countries[countryId], new Landmark(LANDMARK_ID.NONE));
        } else if (originY + 1 < height && !provinces[downIndex]) {
          origins[countryId].push({ x: originX, y: originY + 1 })
          provinces[downIndex] = new Province(originX, originY + 1, countries[countryId], new Landmark(LANDMARK_ID.NONE));
        } else if (originX - 1 > -1 && !provinces[leftIndex]) {
          origins[countryId].push({ x: originX - 1, y: originY })
          provinces[leftIndex] = new Province(originX - 1, originY, countries[countryId], new Landmark(LANDMARK_ID.NONE));
        } else {
          origins[countryId].splice(0, 1);
        }

        unoccupiedProvincesLeft = unoccupiedProvincesLeft || origins[countryId] as unknown as number !== 0;
      }
    }
  }

  private sprinkleNature(width: number, height: number, provinces: Province[]) {
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        provinces[x + y * width].landmark.id = game.random.percent([
          { percent: 10, result: LANDMARK_ID.MOUNTAINS },
          { percent: 15, result: LANDMARK_ID.FOREST },
          { percent: 75, result: LANDMARK_ID.NONE }
        ])
      }
    }
  }
}