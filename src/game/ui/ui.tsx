import { Soda } from "@dorkodu/soda";

import { App } from "./components/App";

export class UI {
  public init() {
    Soda.render(<App />, document.body);
  }
}