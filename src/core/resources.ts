import ARMY_GREEN_SMALL from "../../res/sprites/army/army_green_small.png";
import ARMY_RED_SMALL from "../../res/sprites/army/army_red_small.png";
import ARMY_YELLOW_SMALL from "../../res/sprites/army/army_yellow_small.png";
import ARMY_PURPLE_SMALL from "../../res/sprites/army/army_purple_small.png";

import TILE_GREEN from "../../res/sprites/tiles/tile_green.png";
import TILE_RED from "../../res/sprites/tiles/tile_red.png";
import TILE_YELLOW from "../../res/sprites/tiles/tile_yellow.png";
import TILE_PURPLE from "../../res/sprites/tiles/tile_purple.png";

const sprites = {
  ARMY_GREEN_SMALL,
  ARMY_RED_SMALL,
  ARMY_YELLOW_SMALL,
  ARMY_PURPLE_SMALL,

  TILE_GREEN,
  TILE_RED,
  TILE_YELLOW,
  TILE_PURPLE,
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