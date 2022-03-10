import { game } from "../../..";
import { NETWORK_TYPE } from "../network";
import { Packet } from "../packet";
import { PACKET_ID } from "../packet_types";

interface Data {
  uid: string;
}

export class PacketConnect extends Packet {
  private data: Data;

  constructor(data: Data) {
    super(PACKET_ID.CONNECT);
    this.data = data;
  }

  public sendBackend(): void {
    game.network.sendToBackend(this);
  }

  public handleBackend(): void {
    game.network.type = NETWORK_TYPE.CLIENT;
  }
}