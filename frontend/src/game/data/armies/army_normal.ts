import { ArmyData, ARMY_ID } from "./_army_data";

export class ArmyNormal extends ArmyData {
  constructor() {
    super(ARMY_ID.NORMAL, 2, 0, 0, 0);
  }
}