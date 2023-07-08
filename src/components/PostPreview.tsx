import { Post } from "@/lib/posts"
import Link from "next/link"

export type PostPreviewProps = {
    post: Post
}

export const PostPreview = ({ post }: PostPreviewProps) => {
    return (
        <Link href={`/posts/${post.id}`}>
            <p className="truncate">{post.title}</p>
            {/* <p className="truncate">{post.content}</p> */}
        </Link>
    )
}
