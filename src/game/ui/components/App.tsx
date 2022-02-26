import { Soda } from "@dorkodu/soda";

import { MenuMain } from "./MenuMain";
import { MenuNew } from "./MenuNew";
import { Stats } from "./Stats";

export function App() {
  return (
    <div>
      <MenuNew />
      {0 ? <MenuMain /> : ""}
      {0 ? <Stats /> : ""}
    </div>
  )
}