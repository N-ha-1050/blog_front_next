import { Tag } from "@/lib/types"
import Link from "next/link"
// Feature Function
type TagProps = {
    tag: Tag
}
export const TagBudgeMini = ({ tag }: TagProps) => {
    return (
        <p className="w-max rounded-lg bg-blue-100 px-2 py-0.5 text-xs text-blue-950">
            {tag.name}
        </p>
    )
}
export const TagBudge = ({ tag }: TagProps) => {
    return (
        <Link href={`/posts/t/${tag.id}/p/1`}>
            <p className="w-max rounded-lg bg-blue-100 px-2 py-1 text-blue-950 duration-200 hover:opacity-80">
                {tag.name}
            </p>
        </Link>
    )
}
