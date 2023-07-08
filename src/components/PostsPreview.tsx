import { Posts } from "@/lib/posts"
import { PostPreview } from "./PostPreview"

type PostsPreviewProps = {
    posts: Posts
}
export const PostsPreview = ({ posts }: PostsPreviewProps) => {
    return (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.results.map((post) => (
                <PostPreview key={post.id} post={post} />
            ))}
        </div>
    )
}
