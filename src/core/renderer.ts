import { webgl } from "./webgl";

import vertexShaderSource from "../shaders/vertex.glsl";
import fragmentShaderSource from "../shaders/fragment.glsl";

class Renderer {
  public canvas!: HTMLCanvasElement;

  public init() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
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

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    gl.viewport(0, 0, window.innerWidth, window.innerHeight)

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset)

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
  }
}

export const renderer = new Renderer();