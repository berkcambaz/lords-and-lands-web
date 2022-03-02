import { game } from "..";
import { Army } from "../game/army";
import { Country } from "../game/country";
import { LandmarkData, LANDMARK_ID } from "../game/data/landmarks/_landmark_data";
import { Landmark } from "../game/landmark";
import { Province } from "../game/province";
import { Vec2 } from "./vec2";

export class Tilemap {
  public readonly TILE_SIZE = 128;

  private buffer: CanvasRenderingContext2D;
  private highlightedProvince: Province | undefined;
  private selectedProvince: Province | undefined;
  private shownProvinces!: Province[];

  constructor() {
    const buffer = document.createElement("canvas").getContext("2d");
    if (!buffer) throw Error("HTML Canvas is not supported in the browser.");
    this.buffer = buffer;
  }

  public generate(width: number, height: number, seed: number, countries: Country[], provinces: Province[]) {
    this.buffer.canvas.width = this.TILE_SIZE * width;
    this.buffer.canvas.height = this.TILE_SIZE * height;

    // Reset highlighted, selected & shown provinces
    this.highlightedProvince = undefined;
    this.selectedProvince = undefined;
    this.shownProvinces = [];

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

    // Render province
    const provinceSprite = game.util.provinceToSprite(province);
    this.buffer.drawImage(provinceSprite, province.pos.x * this.TILE_SIZE, province.pos.y * this.TILE_SIZE)

    // Render landmark
    const landmarkSprite = game.util.provinceToLandmarkSprite(province);
    if (landmarkSprite) {
      this.buffer.drawImage(landmarkSprite, province.pos.x * this.TILE_SIZE, province.pos.y * this.TILE_SIZE)
    }

    // Render army
    const armySprite = game.util.provinceToArmySprite(province);
    if (armySprite) {
      this.buffer.drawImage(armySprite, province.pos.x * this.TILE_SIZE, province.pos.y * this.TILE_SIZE)
    }

    // Render shown
    if (this.shownProvinces.length > 0) {
      for (let i = 0; i < this.shownProvinces.length; ++i) {
        if (Province.equals(province, this.shownProvinces[i])) {
          this.buffer.drawImage(
            game.resources.SPRITES.TILEMAP_SELECT_GRAY,
            province.pos.x * this.TILE_SIZE,
            province.pos.y * this.TILE_SIZE
          );
          break;
        }
      }
    }

    // Render selected
    if (this.selectedProvince && Province.equals(province, this.selectedProvince)) {
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

    // Render highlighted
    if (this.highlightedProvince && Province.equals(province, this.highlightedProvince)) {
      if (!this.selectedProvince || !Province.equals(province, this.selectedProvince))
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
    if (this.highlightedProvince && Province.equals(this.highlightedProvince, province))
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
    // Reset the shown provinces
    const shownProvinces = this.shownProvinces;
    this.shownProvinces = []
    for (let i = 0; i < shownProvinces.length; ++i) {
      // If clicked to a shown province, try to move the army
      if (province && Province.equals(province, shownProvinces[i])) {
        const army = game.gameplay.currentProvince?.army?.data;
        if (!army) return;
        Army.move(game.gameplay.currentCountry, game.gameplay.currentProvince, province, army);
      }

      this.drawTile(shownProvinces[i]);
    }

    // Un-select the old province
    const oldProvince = this.selectedProvince;
    this.selectedProvince = undefined;
    if (oldProvince) this.drawTile(oldProvince);

    // Select the new province if it exists and not the same province as the old one
    if (province && (!oldProvince || !Province.equals(oldProvince, province))) {
      this.selectedProvince = province;
      this.drawTile(province);
    }

    game.gameplay.selectProvince(this.selectedProvince);
  }

  public showProvinces(provinces: Province[]) {
    const oldProvinces = this.shownProvinces;

    if (provinces.length === 0 || Province.equalsArray(oldProvinces, provinces)) {
      this.shownProvinces = [];
      for (let i = 0; i < oldProvinces.length; ++i) {
        this.drawTile(oldProvinces[i]);
      }
    }
    else {
      this.shownProvinces = provinces;
      for (let i = 0; i < provinces.length; ++i) {
        this.drawTile(provinces[i]);
      }
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
          provinces[upIndex] = new Province(new Vec2(originX, originY - 1), countries[countryId]);
        } else if (originX + 1 < width && !provinces[rightIndex]) {
          origins[countryId].push({ x: originX + 1, y: originY })
          provinces[rightIndex] = new Province(new Vec2(originX + 1, originY), countries[countryId]);
        } else if (originY + 1 < height && !provinces[downIndex]) {
          origins[countryId].push({ x: originX, y: originY + 1 })
          provinces[downIndex] = new Province(new Vec2(originX, originY + 1), countries[countryId]);
        } else if (originX - 1 > -1 && !provinces[leftIndex]) {
          origins[countryId].push({ x: originX - 1, y: originY })
          provinces[leftIndex] = new Province(new Vec2(originX - 1, originY), countries[countryId]);
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
        const data: LandmarkData | undefined = game.random.percent([
          { percent: 10, result: Landmark.create(LANDMARK_ID.MOUNTAINS) },
          { percent: 15, result: Landmark.create(LANDMARK_ID.FOREST) },
          { percent: 75, result: undefined }
        ])

        if (data) provinces[x + y * width].landmark = new Landmark(data);
      }
    }
  }
}