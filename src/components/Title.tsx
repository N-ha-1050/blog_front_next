import React from "react"

export const Title = ({
    children,
    ...props
}: { children: React.ReactNode } & JSX.IntrinsicElements["h1"]) => {
    return (
        <h1 className="text-4xl font-bold mb-4" {...props}>
            {children}
        </h1>
    )
}
