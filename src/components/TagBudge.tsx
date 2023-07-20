import { Tag } from "@/lib/types"
import Link from "next/link"
// Feature Function
type TagProps = {
    tag: Tag
}
export const TagBudgeMini = ({ tag }: TagProps) => {
    return (
        <p className="px-2 py-0.5 w-max text-xs text-blue-950 bg-blue-100 rounded-lg">
            {tag.name}
        </p>
    )
}
export const TagBudge = ({ tag }: TagProps) => {
    return (
        <Link href={`/posts/t/${tag.id}/p/1`}>
            <p className="duration-200 hover:opacity-80 px-2 py-1 w-max text-blue-950 bg-blue-100 rounded-lg">
                {tag.name}
            </p>
        </Link>
    )
}
