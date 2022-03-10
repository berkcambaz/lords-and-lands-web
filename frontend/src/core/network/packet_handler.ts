import { game } from "../..";
import { NETWORK_TYPE } from "./network";
import { PacketConnect } from "./packets/packet_connect";
import { PacketInit } from "./packets/packet_init";
import { PacketMapGeneration } from "./packets/packet_map_generate";
import { PACKET_ID } from "./packet_types";

export class PacketHandler {
  public static handle(packet: any) {
    console.log(packet);

    switch (packet.id) {
      case PACKET_ID.INIT:
        packet = new PacketInit(packet);
        if (game.network.type === NETWORK_TYPE.SERVER) packet.handleBackend();
        break;
      case PACKET_ID.CONNECT:
        packet = new PacketConnect(packet);
        if (game.network.type === NETWORK_TYPE.SERVER) packet.handleBackend();
        break;
      case PACKET_ID.DISCONNECT:
        packet = new PacketConnect(packet);
        if (game.network.type === NETWORK_TYPE.CLIENT) packet.handleBackend();
        break;
      case PACKET_ID.MAP_GENERATION:
        packet = new PacketMapGeneration(packet.data);
        if (game.network.type === NETWORK_TYPE.CLIENT) packet.handleClient();
        break;
      default:
        break;
    }
  }
}