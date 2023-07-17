import { useRouter } from "next/router"
import React from "react"
type SearchBoxProps = {
    search: string
}
const SearchBox = ({ search }: SearchBoxProps) => {
    const [text, setText] = React.useState<string>(search)
    const router = useRouter()
    const serachRedirect = () => {
        const params = new URLSearchParams({ search: text })
        router.push(`/posts/q/1?${params.toString()}`)
    }
    return (
        <div className="flex mb-4 mx-4 gap-2 items-center border border-blue-800 p-2 rounded-lg">
            <input
                className="w-full block p-2 rounded border-transparent focus:border-blue-400 ring-2 ring-transparent outline-none focus:ring-blue-400 duration-200"
                placeholder="Search Posts"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.nativeEvent.isComposing || e.key !== "Enter") return
                    serachRedirect()
                }}
            />
            <button
                className="bg-blue-600 rounded p-2 text-blue-50 font-bold hover:bg-blue-800 duration-200"
                onClick={serachRedirect}
            >
                Search
            </button>
            <button
                className="rounded p-2 text-blue-950 font-bold hover:bg-blue-100 duration-200"
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
