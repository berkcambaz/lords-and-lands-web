import { Camera } from "../core/camera";
import { Input } from "../core/input";
import { Maths } from "../core/maths";
import { Random } from "../core/random";
import { Resources } from "../core/resources";
import { Signal } from "../core/signal";
import { Tilemap } from "../core/tilemap";
import { Country, COUNTRY_ID } from "./country";
import { Gameplay } from "./gameplay";

interface GameSignals {
  onResize: Signal<[w: number, h: number]>
}

export class Game {
  public maths!: Maths;
  public random!: Random;
  public resources!: Resources;
  public input!: Input;
  public camera!: Camera;
  public tilemap!: Tilemap;
  public gameplay!: Gameplay;

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
    this.maths = new Maths();
    this.random = new Random();
    this.resources = new Resources();
    this.input = new Input();
    this.camera = new Camera(0, 0, window.innerWidth, window.innerHeight);
    this.tilemap = new Tilemap();
    this.gameplay = new Gameplay();

    // Load resources
    this.resources.loadSprites();

    // Call resize event before starting the game
    this.signals.onResize.dispatch(window.innerWidth, window.innerHeight);

    // Async initializations
    Promise.resolve()
      .then(() => this.resources.loadSprites())
      .then(() => { this.gameplay.create(10, 10, 0, [COUNTRY_ID.GREEN, COUNTRY_ID.PURPLE, COUNTRY_ID.RED, COUNTRY_ID.YELLOW]) })
      .then(() => { this.loop() })
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