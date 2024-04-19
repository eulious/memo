import { createSignal, onMount } from "solid-js";
import { ChangeEvent, invoke } from "./Common";

interface SnippetProps {
  setMode: Function;
}
export default function Snippet(props: SnippetProps) {
  const [texts, setTexts] = createSignal(Array(10).fill("aaaaaaaa\n\naaaa\naaaa\n\n\naaaaa\naaaaaa"));

  (window as any).add = (s: string) => {
    setTexts([...texts(), s]);
    invoke.write({
      filename: "snippet.json",
      text: JSON.stringify([...texts(), s], null, 2)
    });
  };

  onMount(() => {
    invoke.read({ filename: "snippet.json" }).then(res => {
      setTexts(res);
    });
  });

  async function onClick(e: ChangeEvent<HTMLTextAreaElement>) {
    document!.getSelection()!.selectAllChildren(e.currentTarget);
    navigator.clipboard.writeText(e.currentTarget.value);
    await new Promise(s => setTimeout(s, 100));
    props.setMode("memo");
  }

  return (
    <div class="h-full w-full grid grid-cols-4 gap-2 p-2">
      {texts().map(s => (
        <div>
          <textarea
            style={{ outline: "solid 1px rgb(198, 198, 198)" }}
            class="scrollbar w-full block h-32 resize-none border-black border-1 text-gray-700 text-lg"
            autocomplete="off"
            // autocorrect="off"
            spellcheck={false}
            value={s}
            readOnly={true}
            onClick={onClick}
          />
        </div>
      ))}
    </div>
  );
}
