export enum COUNTRY_ID {
  GREEN,
  PURPLE,
  RED,
  YELLOW
}

export class Country {
  public id: COUNTRY_ID;
  public gold: number;
  public income: number;
  public army: number;
  public manpower: number;

  constructor(id: COUNTRY_ID, gold: number, income: number, army: number, manpower: number) {
    this.id = id;
    this.gold = gold;
    this.income = income;
    this.army = army;
    this.manpower = manpower;
  }
}