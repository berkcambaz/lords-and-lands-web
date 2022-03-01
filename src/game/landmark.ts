import { LandmarkCapital } from "./data/landmarks/landmark_capital";
import { LandmarkChurch } from "./data/landmarks/landmark_church";
import { LandmarkForest } from "./data/landmarks/landmark_forest";
import { LandmarkHouse } from "./data/landmarks/landmark_house";
import { LandmarkMountains } from "./data/landmarks/landmark_mountains";
import { LandmarkTower } from "./data/landmarks/landmark_tower";
import { LandmarkData, LANDMARK_ID } from "./data/landmarks/_landmark_data";

export class Landmark {
  public data: LandmarkData;

  constructor(data: LandmarkData) {
    this.data = data;
  }

  public static create(id: LANDMARK_ID) {
    switch (id) {
      case LANDMARK_ID.CAPITAL:
        return new LandmarkCapital();
      case LANDMARK_ID.CHURCH:
        return new LandmarkChurch();
      case LANDMARK_ID.FOREST:
        return new LandmarkForest();
      case LANDMARK_ID.HOUSE:
        return new LandmarkHouse();
      case LANDMARK_ID.MOUNTAINS:
        return new LandmarkMountains();
      case LANDMARK_ID.TOWER:
        return new LandmarkTower();
      default:
        throw new Error(`Landmark with id ${id} doesn't exist.`);
    }
  }
}