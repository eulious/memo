import { createSignal } from "solid-js";
import { ChangeEvent } from "./Common";

export default function Hankaku() {
  const [value, setValue] = createSignal("");

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.currentTarget.value);
  }

  function eisu(text: string) {
    return text.replace(/[A-Za-z0-9]/g, s => String.fromCharCode(s.charCodeAt(0) + 0xfee0));
  }

  function katakana(text: string) {
    return text
      .replace(reg, match => (kanaMap as any)[match])
      .replace(/゛/g, "ﾞ")
      .replace(/゜/g, "ﾟ");
  }

  function onClick(e: ChangeEvent<HTMLTextAreaElement>) {
    document!.getSelection()!.selectAllChildren(e.currentTarget);
    navigator.clipboard.writeText(katakana(eisu(e.currentTarget.value)));
  }
  const className =
    "scrollbar w-2/3 h-32 rounded-md resize-none border-gray-300 text-gray-700 text-lg outline-gray-300 border";

  return (
    <div class="h-full w-full">
      <div class="pt-10 pl-8">
        <textarea
          class={className}
          autocomplete="off"
          spellcheck={false}
          // autocorrect="off"
          value={value()}
          oninput={onChange}
        />
      </div>
      <div class="pt-10 pl-8">
        <textarea
          class={className}
          autocomplete="off"
          spellcheck={false}
          // autoCorrect="off"
          readOnly={true}
          onClick={onClick}
          value={katakana(eisu(value()))}
        />
      </div>
    </div>
  );
}

// prettier-ignore
const kanaMap = {
    "ガ": "ｶﾞ", "ギ": "ｷﾞ", "グ": "ｸﾞ", "ゲ": "ｹﾞ", "ゴ": "ｺﾞ",
    "ザ": "ｻﾞ", "ジ": "ｼﾞ", "ズ": "ｽﾞ", "ゼ": "ｾﾞ", "ゾ": "ｿﾞ",
    "ダ": "ﾀﾞ", "ヂ": "ﾁﾞ", "ヅ": "ﾂﾞ", "デ": "ﾃﾞ", "ド": "ﾄﾞ",
    "バ": "ﾊﾞ", "ビ": "ﾋﾞ", "ブ": "ﾌﾞ", "ベ": "ﾍﾞ", "ボ": "ﾎﾞ",
    "パ": "ﾊﾟ", "ピ": "ﾋﾟ", "プ": "ﾌﾟ", "ペ": "ﾍﾟ", "ポ": "ﾎﾟ",
    "ヴ": "ｳﾞ", "ヷ": "ﾜﾞ", "ヺ": "ｦﾞ",
    "ア": "ｱ", "イ": "ｲ", "ウ": "ｳ", "エ": "ｴ", "オ": "ｵ",
    "カ": "ｶ", "キ": "ｷ", "ク": "ｸ", "ケ": "ｹ", "コ": "ｺ",
    "サ": "ｻ", "シ": "ｼ", "ス": "ｽ", "セ": "ｾ", "ソ": "ｿ",
    "タ": "ﾀ", "チ": "ﾁ", "ツ": "ﾂ", "テ": "ﾃ", "ト": "ﾄ",
    "ナ": "ﾅ", "ニ": "ﾆ", "ヌ": "ﾇ", "ネ": "ﾈ", "ノ": "ﾉ",
    "ハ": "ﾊ", "ヒ": "ﾋ", "フ": "ﾌ", "ヘ": "ﾍ", "ホ": "ﾎ",
    "マ": "ﾏ", "ミ": "ﾐ", "ム": "ﾑ", "メ": "ﾒ", "モ": "ﾓ",
    "ヤ": "ﾔ", "ユ": "ﾕ", "ヨ": "ﾖ",
    "ラ": "ﾗ", "リ": "ﾘ", "ル": "ﾙ", "レ": "ﾚ", "ロ": "ﾛ",
    "ワ": "ﾜ", "ヲ": "ｦ", "ン": "ﾝ",
    "ァ": "ｧ", "ィ": "ｨ", "ゥ": "ｩ", "ェ": "ｪ", "ォ": "ｫ",
    "ッ": "ｯ", "ャ": "ｬ", "ュ": "ｭ", "ョ": "ｮ",
    "。": "｡", "、": "､", "ー": "ｰ", "「": "｢", "」": "｣", "・": "･"
}
const reg = new RegExp("(" + Object.keys(kanaMap).join("|") + ")", "g");
