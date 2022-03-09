export class Network {
  public ws: WebSocket;

  constructor() {
    this.ws = new WebSocket("ws://" + window.location.host);

    this.ws.onopen = (ev) => {
      console.log("open");
    }

    this.ws.onmessage = (ev) => {
      console.log("message");
    }

    this.ws.onclose = (ev) => {
      console.log("close");
    }

    this.ws.onerror = (ev) => {
      console.log("error");
    }
  }

  public isOnline() {
    return this.ws.readyState !== this.ws.CLOSED;
  }
}