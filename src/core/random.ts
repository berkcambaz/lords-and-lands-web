export class Random {
  public number(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public dice() {
    return this.number(1, 6);
  }
}