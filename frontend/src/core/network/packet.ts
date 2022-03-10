import { PACKET_ID } from "./packet_types";

export class Packet {
  public id: PACKET_ID;

  constructor(id: PACKET_ID) {
    this.id = id;
  }

  public sendToServer() { }
  public handleServer() { }

  public sendToClient() { }
  public handleClient() { }

  public sendToBackend() { }
  public handleBackend() { }
}