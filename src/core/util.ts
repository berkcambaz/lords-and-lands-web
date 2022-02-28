import { game } from "..";
import { COUNTRY_ID } from "../game/country";
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
    switch (keyof(province.landmark?.data)) {
      case "CAPITAL":
        return game.resources.SPRITES.LANDMARK_CAPITAL;
      case "CHURCH":
        return game.resources.SPRITES.LANDMARK_CHURCH;
      case "FOREST":
        return game.resources.SPRITES.LANDMARK_FOREST;
      case "HOUSE":
        return game.resources.SPRITES.LANDMARK_HOUSE;
      case "MOUNTAINS":
        return game.resources.SPRITES.LANDMARK_MOUNTAINS;
      case "TOWER":
        return game.resources.SPRITES.LANDMARK_TOWER;
      default:
        return null;
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