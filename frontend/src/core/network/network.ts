import { JSONHandler } from "./json_handler";
import { Packet } from "./packet";
import { PacketInit } from "./packets/packet_init";
import { PacketHandler } from "./packet_handler";

export enum NETWORK_TYPE {
  NONE,
  CLIENT,
  SERVER
}

export class Network {
  public ws!: WebSocket;
  public jsonHandler!: JSONHandler;
  public type!: NETWORK_TYPE;
  public uid!: string;

  public start() {
    this.ws = new WebSocket("ws://" + window.location.hostname + ":8888");
    this.jsonHandler = new JSONHandler();
    this.type = NETWORK_TYPE.SERVER;
    this.uid = "";

    this.ws.onopen = (ev) => {
      console.log("open");
      new PacketInit().sendBackend();
    }

    this.ws.onmessage = (ev) => {
      this.jsonHandler.push(ev.data);
      const data = this.jsonHandler.get();
      if (data) PacketHandler.handle(data.packet);
      console.log("message");
    }

    this.ws.onclose = (ev) => {
      console.log("close");
    }

    this.ws.onerror = (ev) => {
      console.log("error");
    }
  }

  public stop() {
    this.ws.close(1000);
  }

  public sendTo(packet: Packet, id: number) {
    const data = { packet, id, type: "to" };
    this.ws.send(JSON.stringify(data));
  }

  public sendExcept(packet: Packet, id: number) {
    const data = { packet, id, type: "except" };
    this.ws.send(JSON.stringify(data));
  }

  public sendAll(packet: Packet) {
    const data = { packet, type: "all" };
    this.ws.send(JSON.stringify(data));
  }

  public sendToServer(packet: Packet) {
    const data = { packet, type: "server" };
    this.ws.send(JSON.stringify(data));
  }

  public sendToBackend(packet: Packet) {
    const data = { packet, id: 0 }
    this.ws.send(JSON.stringify(data));
  }

  public isOnline() {
    return this.ws.readyState !== this.ws.CLOSED;
  }

  public isStarted() {
    return this.ws && this.ws.readyState === this.ws.OPEN;
  }
}