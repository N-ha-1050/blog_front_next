import React from "react"

export const Title = ({
    children,
    ...props
}: { children: React.ReactNode } & JSX.IntrinsicElements["h1"]) => {
    return (
        <h1 className="mb-4 text-4xl font-bold" {...props}>
            {children}
        </h1>
    )
}
