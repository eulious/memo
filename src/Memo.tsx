import { createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { ChangeEvent, invoke } from "./Common";

const TAB = 4;

class TextUpdater {
  public previous = "";
  public now = "";
  public enable = false;

  constructor() {
    setInterval(() => {
      this.write();
    }, 5000);
  }

  public update(texts: string[]) {
    this.now = JSON.stringify(texts);
  }

  public write() {
    if (this.enable && this.previous !== this.now) {
      invoke.write({ filename: "memo.txt", text: this.now });
      this.previous = this.now;
    }
  }
}

export default function Memo() {
  const [tab, setTab] = createSignal(0);
  const [texts, setTexts] = createSignal(new Array(TAB).fill(""));
  const [value, setValue] = createSignal("");
  const tu = createMemo(() => new TextUpdater(), []);

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.currentTarget.value);
    texts()[tab()] = e.currentTarget.value;
    setTexts([...texts()]);
    tu().update(texts());
  }

  function changeTab(tab: number) {
    setValue(texts()[tab]);
    setTab(tab);
  }

  function keydown(e: KeyboardEvent) {
    if (e.metaKey) {
      if (e.key === "a" && e.shiftKey) {
      } else if (e.key === "a") {
      } else if (e.key === "e") {
      } else if (e.key === "p") {
      } else if (e.key === "n") {
      } else if (e.key === "f") {
      } else if (e.key === "b") {
      } else if (e.key === "k") {
      } else {
        return true;
      }
      e.preventDefault();
      return false;
    }
  }

  onCleanup(() => {
    // window.removeEventListener("keydown", keydown);
  });

  onMount(() => {
    // window.addEventListener("keydown", keydown);
    invoke.read({ filename: "memo.txt" }).then(res => {
      setTexts(res);
      setValue(res[tab()]);
      tu().previous = JSON.stringify(res);
      tu().now = JSON.stringify(res);
      tu().enable = true;
    });
  });

  return (
    <div>
      <Tab
        tab={tab()}
        setTab={changeTab}
      />
      <textarea
        class="scrollbar w-full resize-none border-0 text-gray-700 text-lg focus:outline-none"
        style={{ height: "96.8vh" }}
        autocomplete="off"
        spellcheck={false}
        // autocorrect="off"
        value={value()}
        onChange={onChange}
      />
    </div>
  );
}

interface TabProps {
  tab: number;
  setTab: Function;
}
function Tab(props: TabProps) {
  return (
    <header class="flex">
      {[...Array(TAB)].map((_, i) => (
        <div
          onClick={() => props.setTab(i)}
          class={
            "h-7 w-full cursor-pointer border border-gray-300 " +
            (props.tab === i ? "bg-gray-300" : "hover:duration-300 hover:bg-gray-200")
          }
        />
      ))}
    </header>
  );
}
