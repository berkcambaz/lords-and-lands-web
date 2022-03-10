import { game } from "../..";
import { NETWORK_TYPE } from "./network";
import { PacketInit } from "./packets/packet_init";

export enum PACKET_ID {
  INIT
}

export class PacketHandler {
  public static handle(packet: any) {
    console.log(packet);

    switch (packet.id) {
      case PACKET_ID.INIT:
        packet = new PacketInit(packet);
        if (game.network.type === NETWORK_TYPE.SERVER) packet.handleServer();
        else if (game.network.type === NETWORK_TYPE.CLIENT) packet.handleClient();
        break;
      default:
        break;
    }
  }
}