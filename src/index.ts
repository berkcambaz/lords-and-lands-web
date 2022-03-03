import { Game } from "./game/game";

import "./index.scss";

export const game = new Game();

window.onload = () => {
  if (process.env.NODE_ENV !== "development") {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }

  game.run();
}

