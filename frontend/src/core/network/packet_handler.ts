import { game } from "../..";
import { NETWORK_TYPE } from "./network";
import { PacketInit } from "./packets/packet_init";
import { PACKET_ID } from "./packet_types";



export class PacketHandler {
  public static handle(packet: any) {
    console.log(packet);

    switch (packet.id) {
      case PACKET_ID.INIT:
        const p = new PacketInit(packet);
        if (game.network.type === NETWORK_TYPE.SERVER) p.handleBackend();
        break;
      default:
        break;
    }
  }
}