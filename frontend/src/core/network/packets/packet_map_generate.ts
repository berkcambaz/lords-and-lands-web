import { game } from "../../..";
import { Packet } from "../packet";
import { PACKET_ID } from "../packet_types";

interface Data {
  countries: boolean[];
  seed: number;
  width: number;
  height: number;
}

// The backend server uses this packet to send id to the server
export class PacketMapGeneration extends Packet {
  private data: Data;

  constructor(data: Data) {
    super(PACKET_ID.MAP_GENERATION);
    this.data = data;
  }

  public sendToClient(): void {
    game.network.sendAll(this);
  }

  public handleClient(): void {
    console.log(this.data);

    game.gameplay.create(this.data.width, this.data.height, this.data.seed, this.data.countries);
  }
}