import websocket = require("ws");

import { generateId } from "./id";

export class Network {
  private clients: { [key: string]: websocket.WebSocket };
  private ws: websocket.Server<websocket.WebSocket>;

  constructor() {
    this.clients = {};

    this.ws = new websocket.Server({ host: "localhost", port: 8888 }, () => {
      console.log("Websocket has started...")
    });

    this.ws.on("connection", (socket, req) => {
      console.log("open");
      const id = generateId(5);
      this.clients[id] = socket;

      socket.on("message", () => {
        console.log("message");
      })

      socket.on("close", () => {
        console.log("close");
        delete this.clients[id];
      })

      socket.on("error", () => {
        console.log("error");
        delete this.clients[id];
      })
    })
  }
}