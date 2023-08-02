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
            className={`text-sm font-bold ${
                isMe
                    ? "text-blue-800"
                    : `bg-blue-400 text-blue-50 ${
                          to
                              ? "duration-200 hover:bg-blue-600 hover:opacity-80"
                              : "opacity-40"
                      }`
            } inline-flex h-10 w-10 items-center rounded-md p-4 text-sm font-bold duration-200`}
        >
            {children}
            {/* {to ? <Link href={to}>{children}</Link> : children} */}
        </div>
    )
    return to ? <Link href={to}>{res}</Link> : res
}
