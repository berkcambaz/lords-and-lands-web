import { PACKET_ID } from "./packet_handler";

export class Packet {
  public id: PACKET_ID;

  constructor(id: PACKET_ID) {
    this.id = id;
  }

  public sendServer() { }
  public handleServer() { }

  public sendClient() { }
  public handleClient() { }
}