import { Game } from "./game/game";

import "./index.scss";

export const game = new Game();

//const cache = {};
//
///// @ts-ignore
//function importAll(r) {
//  /// @ts-ignore
//  r.keys().forEach((key) => (cache[key] = r(key)));
//}
//
///// @ts-ignore
//importAll(require.context('/res', true, /\.png$/));
//
//console.log(cache);

window.onload = () => {
  if (process.env.NODE_ENV === "production") {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }

  game.run();
}

