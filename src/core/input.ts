import { game } from "..";

export class Input {
  public readonly MOVED_TRESHOLD = 32;
  public mouse: { x: number, y: number, pressed: boolean, moved: number };

  constructor() {
    this.mouse = { x: 0, y: 0, pressed: false, moved: 0 };

    game.canvas.addEventListener("mousemove", (ev) => { this.onMouseMove(ev) })
    game.canvas.addEventListener("mousedown", (ev) => { this.onMouseDown(ev) })
    game.canvas.addEventListener("mouseup", (ev) => { this.onMouseUp(ev) })
    game.canvas.addEventListener("mouseleave", (ev) => { this.onMouseLeave(ev) })

    //game.canvas.addEventListener("wheel", (ev) => { this.onWheel(ev) })

    game.canvas.addEventListener("touchmove", (ev) => { this.onTouchMove(ev) })
    game.canvas.addEventListener("touchstart", (ev) => { this.onTouchStart(ev) })
    game.canvas.addEventListener("touchend", (ev) => { this.onTouchEnd(ev) })
    game.canvas.addEventListener("touchcancel", (ev) => { this.onTouchCancel(ev) })
  }

  private onMouseMove(ev: MouseEvent) {
    if (this.mouse.pressed) {
      const moveX = (this.mouse.x - ev.x) / game.camera.zoom;
      const moveY = (this.mouse.y - ev.y) / game.camera.zoom;
      game.camera.x += moveX;
      game.camera.y += moveY;

      this.mouse.moved += Math.abs(moveX) + Math.abs(moveY);
    }

    this.mouse.x = ev.x;
    this.mouse.y = ev.y;

    game.tilemap.highlightProvince(game.util.worldPosToProvince(this.mouse.x, this.mouse.y));
  }

  private onMouseDown(ev: MouseEvent) {
    this.mouse.pressed = true;
  }

  private onMouseUp(ev: MouseEvent) {
    if (this.mouse.moved < this.MOVED_TRESHOLD) {
      game.tilemap.selectProvince(game.util.worldPosToProvince(this.mouse.x, this.mouse.y));
    }

    this.mouse.pressed = false;
    this.mouse.moved = 0;
  }

  private onMouseLeave(ev: MouseEvent) {
    this.mouse.pressed = false;

    game.tilemap.highlightProvince(undefined);
  }

  private onWheel(ev: WheelEvent) {
    game.camera.setZoom(ev.deltaY);
  }

  private onTouchMove(ev: TouchEvent) {
    ev.preventDefault();

    const x = ev.touches[0].clientX;
    const y = ev.touches[0].clientY;

    if (this.mouse.pressed) {
      const moveX = (this.mouse.x - x) / game.camera.zoom;
      const moveY = (this.mouse.y - y) / game.camera.zoom;
      game.camera.x += moveX;
      game.camera.y += moveY;

      this.mouse.moved += Math.abs(moveX) + Math.abs(moveY);
    }

    this.mouse.x = x;
    this.mouse.y = y;
  }

  private onTouchStart(ev: TouchEvent) {
    ev.preventDefault();

    const rect = game.canvas.getBoundingClientRect();
    this.mouse.x = ev.touches[0].clientX - rect.left;
    this.mouse.y = ev.touches[0].clientY - rect.top;

    this.mouse.pressed = true;
  }

  private onTouchEnd(ev: TouchEvent) {
    ev.preventDefault();

    if (this.mouse.moved < this.MOVED_TRESHOLD) {
      game.tilemap.selectProvince(game.util.worldPosToProvince(this.mouse.x, this.mouse.y))
    }

    this.mouse.pressed = false;
    this.mouse.moved = 0;
  }

  private onTouchCancel(ev: TouchEvent) {
    ev.preventDefault();

    this.mouse.pressed = false;

    game.tilemap.highlightProvince(undefined);
  }
}