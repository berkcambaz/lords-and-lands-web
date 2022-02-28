import { LandmarkData, LANDMARK_DATA } from "./data/landmark_data";

export class Landmark {
  public data: LandmarkData;

  constructor(data: LandmarkData) {
    this.data = data;
  }

  public static getLandmarkData(landmark: keyof typeof LANDMARK_DATA) {
    return LANDMARK_DATA[landmark];
  }
}