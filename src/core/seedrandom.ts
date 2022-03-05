export class SeedRandom {
  private rng: () => number;

  constructor(seed: number) {
    function mulberry32(seed: number) {
      return function () {
        var t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      }
    }

    this.rng = mulberry32(seed);
  }

  public number(min: number, max: number) {
    return Math.floor(this.rng() * (max - min) + min);
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