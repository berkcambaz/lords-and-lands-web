import { Province } from "../../province";
import { LandmarkData, LANDMARK_ID } from "./_landmark_data";

export class LandmarkCapital extends LandmarkData {
  constructor() {
    super(LANDMARK_ID.CAPITAL, 0, 1, 3, true, true, false, true, 0, 0, 2);
  }

  public onBuild(province: Province) {
    province.owner.gold += 10;
  }
}