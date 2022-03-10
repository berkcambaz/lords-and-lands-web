export class JSONHandler {
  private readonly chunkSize = 4096;
  private readonly delimiter = "\n";
  private buffer = "";

  public push(data: string) {
    this.buffer += data;
  }

  public get(): any | undefined {
    const delimiterIndex = this.buffer.indexOf(this.delimiter);
    if (delimiterIndex !== -1) {
      const data = this.buffer.substring(0, delimiterIndex);
      this.buffer = this.buffer.substring(delimiterIndex + this.delimiter.length);
      return JSON.parse(data);
    }

    return undefined;
  }
}