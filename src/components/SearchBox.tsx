import { useRouter } from "next/router"
import React from "react"
type SearchBoxProps = {
    search: string
}
const SearchBox = ({ search }: SearchBoxProps) => {
    const [text, setText] = React.useState<string>(search)
    const router = useRouter()
    return (
        <div className="mx-4 mb-4 flex items-center gap-2 rounded-lg border border-blue-800 p-2">
            <input
                className="block w-full rounded border-transparent p-2 outline-none ring-2 ring-transparent duration-200 focus:border-blue-400 focus:ring-blue-400"
                placeholder="Search Posts"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.nativeEvent.isComposing || e.key !== "Enter") return
                    router.push(`/posts/q/1?search=${encodeURI(text)}`)
                }}
            />
            <button
                className="rounded bg-blue-600 p-2 font-bold text-blue-50 duration-200 hover:bg-blue-800"
                onClick={() =>
                    router.push(`/posts/q/1?search=${encodeURI(text)}`)
                }
            >
                Search
            </button>
            <button
                className="rounded p-2 font-bold text-blue-950 duration-200 hover:bg-blue-100"
                onClick={() => {
                    setText("")
                    router.push(`/posts/q/1`)
                }}
            >
                Reset
            </button>
        </div>
    )
}
export default SearchBox
