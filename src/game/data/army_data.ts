export interface ArmyData {
  id: string;
  cost: number;

  offensive: number;
  defensive: number;
  breakthrough: number;
}

function newArmy(data: ArmyData) {
  return { ...data };
}

export const ARMY_DATA = {
  NORMAL: newArmy({
    id: "normal",
    cost: 2,
    offensive: 0,
    defensive: 0,
    breakthrough: 0
  })
}