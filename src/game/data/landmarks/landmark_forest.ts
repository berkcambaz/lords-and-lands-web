import { LandmarkData, LANDMARK_ID } from "./_landmark_data";

export class LandmarkForest extends LandmarkData {
  constructor() {
    super(LANDMARK_ID.FOREST, 0, 0, 0, false, false, true, true, 1, 0, 0);
  }
}