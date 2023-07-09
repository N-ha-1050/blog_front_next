import { Post } from "@/lib/posts"
import Link from "next/link"

export type PostWithPlainText = Post & { contentPlainText: string }

export type PostPreviewProps = {
    post: PostWithPlainText
}

export const PostPreview = ({ post }: PostPreviewProps) => {
    return (
        <Link
            href={`/posts/${post.id}`}
            className="p-8 w-72 border-2 border-blue-200 rounded-lg duration-200 hover:border-blue-800 hover:opacity-80 hover:bg-blue-50"
        >
            <p className="text-lg font-bold truncate">{post.title}</p>
            {/* {post.tags.map(tag => <TagBudge tag={tag} />)} */}
            <p className="indent-4 truncate">{post.contentPlainText}</p>
        </Link>
    )
}
