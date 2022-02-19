import { game } from "..";
import { COUNTRY_ID } from "../game/country";
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
}