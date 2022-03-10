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

  public sendTo(packet: Packet, uid: string) {
    if (!this.ws || !this.isOnline()) return;
    const data = { packet, uid, type: "to" };
    this.ws.send(JSON.stringify(data) + "\n");
  }

  public sendExcept(packet: Packet, uid: string) {
    if (!this.ws || !this.isOnline()) return;
    const data = { packet, uid, type: "except" };
    this.ws.send(JSON.stringify(data) + "\n");
  }

  public sendAll(packet: Packet) {
    if (!this.ws || !this.isOnline()) return;
    const data = { packet, type: "all" };
    this.ws.send(JSON.stringify(data) + "\n");
  }

  public sendToServer(packet: Packet) {
    if (!this.ws || !this.isOnline()) return;
    const data = { packet, type: "server" };
    this.ws.send(JSON.stringify(data) + "\n");
  }

  public sendToBackend(packet: Packet) {
    if (!this.ws || !this.isOnline()) return;
    const data = { packet, type: "backend" }
    this.ws.send(JSON.stringify(data) + "\n");
  }

  public isOnline() {
    return this.ws.readyState !== this.ws.CLOSED;
  }

  public isStarted() {
    return this.ws && this.ws.readyState === this.ws.OPEN;
  }
}