export class Vec2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static equals(a: Vec2, b: Vec2) {
    return a.x === b.x && a.y === b.y;
  }
}