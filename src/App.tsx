/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ChangeEvent, useState } from 'react'
import Hankaku from './Hankaku'
import Memo from './Memo'
import Snippet from './Snippet'

export default function App() {
    const [mode, setMode] = useState("snippet")

    function onChange(e: ChangeEvent<HTMLSelectElement>) {
        setMode(e.target.value)
    }

    return (
        <div>
            <select
                value={mode}
                css={style.select}
                onChange={onChange}>
                <option value="memo"></option>
                <option value="hankaku"></option>
                <option value="snippet"></option>
            </select>
            {mode === "memo" && <Memo />}
            {mode === "hankaku" && <Hankaku />}
            {mode === "snippet" && <Snippet setMode={setMode} />}
        </div>
    )
}

const style = {
    select: css({
        position: "absolute",
        background: "transparent",
        border: "transparent 0px inset",
        height: "20px",
        width: "50px",
        color: "transparent"
    }),
}