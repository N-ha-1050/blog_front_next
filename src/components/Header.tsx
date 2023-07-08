import Link from "next/link"

export const Header = () => {
    return (
        <header className="flex items-center py-2.5 px-5 max-w-7xl mx-auto">
            <Link
                href="/"
                // className="text-4xl text-blue-950 border-b border-transparent duration-200 hover:opacity-80 hover:border-blue-400"
                className="py-5 px-5 rounded-full text-4xl text-blue-950 border-2 border-transparent duration-200 hover:opacity-80 hover:border-blue-400"
            >
                N_ha
            </Link>
            <div className="flex-1" />
            <button className="text-blue-950">Menu</button>
        </header>
    )
}
