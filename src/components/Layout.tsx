import React from "react"
import { Header } from "./Header"

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="py-16 flex min-h-screen max-w-7xl mx-auto justify-center flex-col">
                {children}
            </main>
        </>
    )
}
