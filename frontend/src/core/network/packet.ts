import { PACKET_ID } from "./packet_types";

export class Packet {
  public id: PACKET_ID;

  constructor(id: PACKET_ID) {
    this.id = id;
  }

  public sendServer() { }
  public handleServer() { }

  public sendClient() { }
  public handleClient() { }

  public sendBackend() { }
  public handleBackend() { }
}