import { Post, getPost, getPostIds } from "@/lib/posts"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"

type Props = {
    post: Post
}

const PostDetail: NextPage<Props> = ({ post }) => {
    return (
        <div>
            <h1>{post.title}</h1>
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
