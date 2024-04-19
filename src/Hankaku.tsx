/** @jsxImportSource @emotion/react */
import { ChangeEvent, MouseEvent, useState } from 'react';
import { css } from '@emotion/react'

export default function Hankaku() {
    const [value, setValue] = useState("")

    function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value)
    }

    function eisu(text: string) {
        return text.replace(/[A-Za-z0-9]/g, s => String.fromCharCode(s.charCodeAt(0) + 0xFEE0))
    }

    function katakana(text: string) {
        return text
            .replace(reg, match => (kanaMap as any)[match])
            .replace(/゛/g, 'ﾞ')
            .replace(/゜/g, 'ﾟ');
    }

    function onClick(e: MouseEvent<HTMLTextAreaElement>) {
        document!.getSelection()!.selectAllChildren(e.currentTarget);
        navigator.clipboard.writeText(katakana(eisu(e.currentTarget.value)))
    }

    return (
        <div css={style.wrapper}>
            <div css={style.container}>
                <textarea
                    css={style.textarea}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    value={value}
                    onChange={onChange} />
            </div>
            <div css={style.container}>
                <textarea
                    css={style.textarea}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    readOnly={true}
                    onClick={onClick}
                    value={katakana(eisu(value))} />
            </div>
        </div>
    )
}


const style = {
    wrapper: css({
        height: "100%",
        width: "100%"
    }),

    textarea: css({
        width: "60vw",
        height: "10vh",
        resize: "none",
        border: "solid 1px rgb(198, 198, 198)",
        color: "rgb(55, 55, 55)",
        fontSize: "large",

        "&:focus": {
            outline: "solid 1px rgb(198, 198, 198)",
        },

        "&::-webkit-scrollbar": {
            width: "10px",
        },

        "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            background: "rgb(200, 200, 200)"
        }
    }),

    container: css({
        paddingTop: "40px",
        paddingLeft: "30px"
    })
}


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
const reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');