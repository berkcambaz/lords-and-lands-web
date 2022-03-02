import { Camera } from "../core/camera";
import { Input } from "../core/input";
import { Maths } from "../core/maths";
import { Random } from "../core/random";
import { Resources } from "../core/resources";
import { Signal } from "../core/signal";
import { Tilemap } from "../core/tilemap";
import { Util } from "../core/util";
import { COUNTRY_ID } from "./country";
import { Gameplay } from "./gameplay";
import { UI } from "./ui/ui";

interface GameSignals {
  onResize: Signal<[w: number, h: number]>
}

export class Game {
  public util!: Util;
  public maths!: Maths;
  public random!: Random;
  public resources!: Resources;
  public input!: Input;
  public camera!: Camera;
  public tilemap!: Tilemap;
  public gameplay!: Gameplay;
  public ui!: UI;

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
    this.util = new Util();
    this.maths = new Maths();
    this.random = new Random();
    this.resources = new Resources();
    this.input = new Input();
    this.camera = new Camera(0, 0, window.innerWidth, window.innerHeight);
    this.tilemap = new Tilemap();
    this.gameplay = new Gameplay();
    this.ui = new UI();

    // Call resize event before starting the game
    this.signals.onResize.dispatch(window.innerWidth, window.innerHeight);

    // Async initializations
    Promise.resolve()
      .then(() => this.resources.loadSprites())
      .then(() => { this.ui.init() })
      .then(() => { this.gameplay.create(10, 10, 0, [COUNTRY_ID.GREEN, COUNTRY_ID.PURPLE]) })
      .then(() => { this.gameplay.start() })
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