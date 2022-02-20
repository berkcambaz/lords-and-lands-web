import { game } from "..";
import { COUNTRY_ID } from "../game/country";
import { LANDMARK_ID } from "../game/landmark";
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
    switch (province.country.id) {
      case COUNTRY_ID.GREEN:
        return game.resources.SPRITES.TILE_GREEN;
      case COUNTRY_ID.PURPLE:
        return game.resources.SPRITES.TILE_PURPLE;
      case COUNTRY_ID.RED:
        return game.resources.SPRITES.TILE_RED;
      case COUNTRY_ID.YELLOW:
        return game.resources.SPRITES.TILE_YELLOW;
      default:
        throw Error(`Country with id ${province.country.id} doesn't exist.`);
    }
  }


  public provinceToLandmarkSprite(province: Province) {
    switch (province.landmark.id) {
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
      case LANDMARK_ID.NONE:
        return null;
      default:
        throw Error(`Country with id ${province.country.id} doesn't exist.`);
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
}