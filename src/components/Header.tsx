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
            <nav className="max-w-7xl mx-auto md:flex md:items-center md:justify-between py-2.5 px-5">
                <div className="flex justify-between items-center">
                    <Link
                        href="/"
                        // className="text-4xl text-blue-950 border-b border-transparent duration-200 hover:opacity-80 hover:border-blue-400"
                        className="py-4 px-4 rounded-full text-4xl text-blue-950 border-2 border-transparent duration-200 hover:opacity-80 hover:border-blue-800"
                    >
                        N_ha
                    </Link>
                    <button
                        className="text-blue-950 hover:bg-blue-200 m-2 p-2 rounded duration-200 hover:opacity-80 font-bold md:hidden"
                        onClick={() => setOpen(!isOpen)}
                    >
                        Menu
                    </button>
                </div>
                <div className={`${isOpen ? "block" : "hidden"} md:block`}>
                    <ul className="flex flex-col md:flex-row items-center divide-y md:divide-none p-2 bg-blue-300 md:bg-transparent rounded ">
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
