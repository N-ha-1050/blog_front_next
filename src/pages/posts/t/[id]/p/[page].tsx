import { NavBar } from "@/components/NavBar"
import { PostsPreview, PostsWithPlainText } from "@/components/PostsPreview"
import { SetCenter } from "@/components/SetCenter"
import { getTag, getTagIds, getTagPosts, getTagPostsPages } from "@/lib/posts"
import MarkdownIt from "markdown-it"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import markdownItPlainText from "markdown-it-plain-text"
import { TagBudge } from "@/components/TagBudge"
import { Tag } from "@/lib/types"
import Link from "next/link"

type Props = {
    tag: Tag
    posts: PostsWithPlainText
}

const PostTagList: NextPage<Props> = ({ tag, posts }: Props) => {
    // const {count, page, has_next: hasNext, has_previous:hasPrevious, num_page: numPage} = posts
    return (
        <SetCenter>
            <h1 className="mb-8 text-4xl font-bold flex flex-row gap-2">
                <TagBudge tag={tag} />
                の記事一覧
            </h1>
            <PostsPreview posts={posts} />
            <NavBar
                getLink={(pageNum) => `/posts/t/${tag.id}/p/${pageNum}`}
                page={posts.page}
                numPages={posts.num_pages}
                hasNext={posts.has_next}
                hasPrevious={posts.has_previous}
            />
        </SetCenter>
    )
}
export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
    const { params } = ctx
    if (
        !(typeof params?.page === "string") ||
        !(typeof params?.id === "string")
    ) {
        throw new Error(`Could not get a post id from params: ${params}`)
    }
    const tag = await getTag({ id: params.id, reqLoop: true })
    const posts = await getTagPosts({
        id: params.id,
        page: params.page,
        reqLoop: true,
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
        props: { tag, posts: postsWithPlainText },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const tagIds = await getTagIds({ reqLoop: true })
    const result = await Promise.all(
        tagIds.map(async (id) => {
            const tagsPostspages = await getTagPostsPages({ id, reqLoop: true })
            const paths = tagsPostspages.map((page) => ({
                params: { id: id.toString(), page: page.toString() },
            }))
            return paths
        }),
    )
    const paths = result.flat()
    return {
        paths,
        fallback: false,
    }
}

export default PostTagList
