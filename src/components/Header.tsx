import Link from "next/link"
import React from "react"
import { MenuContent, MenuContentProps } from "./MenuContent"

const menuContents: MenuContentProps[] = [
    { text: "Home", to: "/" },
    { text: "About", to: "/posts/1" },
    { text: "Posts", to: "/posts/p/1" },
    { text: "Search", to: "/posts/q/1" },
    { text: "User", to: "/user" },
]
export const Header = () => {
    const [isOpen, setOpen] = React.useState<boolean>(false)
    return (
        <header className="bg-blue-400">
            <nav className="mx-auto max-w-7xl px-5 py-2.5 md:flex md:items-center md:justify-between">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        // className="text-4xl text-blue-950 border-b border-transparent duration-200 hover:opacity-80 hover:border-blue-400"
                        className="rounded-full border-2 border-transparent px-4 py-4 text-4xl text-blue-950 duration-200 hover:border-blue-800 hover:opacity-80"
                    >
                        N_ha
                    </Link>
                    <button
                        className="m-2 rounded p-2 font-bold text-blue-950 duration-200 hover:bg-blue-200 hover:opacity-80 md:hidden"
                        onClick={() => setOpen(!isOpen)}
                    >
                        Menu
                    </button>
                </div>
                <div className={`${isOpen ? "block" : "hidden"} md:block`}>
                    <ul className="flex flex-col items-center divide-y rounded bg-blue-300 p-2 md:flex-row md:divide-none md:bg-transparent ">
                        {menuContents.map((menuContent) => (
                            <MenuContent
                                key={menuContent.text}
                                {...menuContent}
                            />
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    )
}
