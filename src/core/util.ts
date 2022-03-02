import { game } from "..";
import { Country, COUNTRY_ID } from "../game/country";
import { ARMY_ID } from "../game/data/armies/_army_data";
import { LANDMARK_ID } from "../game/data/landmarks/_landmark_data";
import { Province } from "../game/province";

export class Util {
  public countryIdToSprite(countryId: COUNTRY_ID) {
    switch (countryId) {
      case COUNTRY_ID.GREEN:
        return game.resources.URL_SPRITES.ARMY_GREEN_BIG;
      case COUNTRY_ID.PURPLE:
        return game.resources.URL_SPRITES.ARMY_PURPLE_BIG;
      case COUNTRY_ID.RED:
        return game.resources.URL_SPRITES.ARMY_RED_BIG;
      case COUNTRY_ID.YELLOW:
        return game.resources.URL_SPRITES.ARMY_YELLOW_BIG;
      default:
        throw Error(`Country with id ${countryId} doesn't exist.`);
    }
  }

  public provinceToSprite(province: Province) {
    switch (province.occupier?.id) {
      case COUNTRY_ID.GREEN:
        return game.resources.SPRITES.TILE_GREEN_OCCUPIED;
      case COUNTRY_ID.PURPLE:
        return game.resources.SPRITES.TILE_PURPLE_OCCUPIED;
      case COUNTRY_ID.RED:
        return game.resources.SPRITES.TILE_RED_OCCUPIED;
      case COUNTRY_ID.YELLOW:
        return game.resources.SPRITES.TILE_YELLOW_OCCUPIED;
    }


    switch (province.owner.id) {
      case COUNTRY_ID.GREEN:
        return game.resources.SPRITES.TILE_GREEN;
      case COUNTRY_ID.PURPLE:
        return game.resources.SPRITES.TILE_PURPLE;
      case COUNTRY_ID.RED:
        return game.resources.SPRITES.TILE_RED;
      case COUNTRY_ID.YELLOW:
        return game.resources.SPRITES.TILE_YELLOW;
      default:
        throw Error(`Country with id ${province.owner.id} doesn't exist.`);
    }
  }


  public provinceToLandmarkSprite(province: Province) {
    if (!province.landmark) return null;

    switch (province.landmark.data.id) {
      case LANDMARK_ID.CAPITAL:
        return game.resources.SPRITES.LANDMARK_CAPITAL;
      case LANDMARK_ID.CHURCH:
        return game.resources.SPRITES.LANDMARK_CHURCH;
      case LANDMARK_ID.FOREST:
        return game.resources.SPRITES.LANDMARK_FOREST;
      case LANDMARK_ID.HOUSE:
        return game.resources.SPRITES.LANDMARK_HOUSE;
      case LANDMARK_ID.MOUNTAINS:
        return game.resources.SPRITES.LANDMARK_MOUNTAINS;
      case LANDMARK_ID.TOWER:
        return game.resources.SPRITES.LANDMARK_TOWER;
      default:
        throw new Error(`Landmark with id ${province.landmark.data.id} doesn't exist.`);
    }
  }

  public provinceToArmySprite(province: Province) {
    if (!province.army) return null;

    switch (province.army.data.id) {
      case ARMY_ID.NORMAL:
        switch (province.army.country.id) {
          case COUNTRY_ID.GREEN:
            return game.resources.SPRITES.ARMY_GREEN_SMALL;
          case COUNTRY_ID.PURPLE:
            return game.resources.SPRITES.ARMY_PURPLE_SMALL;
          case COUNTRY_ID.RED:
            return game.resources.SPRITES.ARMY_RED_SMALL;
          case COUNTRY_ID.YELLOW:
            return game.resources.SPRITES.ARMY_YELLOW_SMALL;
          default:
            throw new Error(`Country with id ${province.owner.id} doesn't exist.`);
        }
      default:
        throw new Error(`Army with id ${province.army.data.id} doesn't exist.`);
    }
  }

  public worldPosToProvince(x: number, y: number) {
    x = Math.floor((x + game.camera.x * game.camera.zoom) / (game.tilemap.TILE_SIZE * game.camera.zoom))
    y = Math.floor((y + game.camera.y * game.camera.zoom) / (game.tilemap.TILE_SIZE * game.camera.zoom))

    return this.tilePosToProvince(x, y);
  }

  public tilePosToProvince(x: number, y: number) {
    if (!game.gameplay.width || !game.gameplay.height)
      return undefined;

    if (x < 0 || x > game.gameplay.width - 1 || y < 0 || y > game.gameplay.height - 1)
      return undefined;

    return game.gameplay.provinces[x + game.gameplay.width * y];
  }

  /// GAMEPLAY UTILITY \\\

  public hasLandmark(country: Country, id: LANDMARK_ID) {
    for (let i = 0; i < game.gameplay.provinces.length; ++i) {
      if (game.gameplay.provinces[i].owner.id === country.id
        && game.gameplay.provinces[i].landmark?.data.id === id) {
        return true;
      }
    }

    return false;
  }

  public getAdjacentProvinces(province: Province) {
    const provinces: Province[] = [];

    const up = game.gameplay.provinces[province.pos.x + (province.pos.y + 1) * game.gameplay.width];
    const down = game.gameplay.provinces[province.pos.x + (province.pos.y - 1) * game.gameplay.width];
    const left = game.gameplay.provinces[(province.pos.x - 1) + province.pos.y * game.gameplay.width];
    const right = game.gameplay.provinces[(province.pos.x + 1) + province.pos.y * game.gameplay.width];

    if (up) provinces.push(up);
    if (down) provinces.push(down);
    if (left) provinces.push(left);
    if (right) provinces.push(right);

    return provinces;
  }

  public checkMoveableProvinces(provinces: Province[]) {
    // TODO: Handle ally situation
    const moveables: Province[] = [];

    for (let i = 0; i < provinces.length; ++i) {
      if (!provinces[i].army || provinces[i].army?.country.id !== game.gameplay.currentCountry.id) {
        moveables.push(provinces[i]);
      }
    }

    return moveables;
  }

  public getSupportBonus(province: Province) {
    let bonus = 0;

    const adjacents = this.getAdjacentProvinces(province);

    for (let i = 0; i < adjacents.length; ++i) {
      // If ally add +0.5 (support)
      // If enemy add -1.0 (encirclement)
      if (province.army?.country.id === adjacents[i].army?.country.id) bonus += 0.5;
      else bonus += -1;
    }

    return bonus;
  }

  public getProvinceCount(country: Country) {
    let count = 0;

    for (let i = 0; i < game.gameplay.provinces.length; ++i) {
      if (game.gameplay.provinces[i].owner.id === country.id) count++;
    }

    return count;
  }
}