import { game } from "..";
import { Country } from "./country";
import { LandmarkCapital } from "./data/landmarks/landmark_capital";
import { LandmarkChurch } from "./data/landmarks/landmark_church";
import { LandmarkForest } from "./data/landmarks/landmark_forest";
import { LandmarkHouse } from "./data/landmarks/landmark_house";
import { LandmarkMountains } from "./data/landmarks/landmark_mountains";
import { LandmarkTower } from "./data/landmarks/landmark_tower";
import { LandmarkData, LANDMARK_ID } from "./data/landmarks/_landmark_data";
import { Province, PROVINCE_STATE } from "./province";

export class Landmark {
  public data: LandmarkData;

  constructor(data: LandmarkData) {
    this.data = data;
  }

  public static create(id: LANDMARK_ID) {
    switch (id) {
      case LANDMARK_ID.CAPITAL:
        return new LandmarkCapital();
      case LANDMARK_ID.CHURCH:
        return new LandmarkChurch();
      case LANDMARK_ID.FOREST:
        return new LandmarkForest();
      case LANDMARK_ID.HOUSE:
        return new LandmarkHouse();
      case LANDMARK_ID.MOUNTAINS:
        return new LandmarkMountains();
      case LANDMARK_ID.TOWER:
        return new LandmarkTower();
      default:
        throw new Error(`Landmark with id ${id} doesn't exist.`);
    }
  }

  public static availableToBuild(country: Country, province: Province, landmark: LandmarkData) {
    // If not the owner
    if (country.id !== province.owner.id) return false;

    // If there is already a landmark
    if (province.landmark) return false;

    // If capital is not built and currently building a capital, allow it
    let capitalBuilt = game.util.hasLandmark(country, LANDMARK_ID.CAPITAL);
    if (!capitalBuilt) capitalBuilt = landmark.id === LANDMARK_ID.CAPITAL;


    // If it's unique and not build, allow it
    let alreadyBuilt = landmark.unique && game.util.hasLandmark(country, landmark.id);

    return capitalBuilt && !landmark.unbuildable && !alreadyBuilt;
  }

  public static canBuild(country: Country, province: Province, landmark: LandmarkData) {
    // If province is not free
    if (province.state !== PROVINCE_STATE.FREE) return false;

    // If has not enough gold
    if (country.gold < landmark.cost) return false;

    return true;
  }

  public static availableToDemolish(country: Country, province: Province, landmark: LandmarkData) {
    // If not the owner
    if (country.id !== province.owner.id) return false;

    // If there is no landmark
    if (!province.landmark) return false;

    return !landmark.undestroyable;
  }

  public static canDemolish(country: Country, province: Province, landmark: LandmarkData) {
    // If province is not free
    if (province.state !== PROVINCE_STATE.FREE) return false;

    return true;
  }

  public static build(country: Country, province: Province | undefined, landmark: LandmarkData) {
    if (!province) return;

    if (!Landmark.availableToBuild(country, province, landmark) ||
      !Landmark.canBuild(country, province, landmark))
      return;

    province.landmark = new Landmark(landmark);

    country.gold -= landmark.cost;
    this.addEffects(province);

    // Call onBuild 
    landmark.onBuild(province);

    // Update the UI
    game.ui.ingameHandler();

    // Update the tilemap
    game.tilemap.drawTile(province);
  }

  public static demolish(country: Country, province: Province | undefined, landmark: LandmarkData) {
    if (!province) return;

    if (!Landmark.availableToDemolish(country, province, landmark) ||
      !Landmark.canDemolish(country, province, landmark))
      return;

    this.removeEffects(province);

    province.landmark = undefined;

    // Call onDemolish
    landmark.onDemolish(province);

    // Update the UI
    game.ui.ingameHandler();

    // Update the tilemap
    game.tilemap.drawTile(province);
  }

  public static addEffects(province: Province) {
    if (!province.landmark) return;

    province.owner.income += province.landmark.data.income;
    province.owner.manpower += province.landmark.data.manpower;
  }

  public static removeEffects(province: Province) {
    if (!province.landmark) return;

    province.owner.income -= province.landmark.data.income;
    province.owner.manpower -= province.landmark.data.manpower;
  }
}