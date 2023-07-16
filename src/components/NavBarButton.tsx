import Link from "next/link"
import React from "react"

type NavBarButtonProps = {
    isMe?: boolean
    to?: string
    children: React.ReactNode
}

export const NavBarButton = ({
    to,
    children,
    isMe = false,
}: NavBarButtonProps) => {
    const res = (
        <div
            className={`font-bold text-sm ${
                isMe
                    ? "text-blue-800"
                    : `text-blue-50 bg-blue-400 ${
                          to
                              ? "hover:opacity-80 duration-200 hover:bg-blue-600"
                              : "opacity-40"
                      }`
            } w-10 h-10 p-4 inline-flex items-center text-sm font-bold rounded-md duration-200`}
        >
            {children}
            {/* {to ? <Link href={to}>{children}</Link> : children} */}
        </div>
    )
    return to ? <Link href={to}>{res}</Link> : res
}
