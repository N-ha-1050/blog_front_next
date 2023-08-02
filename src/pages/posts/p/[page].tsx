import { NavBar } from "@/components/NavBar"
import { PostsPreview, PostsWithPlainText } from "@/components/PostsPreview"
import { SetCenter } from "@/components/SetCenter"
import { getPosts, getPostsPages } from "@/lib/posts"
import MarkdownIt from "markdown-it"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import markdownItPlainText from "markdown-it-plain-text"

type Props = {
    posts: PostsWithPlainText
}

const PostList: NextPage<Props> = ({ posts }: Props) => {
    // const {count, page, has_next: hasNext, has_previous:hasPrevious, num_page: numPage} = posts
    return (
        <SetCenter>
            <h1 className="mb-8 text-4xl font-bold">記事一覧</h1>
            <PostsPreview posts={posts} />
            <NavBar
                getLink={(pageNum) => `/posts/p/${pageNum}`}
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
    if (!(typeof params?.page === "string")) {
        throw new Error(`Could not get a post id from params: ${params}`)
    }
    const posts = await getPosts({ page: params.page, reqLoop: true })
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
        props: { posts: postsWithPlainText },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const postsPages = await getPostsPages({ reqLoop: true })
    const paths = postsPages.map((page) => ({
        params: { page: page.toString() },
    }))
    return {
        paths,
        fallback: false,
    }
}

export default PostList
