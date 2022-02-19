import { game } from "..";

export class Input {
  public mouse: { x: number, y: number, pressed: boolean, moved: boolean };

  constructor() {
    this.mouse = { x: 0, y: 0, pressed: false, moved: false };

    game.canvas.addEventListener("mousemove", (ev) => { this.onMouseMove(ev) })
    game.canvas.addEventListener("mousedown", (ev) => { this.onMouseDown(ev) })
    game.canvas.addEventListener("mouseup", (ev) => { this.onMouseUp(ev) })
    game.canvas.addEventListener("mouseleave", (ev) => { this.onMouseLeave(ev) })
    game.canvas.addEventListener("wheel", (ev) => { this.onWheel(ev) })
  }

  private onMouseMove(ev: MouseEvent) {
    if (this.mouse.pressed) {
      game.camera.x += (this.mouse.x - ev.x) / game.camera.zoom;
      game.camera.y += (this.mouse.y - ev.y) / game.camera.zoom;

      this.mouse.moved = true;
    }

    this.mouse.x = ev.x;
    this.mouse.y = ev.y;
  }

  private onMouseDown(ev: MouseEvent) {
    this.mouse.pressed = true;
  }

  private onMouseUp(ev: MouseEvent) {
    //if (!this.mouse.moved)
    //  panelSide.toggle(util.worldPosToProvince(this.mouse.x, this.mouse.y));

    this.mouse.pressed = false;
    this.mouse.moved = false;
  }

  private onMouseLeave(ev: MouseEvent) {
    this.mouse.pressed = false;
  }

  private onWheel(ev: WheelEvent) {
    game.camera.setZoom(ev.deltaY);
  }
}