enum LandmarkId {
  CAPITAL,
  CHURCH,
  HOUSE,
  MOUNTAINS,
  FOREST,
  TOWER
}

export interface LandmarkData {
  id: keyof typeof LandmarkId;

  cost: number;

  income: number;
  manpower: number;

  unique: boolean;
  recruitable: boolean;
  unbuildable: boolean;
  undestroyable: boolean;

  offensive: number;
  defensive: number;
  resistance: number;
}

function newLandmark(data: LandmarkData) {
  return { data };
}

export const LANDMARK_DATA = {
  CAPITAL: newLandmark({
    id: "CAPITAL",

    cost: 2,

    income: 0,
    manpower: 0,

    unique: false,
    recruitable: false,
    unbuildable: false,
    undestroyable: false,

    offensive: 0,
    defensive: 0,
    resistance: 2
  }),
  CHURCH: newLandmark({
    id: "CHURCH",

    cost: 4,

    income: 1,
    manpower: 0,

    unique: false,
    recruitable: false,
    unbuildable: false,
    undestroyable: false,

    offensive: 0,
    defensive: 0,
    resistance: -1
  }),
  FOREST: newLandmark({
    id: "FOREST",

    cost: 0,

    income: 0,
    manpower: 0,

    unique: false,
    recruitable: false,
    unbuildable: true,
    undestroyable: true,

    offensive: 1,
    defensive: 0,
    resistance: 0
  }),
  HOUSE: newLandmark({
    id: "HOUSE",

    cost: 2,

    income: 0,
    manpower: 1,

    unique: false,
    recruitable: true,
    unbuildable: false,
    undestroyable: false,

    offensive: 0,
    defensive: 0,
    resistance: 1
  }),
  MOUNTAINS: newLandmark({
    id: "MOUNTAINS",

    cost: 0,

    income: 0,
    manpower: 0,

    unique: false,
    recruitable: false,
    unbuildable: false,
    undestroyable: true,

    offensive: 0,
    defensive: 1,
    resistance: 1
  }),
  TOWER: newLandmark({
    id: "TOWER",

    cost: 3,

    income: 0,
    manpower: 0,

    unique: false,
    recruitable: false,
    unbuildable: false,
    undestroyable: false,

    offensive: 0,
    defensive: 2,
    resistance: 2
  }),
}