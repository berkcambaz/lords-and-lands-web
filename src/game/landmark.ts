import { LandmarkData } from "./data/landmarks/_landmark_data";

export class Landmark {
  public data: LandmarkData;

  constructor(data: LandmarkData) {
    this.data = data;
  }
}