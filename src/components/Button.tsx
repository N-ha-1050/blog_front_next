import React from "react"

export const Button = ({
    children,
    fill = false,
    dangerous = false,
    ...props
}: {
    children: React.ReactNode
    fill?: boolean
    dangerous?: boolean
} & JSX.IntrinsicElements["button"]) => {
    const color = dangerous ? "red" : "blue"
    return (
        <button
            type="button"
            className={`p-4 rounded-md border-2 ring-transparent font-bold outline-none ring-2 focus:ring-offset-2 duration-200 text-sm ${
                fill
                    ? `border-transparent bg-${color}-600 text-${color}-50 hover:bg-${color}-800 focus:ring-${color}-400`
                    : `border-${color}-400 bg-transparent text-${color}-950 hover:bg-${color}-200 focus:ring-${color}-400`
            }`}
            {...props}
        >
            {children}
        </button>
    )
}
