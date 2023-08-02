import { Post } from "@/lib/types"
import Link from "next/link"
import { TagBudgeMini } from "./TagBudge"

export type PostWithPlainText = Post & { contentPlainText: string }

export type PostPreviewProps = {
    post: PostWithPlainText
    realtime: boolean
}

export const PostPreview = ({ post, realtime }: PostPreviewProps) => {
    const link = realtime ? `/posts/u/${post.id}` : `/posts/${post.id}`
    return (
        <Link
            href={link}
            className="w-72 rounded-lg border-2 border-blue-200 p-8 duration-200 hover:border-blue-800 hover:bg-blue-50 hover:opacity-80"
        >
            <p className="truncate text-lg font-bold">{post.title}</p>
            <div className="flex gap-1">
                {post.tags.map((tag) => (
                    <TagBudgeMini key={tag.id} tag={tag} />
                ))}
            </div>
            <p className="truncate indent-4">{post.contentPlainText}</p>
        </Link>
    )
}
