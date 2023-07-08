import { Posts } from "@/lib/posts"
import { PostPreview } from "./PostPreview"

type PostsPreviewProps = {
    posts: Posts
}
export const PostsPreview = ({ posts }: PostsPreviewProps) => {
    return (
        <div>
            {posts.results.map((post) => (
                <PostPreview key={post.id} post={post} />
            ))}
        </div>
    )
}
