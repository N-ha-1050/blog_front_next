import React from "react"

export const Button = ({
    children,
    fill = false,
    ...props
}: {
    children: React.ReactNode
    fill?: boolean
} & JSX.IntrinsicElements["button"]) => {
    return (
        <button
            type="button"
            className={`p-4 rounded-md border-2 ring-transparent font-bold outline-none ring-2 focus:ring-offset-2 duration-200 text-sm ${
                fill
                    ? "border-transparent  bg-blue-600 text-blue-50 hover:bg-blue-800 focus:ring-blue-400"
                    : "border-blue-400 bg-transparent text-blue-950 hover:bg-blue-200 focus:ring-blue-400"
            }`}
            {...props}
        >
            {children}
        </button>
    )
}
