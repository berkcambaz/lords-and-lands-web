import { webgl } from "./webgl";

import vertexShaderSource from "../shaders/vertex.glsl";
import fragmentShaderSource from "../shaders/fragment.glsl";

console.log(vertexShaderSource);


class Renderer {
  public canvas!: HTMLCanvasElement;

  public init() {
    this.canvas = document.createElement("canvas");
    webgl.init(this.canvas);

    const gl = webgl.gl;

    // Initialize shaders
    const vertexShader = webgl.createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = webgl.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Initialize program
    const program = webgl.createProgram(vertexShader, fragmentShader);

    // Get "position" attribute location
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
      0, 0,
      0, 0.5,
      0.7, 0
    ]

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  }
}

export const renderer = new Renderer();