import { NavBar } from "@/components/NavBar"
import { PostsPreview, PostsWithPlainText } from "@/components/PostsPreview"
import { SetCenter } from "@/components/SetCenter"
import { getSearchPosts } from "@/lib/posts"
import { GetServerSideProps, NextPage } from "next"

import MarkdownIt from "markdown-it"
import markdownItPlainText from "markdown-it-plain-text"
import React from "react"
import Link from "next/link"

type Props = {
    posts: PostsWithPlainText
    search: string
}

const PostSearchList: NextPage<Props> = ({ search, posts }) => {
    const [text, setText] = React.useState<string>(search)
    return (
        <SetCenter>
            <h1 className="mb-8 text-4xl font-bold">{search} の記事一覧</h1>
            <div className="flex gap-2 mb-4">
                <input
                    className="border-2 border-blue-950 rounded"
                    type="search"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Link href={`/posts/q/1?search=${encodeURI(text)}`}>
                    <button>検索</button>
                </Link>
            </div>
            <PostsPreview posts={posts} />
            <NavBar
                getLink={(pageNum) => `/posts/q/${pageNum}?search=${search}`}
                page={posts.page}
                numPages={posts.num_pages}
                hasNext={posts.has_next}
                hasPrevious={posts.has_previous}
            />
        </SetCenter>
    )
}
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const { params, query } = ctx
    if (!(typeof params?.page === "string")) {
        throw new Error(`Could not get a post id from params: ${params}`)
    }
    const search = typeof query?.search === "string" ? query.search : ""
    const posts = await getSearchPosts({
        page: params.page,
        search,
    })
    const postsWithPlainText: PostsWithPlainText = {
        ...posts,
        results: posts.results.map((post) => {
            const md = new MarkdownIt()
            md.use(markdownItPlainText)
            md.render(post.content)
            return { ...post, contentPlainText: (md as any).plainText || "" }
        }),
    }
    return {
        props: { posts: postsWithPlainText, search },
    }
}
export default PostSearchList
