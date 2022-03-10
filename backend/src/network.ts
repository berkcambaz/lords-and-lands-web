import websocket = require("ws");

import { generateId } from "./id";
import { PACKET_ID } from "../../frontend/src/core/network/packet_types";

interface Client {
  socket: websocket.WebSocket;
  id: string;
}

export class Network {
  private rooms: { [key: string]: Client[] }
  private clients: { [key: string]: Client };
  private ws: websocket.Server<websocket.WebSocket>;

  constructor() {
    this.rooms = {};
    this.clients = {};

    this.ws = new websocket.Server({ host: "0.0.0.0", port: 8888 }, () => {
      console.log("Websocket has started...")
    });

    this.ws.on("connection", (socket, req) => {
      console.log("open");

      const client: Client = {} as Client;

      client.socket = socket;
      for (let i = 0; i < 5; ++i) {
        client.id = generateId(5);
        if (!this.clients[client.id]) break;
      }

      if (this.clients[client.id]) { socket.close(); return; }
      this.clients[client.id] = client;

      socket.on("message", (data) => {
        const json = (JSON.parse(data.toString()) as any);

        switch (json.type) {
          case "all":
            if (this.rooms[client.id]) {
              for (let i = 0; i < this.rooms[client.id].length; ++i) {
                if (this.rooms[client.id][i].id !== client.id)
                  this.rooms[client.id][i].socket.send(JSON.stringify({ packet: json.packet }) + "\n");
              }
            }
            break;
          case "except":
            if (this.rooms[client.id]) {
              for (let i = 0; i < this.rooms[client.id].length; ++i) {
                if (this.rooms[client.id][i].id !== client.id && this.rooms[client.id][i].id !== json.id)
                  this.rooms[client.id][i].socket.send(JSON.stringify({ packet: json.packet }) + "\n");
              }
            }
            break;
          case "to":
            if (this.rooms[client.id]) {
              for (let i = 0; i < this.rooms[client.id].length; ++i) {
                if (this.rooms[client.id][i].id !== client.id && this.rooms[client.id][i].id === json.id) {
                  this.rooms[client.id][i].socket.send(JSON.stringify({ packet: json.packet }) + "\n");
                  break;
                }
              }
            }
            break;
          case "server":
            if (this.rooms[client.id]) {
              this.rooms[client.id][0].socket.send(JSON.stringify({ packet: json.packet }) + "\n");
            }
            break;
          case "backend":
            switch (json.packet.id) {
              case PACKET_ID.INIT:
                this.rooms[client.id] = [client];
                socket.send(JSON.stringify({ packet: { id: PACKET_ID.INIT, uid: client.id } }) + "\n")
                break;
              case PACKET_ID.CONNECT:
                if (this.connectTo(json.packet.data.uid, client.id))
                  socket.send(JSON.stringify({ packet: { id: PACKET_ID.CONNECT, uid: json.packet.data.uid } }) + "\n")
                break;
              case PACKET_ID.DISCONNECT:
                if (this.disconnectFrom(json.packet.data.uid, client.id))
                  socket.send(JSON.stringify({ packet: { id: PACKET_ID.DISCONNECT, uid: "" } }) + "\n")
                break;
            }
            break;
        }
      })

      socket.on("close", () => {
        console.log("close");
        this.disconnect(client.id);
      })

      socket.on("error", () => {
        console.log("error");
        this.disconnect(client.id);
      })
    })
  }

  private connectTo(roomId: string, clientId: string) {
    if (this.rooms[roomId]) {
      this.rooms[roomId].push(this.clients[clientId]);

      return true;
    }

    return false;
  }

  private disconnectFrom(roomId: string, clientId: string) {
    if (this.rooms[roomId]) {
      for (let i = 0; i < this.rooms[roomId].length; ++i) {
        if (this.rooms[roomId][i].id === clientId) {
          this.rooms[roomId].splice(i, 1);
          return true;
        }
      }
    }

    return false;
  }

  private disconnect(id: string) {
    if (this.rooms[id]) {
      for (let i = 0; i < this.rooms[id].length; ++i) {
        this.rooms[id][i].socket.close(1000);
      }
    }

    delete this.rooms[id];
  }
}