import { css, Global } from "@emotion/react";

export default function GlobalStyle() {
    return (
        <Global
            styles={css({
                html: {
                    height: "100%",
                    width: "100%",
                },
                body: {
                    height: "100vh",
                    width: "100%",
                    margin: 0,
                    overflow: "hidden",
                    fontFamily: '"Segoe UI", Meiryo, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
                }
            })}
        />
    )
}
