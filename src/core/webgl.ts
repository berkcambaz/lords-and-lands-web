class WebGL {
  public gl!: WebGLRenderingContext;

  public init(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl");
    if (!gl) {
      // TODO: Handle
      throw Error("Your browser doesn't support webgl!");
    }
    else {
      this.gl = gl;
    }
  }

  public createShader(type: number, source: string) {
    const shader = this.gl.createShader(type);
    if (!shader) {
      throw Error("Error on creating shader!");
    }

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (!success) {
      this.gl.deleteShader(shader);
      throw Error(this.gl.getShaderInfoLog(shader) as string);
    }

    return shader;
  }

  public createProgram(vertexShader: string, fragmentShader: string) {
    const program = this.gl.createProgram();
    if (!program) {
      throw Error("Error on creating program!");
    }

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (!success) {
      this.gl.deleteProgram(program);
      throw Error(this.gl.getProgramInfoLog(program) as string);
    }

    return program;
  }
}

export const webgl = new WebGL();