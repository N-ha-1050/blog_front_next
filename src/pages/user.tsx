import { SetCenter } from "@/components/SetCenter"
import { getUser, logout } from "@/lib/auth"
import { User } from "@/lib/types"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import nookies from "nookies"
import { Button } from "@/components/Button"
import { Title } from "@/components/Title"
import Link from "next/link"
export const config = {
    runtime: "nodejs", // or "edge"
}
type Props = {
    user: User
}
const Me: NextPage<Props> = ({ user }) => {
    const router = useRouter()
    React.useEffect(() => {
        if (!user) router.push("/login")
    }, [])
    return (
        <SetCenter>
            <Title>User Detail</Title>
            <div className="mb-8 flex items-center gap-4">
                <p className="block">ようこそ、{user.username}さん</p>
                <Button
                    fill
                    dangerous
                    onClick={() => {
                        router.push("/delete-user")
                    }}
                >
                    Delete User
                </Button>
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
                <Button
                    onClick={() => {
                        router.push("/social-accounts")
                    }}
                >
                    Social Accounts
                </Button>
                <Button
                    onClick={() => {
                        router.push("/change-username")
                    }}
                >
                    Change Username
                </Button>
                {/* <Link href="/change-username">
                    <Button>Change Username</Button>
                </Link> */}
                <Button
                    onClick={() => {
                        router.push("/change-password")
                    }}
                >
                    Change Password
                </Button>
                {/* <Link href="/change-password">
                    <Button>Change Password</Button>
                </Link> */}
                <Button
                    onClick={async () => {
                        const isOk = await logout() // .then(() => setUser(undefined))
                        if (isOk) router.push("/login")
                    }}
                    fill
                >
                    Logout
                </Button>
            </div>
        </SetCenter>
    )
}
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    console.log("ctx", ctx)
    console.log("ctx.req.cookies", ctx.req.cookies)
    console.log("ctx.req.headers.cookie", ctx.req.headers.cookie)
    const cookies = nookies.get(ctx)
    const user = await getUser({ cookies })
    console.log("user", user)
    if (!user) return { redirect: { permanent: false, destination: "/login" } }
    return {
        props: {
            user,
        },
    }
}

export default Me
