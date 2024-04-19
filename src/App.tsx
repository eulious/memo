import { Match, Switch, createSignal } from "solid-js";
import { ChangeEvent } from "./Common";
import Hankaku from "./Hankaku";
import Snippet from "./Snippet";
import Memo from "./Memo";

export default function App() {
  const [mode, setMode] = createSignal("snippet");

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    setMode(e.currentTarget.value);
  }

  return (
    <div>
      <select
        value={mode()}
        class="absolute bg-transparent h-5 w-12"
        onChange={onChange}
      >
        <option value="memo"></option>
        <option value="hankaku"></option>
        <option value="snippet"></option>
      </select>
      <Switch>
        <Match when={mode() === "memo"}>
          <Memo />
        </Match>
        <Match when={mode() === "hankaku"}>
          <Hankaku />
        </Match>
        <Match when={mode() === "snippet"}>
          <Snippet setMode={setMode} />
        </Match>
      </Switch>
    </div>
  );
}
