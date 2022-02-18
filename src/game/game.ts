import { Camera } from "../core/camera";
import { Signal } from "../core/signal";
import { Tilemap } from "../core/tilemap";

interface GameSignals {
  onResize: Signal<[w: number, h: number]>
}

export class Game {
  public camera!: Camera;
  public tilemap!: Tilemap;

  public signals: GameSignals;

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  constructor() {
    this.signals = {
      onResize: new Signal()
    };

    // Initialize canvas and ctx
    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw Error("HTML Canvas is not supported in the browser.")
    this.ctx = ctx;
    document.body.appendChild(this.canvas);

    this.addEventListeners();
  }

  public run() {
    // Initialize game core
    this.camera = new Camera(0, 0, window.innerWidth, window.innerHeight);
    this.tilemap = new Tilemap();

    this.signals.onResize.dispatch(window.innerWidth, window.innerHeight);

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
    this.ctx.clearRect(0, 0, this.camera.w, this.camera.h);

    this.tilemap.render();
  }

  private addEventListeners() {
    window.addEventListener("resize", () => {
      this.signals.onResize.dispatch(window.innerWidth, window.innerHeight)
    })
  }
}