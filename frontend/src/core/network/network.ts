export class Network {
  public ws!: WebSocket;

  public start() {
    this.ws = new WebSocket("ws://" + window.location.hostname + ":8888");

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

  public stop() {
    this.ws.close(1000);
  }

  public isOnline() {
    return this.ws.readyState !== this.ws.CLOSED;
  }

  public isStarted() {
    return this.ws && this.ws.readyState === this.ws.OPEN;
  }
}