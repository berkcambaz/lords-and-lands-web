import { Signal } from "../../../core/signal";
import { Province } from "../../province";

export enum ARMY_ID {
  NORMAL
}

interface ArmySignals {
  onHit: Signal<[from: Province, to: Province]>,
  onGetHit: Signal<[from: Province, to: Province]>,
  onMove: Signal<[from: Province, to: Province]>,
  onFree: Signal<[province: Province]>,
  onInvade: Signal<[province: Province]>,
  onOccupy: Signal<[province: Province]>,
  onRecruit: Signal<[province: Province]>,
  onDisband: Signal<[province: Province]>,
}

export class ArmyData {
  id: ARMY_ID;

  cost: number;

  offensive: number;
  defensive: number;
  breakthrough: number;

  signals: ArmySignals;

  constructor(id: ARMY_ID, cost: number, offensive: number, defensive: number, breakthrough: number) {
    this.id = id;

    this.cost = cost;

    this.offensive = offensive;
    this.defensive = defensive;
    this.breakthrough = breakthrough;

    this.signals = {
      onHit: new Signal(),
      onGetHit: new Signal(),
      onMove: new Signal(),
      onInvade: new Signal(),
      onOccupy: new Signal(),
      onFree: new Signal(),
      onRecruit: new Signal(),
      onDisband: new Signal(),
    }

    this.signals.onHit.add(this.onHit);
    this.signals.onGetHit.add(this.onHit);
    this.signals.onMove.add(this.onHit);
    this.signals.onFree.add(this.onFree);
    this.signals.onInvade.add(this.onInvade);
    this.signals.onOccupy.add(this.onOccupy);
    this.signals.onRecruit.add(this.onRecruit);
    this.signals.onDisband.add(this.onDisband);
  }

  protected onHit(from: Province, to: Province) {

  }

  protected onGetHit(from: Province, to: Province) {

  }

  protected onMove(from: Province, to: Province) {

  }

  protected onFree(province: Province) {

  }

  protected onInvade(province: Province) {

  }

  protected onOccupy(province: Province) {

  }

  protected onRecruit(province: Province) {

  }

  protected onDisband(province: Province) {

  }
}