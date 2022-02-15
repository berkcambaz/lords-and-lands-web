import { webgl } from "./webgl";
import fragmentShader from "../shaders/fragment.glsl";

class Renderer {
  public canvas!: HTMLCanvasElement;

  public init() {
    this.canvas = document.createElement("canvas");
    webgl.init(this.canvas);

    // Initialize basic shaders

  }
}

export const renderer = new Renderer();