import { Post, getPost, getPostIds } from "@/lib/posts"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"

import MarkdownIt from "markdown-it"
import markdownItFrontMatter from "markdown-it-front-matter"
import markdownItAnchor from "markdown-it-anchor"
import markdownItTocRight from "markdown-it-toc-done-right"
import markdownItFootnote from "markdown-it-footnote"
import markdownItHighlightjs from "markdown-it-highlightjs"
import markdownItKatex from "markdown-it-katex"
import { TagBudge } from "@/components/TagBudge"
import { SetInline } from "@/components/SetInline"

type PostWithHtml = Post & { contentHtml: string }
type Props = {
    post: PostWithHtml
}

const PostDetail: NextPage<Props> = ({ post }) => {
    const createdAt = new Date(post.created_at)
    const updatedAt = new Date(post.updated_at)
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    return (
        <SetInline>
            <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
            <div className="flex gap-2">
                {post.tags.map((tag) => {
                    return <TagBudge key={tag.id} tag={tag} />
                })}
            </div>
            <div className="mb-8 sm:flex sm:gap-8">
                <p>作成日 {createdAt.toLocaleDateString(undefined, options)}</p>
                <p>更新日 {updatedAt.toLocaleDateString(undefined, options)}</p>
            </div>
            <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
        </SetInline>
    )
}
export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
    const { params } = ctx
    if (!(typeof params?.id === "string")) {
        throw new Error(`Could not get a post id from params: ${params}`)
    }
    const post = await getPost({ id: params.id })
    const md: MarkdownIt = new MarkdownIt()
    md.use(markdownItFrontMatter, (fm:string) => {
        // const fms = fm.split('\n')
        // fm.split('\n').map(fms => {
        //     const [key, value, ..._] = fms.split(':')
        //     if (key.trim().toLowerCase() === 'title') {
        //         post.title = value.trim()
        //         console.log(value)
        //     }
        // })
    })
    // md.use(markdownItAnchor, {
    //     permalink: true,
    //     permalinkBefore: true,
    //     permalinkSymbol: "§",
    // })
    // md.use(markdownItTocRight, { listType: "ul" })
    md.use(markdownItFootnote)
    md.use(markdownItHighlightjs)
    md.use(markdownItKatex)
    const postWithHtml: PostWithHtml = {
        ...post,
        contentHtml: md.render(post.content),
    }
    return {
        props: { post: postWithHtml },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const postIds = await getPostIds()
    const paths = postIds.map((id) => ({
        params: { id: id.toString() },
    }))
    return {
        paths,
        fallback: false,
    }
}

export default PostDetail
