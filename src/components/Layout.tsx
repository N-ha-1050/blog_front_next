import React from "react"
import { Header } from "./Header"

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center py-16">
                {children}
            </main>
        </>
    )
}
