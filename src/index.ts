import { Game } from "./game/game";

import "./index.scss";

export const game = new Game();

window.onload = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }

  game.run();
}

