/** @jsxImportSource @emotion/react */
import { MouseEvent, useEffect, useState } from 'react';
import { invoke } from './Common';
import { css } from '@emotion/react'

interface SnippetProps {
    setMode: Function
}
export default function Snippet(props: SnippetProps) {
    const [texts, setTexts] = useState(Array(10).fill("aaaaaaaa\n\naaaa\naaaa\n\n\naaaaa\naaaaaa"));

    (window as any).add = (s: string) => {
        setTexts([...texts, s])
        invoke.write({
            filename: "snippet.json",
            text: JSON.stringify([...texts, s], null, 2)
        })
    }

    const row: JSX.Element[] = []
    let domm: JSX.Element[] = []
    texts.forEach((s, i) => {
        domm.push(
            <td key={i}>
                <textarea
                    css={style.textarea}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    value={s}
                    readOnly={true}
                    onClick={onClick} />
            </td>
        )
        if (i % 4 == 3 || i == texts.length - 1) {
            row.push(<tr key={i} >{domm}</tr>)
            domm = [];
        }
    })

    useEffect(() => {
        invoke.read({ filename: "snippet.json" }).then(res => {
            setTexts(res)
        })
    }, [])

    async function onClick(e: MouseEvent<HTMLTextAreaElement>) {
        document!.getSelection()!.selectAllChildren(e.currentTarget);
        navigator.clipboard.writeText(e.currentTarget.value)
        await new Promise(s => setTimeout(s, 100))
        props.setMode("memo")
    }

    return (
        <div css={style.wrapper}>
            <table css={style.table}>
                <tbody>
                    {row}
                </tbody>
            </table>
        </div>
    )
}


const style = {
    wrapper: css({
        height: "100%",
        width: "100%",
        display: "flex",
        flexWrap: "wrap"
    }),

    table: css({
        tableLayout: "fixed",
    }),

    textarea: css({
        display: "block",
        width: "24vw",
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
    })
}
