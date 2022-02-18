import { Camera } from "../core/camera";
import { Signal } from "../core/signal";

interface GameSignals {
  onResize: Signal<[w: number, h: number]>
}

export class Game {
  public camera: Camera;

  public signals: GameSignals;

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  constructor() {
    this.camera = new Camera(0, 0, window.innerWidth, window.innerHeight);

    this.signals = {
      onResize: new Signal()
    };

    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw Error("HTML Canvas is not supported in the browser.")
    this.ctx = ctx;
  }

  public run() {
    // Start the game loop
    this.loop();
  }

  private loop() {
    this.render();

    window.requestAnimationFrame(() => { this.loop() });
  }

  private update() {
    // TODO: Implement
  }

  private render() {

  }
}