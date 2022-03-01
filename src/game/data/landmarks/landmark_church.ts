import { Province } from "../../province";
import { LandmarkData, LANDMARK_ID } from "./_landmark_data";

export class LandmarkChurch extends LandmarkData {
  constructor() {
    super(LANDMARK_ID.CHURCH, 4, 1, 0, false, false, false, false, 0, 0, -1);
  }
}