import { game } from "../../..";
import { Packet } from "../packet";
import { PACKET_ID } from "../packet_types";

// The backend server uses this packet to send id to the server
export class PacketInit extends Packet {
  public uid!: string;

  constructor(packet?: {}) {
    super(PACKET_ID.INIT);
    Object.assign(this, packet);
  }

  public sendBackend(): void {
    game.network.sendToBackend(this, PACKET_ID.INIT);
  }

  public handleBackend(): void {
    game.network.uid = this.uid;
    game.ui.menuHandler();
  }
}