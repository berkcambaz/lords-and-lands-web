enum ArmyId {
  NORMAL
}

export interface ArmyData {
  id: keyof typeof ArmyId;

  cost: number;

  offensive: number;
  defensive: number;
  breakthrough: number;
}

function newArmy(data: ArmyData) {
  return { data };
}

export const ARMY_DATA = {
  NORMAL: newArmy({
    id: "NORMAL",
    cost: 2,
    offensive: 0,
    defensive: 0,
    breakthrough: 0
  })
}