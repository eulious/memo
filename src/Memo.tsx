/** @jsxImportSource @emotion/react */
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { invoke } from './Common';
import { css } from '@emotion/react'

const TAB = 4

class TextUpdater {
    public previous = ""
    public now = ""
    public enable = false

    constructor() {
        setInterval(() => { this.write() }, 5000)
    }

    public update(texts: string[]) {
        this.now = JSON.stringify(texts);
    }

    public write() {
        if (this.enable && this.previous !== this.now) {
            invoke.write({ filename: "memo.txt", text: this.now })
            this.previous = this.now
        }
    }
}


export default function Memo() {
    const [tab, setTab] = useState(0)
    const [texts, setTexts] = useState(new Array(TAB).fill(""))
    const [value, setValue] = useState("")
    const tu = useMemo(() => new TextUpdater(), [])

    function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value)
        texts[tab] = e.target.value
        setTexts([...texts])
        tu.update(texts)
    }

    function changeTab(tab: number) {
        setValue(texts[tab])
        setTab(tab)
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
                return true
            }
            e.preventDefault()
            return false
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", keydown);
        return () => window.removeEventListener("keydown", keydown)
    })

    useEffect(() => {
        invoke.read({ filename: "memo.txt" }).then(res => {
            setTexts(res)
            setValue(res[tab])
            tu.previous = JSON.stringify(res)
            tu.now = JSON.stringify(res)
            tu.enable = true
        })
    }, [])

    return (
        <div>
            <Tab
                tab={tab}
                setTab={changeTab} />
            <textarea
                css={style.textarea}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                value={value}
                onChange={onChange} />
        </div>
    )
}


interface TabProps {
    tab: number
    setTab: Function
}
function Tab(props: TabProps) {
    return (
        <header css={style.header}>
            {[...Array(TAB)].map((_, i) => (
                <div
                    key={i}
                    onClick={() => props.setTab(i)}
                    css={[
                        style.tab,
                        props.tab !== i && style.tabUnselect,
                        props.tab === i && style.tabSelect
                    ]} />
            ))}
        </header>
    )
}


const style = {
    header: css({
        display: "flex"
    }),

    tab: css({
        height: "20px",
        width: "100%",
        cursor: "pointer",
        border: "solid 1px rgb(198, 198, 198)"
    }),

    tabUnselect: css({
        ":hover": {
            transition: "0.4s",
            backgroundColor: "rgb(228, 228, 228)",
        }
    }),

    tabSelect: css({
        backgroundColor: "rgb(198, 198, 198)"
    }),

    textarea: css({
        width: "100vw",
        height: "96.8vh",
        resize: "none",
        border: "0px",
        color: "rgb(55, 55, 55)",
        fontSize: "large",

        "&:focus": {
            outline: "none",
        },

        "&::-webkit-scrollbar": {
            width: "10px",
        },

        "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            background: "rgb(200, 200, 200)"
        }
    })
}