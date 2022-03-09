import { LandmarkData, LANDMARK_ID } from "./_landmark_data";

export class LandmarkTower extends LandmarkData {
  constructor() {
    super(LANDMARK_ID.TOWER, 3, 0, 0, false, false, false, false, 0, 2, 2);
  }
}