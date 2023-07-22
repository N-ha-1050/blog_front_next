import { Posts } from "@/lib/types"
import { PostPreview, PostWithPlainText } from "./PostPreview"

export type PostsWithPlainText = Omit<Posts, "results"> & {
    results: PostWithPlainText[]
}

type PostsPreviewProps = {
    posts: PostsWithPlainText
    realtime?: boolean
}
export const PostsPreview = ({
    posts,
    realtime = false,
}: PostsPreviewProps) => {
    return (
        <div>
            {posts.count === 0 && <p>No posts found.</p>}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {posts.results.map((post) => (
                    <PostPreview
                        key={post.id}
                        post={post}
                        realtime={realtime}
                    />
                ))}
            </div>
        </div>
    )
}
