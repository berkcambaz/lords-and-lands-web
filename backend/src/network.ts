import websocket = require("ws");

import { generateId } from "./id";

export class Network {
  private clients: { [key: string]: websocket.WebSocket[] };
  private ws: websocket.Server<websocket.WebSocket>;

  constructor() {
    this.clients = {};

    this.ws = new websocket.Server({ host: "0.0.0.0", port: 8888 }, () => {
      console.log("Websocket has started...")
    });

    this.ws.on("connection", (socket, req) => {
      console.log("open");

      let id = "";
      for (let i = 0; i < 5; ++i) {
        id = generateId(5);
        if (!this.clients[id]) break;
      }

      if (this.clients[id]) { socket.close(); return; }

      socket.on("message", (data) => {
        const json = (JSON.parse(data.toString()) as any);

        switch (json.type) {
          case "all":
            break;
          case "except":
            break;
          case "to":
            break;
          case "server":
            break;
          default:
            if (json.id === 0) {
              this.clients[id] = [socket];
              socket.send(JSON.stringify({ packet: { id: 0, uid: id } }) + "\n")
            }
            break;
        }
      })

      socket.on("close", () => {
        console.log("close");
        this.disconnect(id);
      })

      socket.on("error", () => {
        console.log("error");
        this.disconnect(id);
      })
    })
  }

  private disconnect(id: string) {
    if (this.clients[id]) {
      for (let i = 0; i < this.clients[id].length; ++i) {
        this.clients[id][i].close(1000);
      }
    }

    delete this.clients[id];
  }
}