import { Tag } from "@/lib/posts"
// Feature Function
type TagProps = {
    tag: Tag
}
const TagBudge = ({ tag }: TagProps) => {
    return (
        <p
            key={tag.id}
            className="px-2 py-1 w-max text-sm bg-blue-300 rounded-lg"
        >
            {tag.name}
        </p>
    )
}
