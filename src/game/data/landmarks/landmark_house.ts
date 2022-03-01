import { LandmarkData, LANDMARK_ID } from "./_landmark_data";

export class LandmarkHouse extends LandmarkData {
  constructor() {
    super(LANDMARK_ID.HOUSE, 2, 0, 1, false, true, false, false, 0, 0, 1);
  }
}