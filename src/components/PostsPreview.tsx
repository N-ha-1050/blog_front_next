import { Posts } from "@/lib/posts"
import { PostPreview, PostWithPlainText } from "./PostPreview"

export type PostsWithPlainText = Omit<Posts, "results"> & {
    results: PostWithPlainText[]
}

type PostsPreviewProps = {
    posts: PostsWithPlainText
}
export const PostsPreview = ({ posts }: PostsPreviewProps) => {
    return (
        <div>
            {posts.count === 0 && <p>No posts found.</p>}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {posts.results.map((post) => (
                    <PostPreview key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}
