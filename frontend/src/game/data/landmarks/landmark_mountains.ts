import { LandmarkData, LANDMARK_ID } from "./_landmark_data";

export class LandmarkMountains extends LandmarkData {
  constructor() {
    super(LANDMARK_ID.MOUNTAINS, 0, 0, 0, false, false, true, true, 0, 1, 1);
  }
}