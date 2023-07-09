import { NavBar } from "@/components/NavBar"
import { PostsPreview, PostsWithPlainText } from "@/components/PostsPreview"
import { SetCenter } from "@/components/SetCenter"
import { getPosts, getPostsIds } from "@/lib/posts"
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
    if (!(typeof params?.id === "string")) {
        throw new Error(`Could not get a post id from params: ${params}`)
    }
    const posts = await getPosts({ id: params.id })
    const postsWithHtml: PostsWithPlainText = {
        ...posts,
        results: posts.results.map((post) => {
            // Todo: markdown の plaintext の定義
            const md: MarkdownIt & { plainText?: string } = new MarkdownIt()
            md.use(markdownItPlainText)
            md.render(post.content)
            return { ...post, contentPlainText: md.plainText || "" }
        }),
    }
    return {
        props: { posts: postsWithHtml },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const postsIds = await getPostsIds()
    const paths = postsIds.map((postsId) => ({
        params: { id: postsId.toString() },
    }))
    return {
        paths,
        fallback: false,
    }
}

export default PostList
