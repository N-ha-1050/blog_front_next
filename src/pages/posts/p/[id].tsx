import { NavBar } from "@/components/NavBar"
import { PostsPreview } from "@/components/PostsPreview"
import { SetCenter } from "@/components/SetCenter"
import { Posts, getPosts, getPostsIds } from "@/lib/posts"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"

type Props = {
    posts: Posts
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
    return {
        props: { posts },
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
