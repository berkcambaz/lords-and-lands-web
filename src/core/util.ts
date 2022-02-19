import { game } from "..";
import { COUNTRY_ID } from "../game/country";
import { LANDMARK_ID } from "../game/landmark";
import { Province } from "../game/province";

export class Util {
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
}