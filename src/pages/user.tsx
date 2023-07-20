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
            <div className="flex mb-8 gap-4 items-center">
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
            <div className="flex flex-col md:flex-row gap-4">
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
    const cookies = nookies.get(ctx)
    const user = await getUser({ cookies })
    if (!user) return { redirect: { permanent: false, destination: "/login" } }
    return {
        props: {
            user,
        },
    }
}

export default Me