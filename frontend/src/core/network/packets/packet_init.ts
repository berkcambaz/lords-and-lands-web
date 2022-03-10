import { game } from "../../..";
import { Packet } from "../packet";
import { PACKET_ID } from "../packet_types";

interface Data {
  uid: string;
}

// The backend server uses this packet to send id to the server
export class PacketInit extends Packet {
  private data?: Data;

  constructor(data?: Data) {
    super(PACKET_ID.INIT);
    this.data = data;
  }

  public sendBackend(): void {
    game.network.sendToBackend(this, PACKET_ID.INIT);
  }

  public handleBackend(): void {
    if (this.data?.uid) {
      game.network.uid = this.data.uid;
      game.ui.menuHandler();
    }
  }
}