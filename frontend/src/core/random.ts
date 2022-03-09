export class Random {
  public number(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  public dice() {
    return this.number(1, 6 + 1);
  }

  public percent(cases: { percent: number, result: any }[]) {
    const percentage = this.number(0, 99);
    let previousPercent = 0;
    for (let i = 0; i < cases.length; ++i) {
      if (previousPercent - 1 < percentage && percentage < previousPercent + cases[i].percent) {
        return cases[i].result;
      }

      previousPercent += cases[i].percent;
    }
  }
}