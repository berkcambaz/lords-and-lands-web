export enum LANDMARK_ID {
  NONE = -1,
  CAPITAL,
  CHURCH,
  FOREST,
  HOUSE,
  MOUNTAINS,
  TOWER
}


export class Landmark {
  public id: LANDMARK_ID;

  constructor(id: LANDMARK_ID) {
    this.id = id;
  }
}