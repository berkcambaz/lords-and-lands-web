import { game } from "..";
import { Country } from "../game/country";
import { Landmark } from "../game/landmark";
import { Province } from "../game/province";
import { Vec2 } from "./vec2";

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
    this.buffer.clearRect(
      province.pos.x * this.TILE_SIZE,
      province.pos.y * this.TILE_SIZE,
      this.TILE_SIZE, this.TILE_SIZE
    );

    const provinceSprite = game.util.provinceToSprite(province);
    this.buffer.drawImage(provinceSprite, province.pos.x * this.TILE_SIZE, province.pos.y * this.TILE_SIZE)

    const landmarkSprite = game.util.provinceToLandmarkSprite(province);
    if (landmarkSprite) {
      this.buffer.drawImage(landmarkSprite, province.pos.x * this.TILE_SIZE, province.pos.y * this.TILE_SIZE)
    }

    if (this.selectedProvince && Vec2.equals(province.pos, this.selectedProvince.pos)) {
      this.buffer.drawImage(
        game.resources.SPRITES.TILEMAP_SELECTED,
        province.pos.x * this.TILE_SIZE,
        province.pos.y * this.TILE_SIZE
      );

      this.buffer.drawImage(
        game.resources.SPRITES.TILEMAP_SELECT_GRAY,
        province.pos.x * this.TILE_SIZE,
        province.pos.y * this.TILE_SIZE
      );
    }

    if (this.highlightedProvince && Vec2.equals(province.pos, this.highlightedProvince.pos)) {
      if (!this.selectedProvince || !Vec2.equals(province.pos, this.selectedProvince.pos))
        this.buffer.drawImage(
          game.resources.SPRITES.TILEMAP_SELECT_WHITE,
          province.pos.x * this.TILE_SIZE,
          province.pos.y * this.TILE_SIZE
        );
    }
  }

  public render() {
    let x = game.camera.x;
    let y = game.camera.y;
    let w = this.buffer.canvas.width;
    let h = this.buffer.canvas.height;

    let targetX = 0;
    let targetY = 0;

    if (x < 0) {
      targetX = -x;
      x = 0;
    }
    if (y < 0) {
      targetY = -y;
      y = 0;
    }

    if (x + w > game.camera.w) {
      w -= x;
    }
    if (y + h > game.camera.h) {
      h -= y;
    }

    game.ctx.drawImage(
      this.buffer.canvas,
      x,
      y,
      w,
      h,
      targetX,
      targetY,
      w,
      h
    )
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

    // Mouse is still over the same province
    if (this.highlightedProvince && Vec2.equals(this.highlightedProvince.pos, province.pos))
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
    if (province && (!oldProvince || !Vec2.equals(oldProvince.pos, province.pos))) {
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
        new Vec2(origins[i][0].x, origins[i][0].y),
        countries[i]
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
          provinces[upIndex] = new Province(new Vec2(originX, originY - 1), countries[countryId], undefined);
        } else if (originX + 1 < width && !provinces[rightIndex]) {
          origins[countryId].push({ x: originX + 1, y: originY })
          provinces[rightIndex] = new Province(new Vec2(originX + 1, originY), countries[countryId], undefined);
        } else if (originY + 1 < height && !provinces[downIndex]) {
          origins[countryId].push({ x: originX, y: originY + 1 })
          provinces[downIndex] = new Province(new Vec2(originX, originY + 1), countries[countryId], undefined);
        } else if (originX - 1 > -1 && !provinces[leftIndex]) {
          origins[countryId].push({ x: originX - 1, y: originY })
          provinces[leftIndex] = new Province(new Vec2(originX - 1, originY), countries[countryId], undefined);
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
        provinces[x + y * width].landmark = game.random.percent([
          { percent: 10, result: Landmark.getLandmarkData("MOUNTAINS") },
          { percent: 15, result: Landmark.getLandmarkData("FOREST") },
          { percent: 75, result: undefined }
        ])
      }
    }
  }
}