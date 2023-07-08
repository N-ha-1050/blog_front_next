import Link from "next/link"
import React from "react"

type NavBarButtonProps = {
    to: string
    children: React.ReactNode
}

export const NavBarButton = ({ to, children }: NavBarButtonProps) => {
    return (
        <Link
            href={to}
            className="p-2 w-max aspect-square rounded border-2 text-center"
        >
            {children}
        </Link>
    )
}
