import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="ja">
            <Head>
                <link rel="icon" href="./favicon.svg" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/base16/google-dark.min.css"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
