import ARMY_GREEN_SMALL from "../../res/sprites/army/green_small.png";
import ARMY_RED_SMALL from "../../res/sprites/army/red_small.png";
import ARMY_YELLOW_SMALL from "../../res/sprites/army/yellow_small.png";
import ARMY_PURPLE_SMALL from "../../res/sprites/army/purple_small.png";

import TILE_GREEN from "../../res/sprites/tiles/green.png";
import TILE_RED from "../../res/sprites/tiles/red.png";
import TILE_YELLOW from "../../res/sprites/tiles/yellow.png";
import TILE_PURPLE from "../../res/sprites/tiles/purple.png";

import LANDMARK_CAPITAL from "../../res/sprites/landmarks/capital.png";
import LANDMARK_CHURCH from "../../res/sprites/landmarks/church.png";
import LANDMARK_FOREST from "../../res/sprites/landmarks/forest.png";
import LANDMARK_HOUSE from "../../res/sprites/landmarks/house.png";
import LANDMARK_MOUNTAINS from "../../res/sprites/landmarks/mountains.png";
import LANDMARK_TOWER from "../../res/sprites/landmarks/tower.png";

import TILEMAP_SELECT_GRAY from "../../res/sprites/tilemap/select_gray.png";
import TILEMAP_SELECT_WHITE from "../../res/sprites/tilemap/select_white.png";
import TILEMAP_SELECTED from "../../res/sprites/tilemap/selected.png";

const sprites = {
  ARMY_GREEN_SMALL,
  ARMY_RED_SMALL,
  ARMY_YELLOW_SMALL,
  ARMY_PURPLE_SMALL,

  TILE_GREEN,
  TILE_RED,
  TILE_YELLOW,
  TILE_PURPLE,

  LANDMARK_CAPITAL,
  LANDMARK_CHURCH,
  LANDMARK_FOREST,
  LANDMARK_HOUSE,
  LANDMARK_MOUNTAINS,
  LANDMARK_TOWER,

  TILEMAP_SELECT_GRAY,
  TILEMAP_SELECT_WHITE,
  TILEMAP_SELECTED,
}

type SPRITES = { [key in keyof typeof sprites]: HTMLImageElement };

export class Resources {
  public readonly SPRITES: SPRITES = {} as SPRITES;

  public loadSprites() {
    return new Promise((resolve, reject) => {
      const toLoad = Object.keys(sprites).length;
      let loaded = 0;

      for (const key in sprites) {
        const img = new Image();
        img.onload = () => { if (++loaded === toLoad) resolve(0); }
        img.src = sprites[key as keyof typeof sprites];
        this.SPRITES[key as keyof typeof sprites] = img;
      }
    })
  }
}