import { Post, getPost, getPostIds } from "@/lib/posts"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"

type Props = {
    post: Post
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
        <div>
            <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
            <div className="mb-8 sm:flex sm:gap-8">
                <p>作成日 {createdAt.toLocaleDateString(undefined, options)}</p>
                <p>更新日 {updatedAt.toLocaleDateString(undefined, options)}</p>
            </div>
            <p>{post.content}</p>
        </div>
    )
}
export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
    const { params } = ctx
    if (!(typeof params?.id === "string")) {
        throw new Error(`Could not get a post id from params: ${params}`)
    }
    const post = await getPost({ id: params.id })
    return {
        props: { post },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const postIds = await getPostIds()
    const paths = postIds.map((postId) => ({
        params: { id: postId.toString() },
    }))
    return {
        paths,
        fallback: false,
    }
}

export default PostDetail
