import { Post } from "@/lib/posts"
import Link from "next/link"

export type PostPreviewProps = {
    post: Post
}

export const PostPreview = ({ post }: PostPreviewProps) => {
    return (
        <Link
            href={`/posts/${post.id}`}
            className="p-8 w-72 border-2 border-blue-200 rounded-lg duration-200 hover:border-blue-800 hover:opacity-80 hover:bg-blue-50"
        >
            <p className="text-lg font-bold truncate">{post.title}</p>
            {/* {post.tags.map((tag) => (
                <p
                    key={tag.id}
                    className="px-2 py-1 w-max text-sm bg-blue-300 rounded-lg"
                >
                    {tag.name}
                </p>
            ))} */}
            <p className="indent-4 truncate">{post.content}</p>
        </Link>
    )
}
