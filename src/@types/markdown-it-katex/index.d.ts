import MarkdownIt from "markdown-it"
// import Katex, { KatexOptions } from "katex"

// interface Options extends KatexOptions {
//   katex?: typeof Katex
//   blockClass?: string
// }

// declare function katex(md: MarkdownIt, options?: Options): void
declare function katex(md: MarkdownIt, opts?: any): void

export = katex
