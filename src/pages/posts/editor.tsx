import { Post, getPost } from "@/lib/posts"
import MarkdownIt from "markdown-it"
import markdownItFrontMatter from "markdown-it-front-matter"
import markdownItFootnote from "markdown-it-footnote"
import markdownItHighlightjs from "markdown-it-highlightjs"
import markdownItKatex from "markdown-it-katex"
import markdownItAnchor from "markdown-it-anchor"
import markdownItTocRight from "markdown-it-toc-done-right"
import { NextPage } from "next"
import React from "react"
import { SetInline } from "@/components/SetInline"
import { load, JSON_SCHEMA } from "js-yaml"

const Editor: NextPage = () => {
    const [id, setId] = React.useState<number>(1)
    const [post, setPost] = React.useState<Post>()
    const [content, setContent] = React.useState<string>("")
    const [contentHtml, setContentHtml] = React.useState<string>("")
    const [frontMatter, setFrontMatter] =
        React.useState<{ [key in string]: any }>()
    // const [title, setTitle] = React.useState<string>("")
    const handleClick = async () => {
        const resPost = await getPost({ id })
        setPost(resPost)
        handleChange(resPost.content)
    }
    const handleChange = (text: string) => {
        setContent(text)
        setFrontMatter(undefined)
        const md: MarkdownIt = new MarkdownIt()
        md.use(markdownItFrontMatter, (fm: string) => {
            console.log(fm)
            try {
                const resFrontMatter = load(fm, {
                    schema: JSON_SCHEMA,
                    json: true,
                }) as {
                    [key in string]: any
                }
                setFrontMatter(resFrontMatter)
            } catch (e) {
                console.error(e)
            }
            // fm.split("\n").map((fms) => {
            //     const [key, value, ..._] = fms.split(":")
            //     if (key.trim().toLowerCase() === "title") {
            //         setTitle(value.trim())
            //         console.log(value)
            //     }
            // })
        })
        md.use(markdownItAnchor, {
            // permalink: true,
            // permalinkBefore: true,
            // permalinkSymbol: "§",
        })
        md.use(markdownItTocRight, { listType: "ul" })
        md.use(markdownItFootnote)
        md.use(markdownItHighlightjs)
        md.use(markdownItKatex)
        setContentHtml(md.render(text))
    }
    return (
        <SetInline>
            <h1 className="text-center text-4xl">Editor</h1>
            <h2>Get Post</h2>
            <div className="mb-4 flex gap-2 p-2">
                <input
                    className="border-blue-400 border-2 rounded p-2"
                    type="number"
                    value={id}
                    onChange={(e) => setId(Number(e.target.value))}
                />
                <button
                    className="bg-blue-600 rounded p-2 font-bold text-blue-50"
                    onClick={handleClick}
                >
                    Try to Get
                </button>
            </div>
            <h2>Post Data</h2>
            <div className="mb-4 p-2">
                <p>
                    {post?.id}: {post?.title} (
                    {post?.is_visible ? "公開" : "非公開"})
                </p>
            </div>
            <h2>title</h2>
            <div className="mb-4 p-2">
                <p className="text-xl font-bold">{frontMatter?.title}</p>
            </div>
            <h2>Front Meta Data</h2>
            <div className="mb-4 p-2">
                {frontMatter ? (
                    <table className="table-auto bg-blue-50 rounded">
                        <thead className="border-b-blue-600 border-b-2">
                            <tr>
                                <th>key</th>
                                <th>type</th>
                                <th>value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {frontMatter &&
                                Object.entries(frontMatter).map((entry) => {
                                    const [key, value] = entry
                                    return (
                                        <tr key={key}>
                                            <th>{key}</th>
                                            <th>{typeof value}</th>
                                            <th>
                                                {value !== null &&
                                                    value.toString()}
                                            </th>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                ) : (
                    <p>There is no Front Meta Data</p>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <h2>Editor</h2>
                    <div className="mb-4 p-2 h-full">
                        <textarea
                            className="md:h-full w-full border-blue-800 border-2 rounded p-4"
                            value={content}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <h2>Preview</h2>
                    <div className="mb-4 p-2">
                        <div
                            className="prose prose-lg max-w-none border-blue-800 rounded p-4 border-2"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />
                    </div>
                </div>
            </div>
        </SetInline>
    )
}

export default Editor
