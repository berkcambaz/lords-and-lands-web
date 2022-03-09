import websocket = require("ws");

export class Network {
  private ws: websocket.Server<websocket.WebSocket>;

  constructor() {
    this.ws = new websocket.Server({ host: "localhost", port: 8888 }, () => {
      console.log("Websocket has started...")
    });
  }
}