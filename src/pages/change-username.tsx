import { Button } from "@/components/Button"
import { InputWithLabel } from "@/components/InputWithLabel"
import { SetCenter } from "@/components/SetCenter"
import { Title } from "@/components/Title"
import { changeUsername, getUser } from "@/lib/auth"
import { User } from "@/lib/types"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import nookies from "nookies"
import React from "react"

type Props = {
    user: User
}

const ChangeUsername: NextPage<Props> = ({ user }) => {
    const [username, setUsername] = React.useState<string>(user.username)
    const router = useRouter()
    const [data, setData] = React.useState<any>()
    return (
        <SetCenter>
            <Title>Change Username</Title>
            <div className="grid gap-y-4 w-60 md:w-80">
                <InputWithLabel
                    label="New Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    message={
                        data?.username &&
                        typeof data.username === "object" &&
                        Array.isArray(data.username) &&
                        data.username[0]
                    }
                />
                <Button
                    fill
                    onClick={async () => {
                        const { isOk, data } = await changeUsername({
                            username,
                        })
                        if (isOk) router.push("/user")
                        if (data) setData(data)
                    }}
                >
                    Change
                </Button>
            </div>
            {data &&
                typeof data === "object" &&
                Object.entries(data as { [key: string]: any }).map((entry) => {
                    const [key, value] = entry
                    if (key === "username") return
                    if (
                        (typeof value !== "object" || !Array.isArray(value)) &&
                        typeof value !== "string"
                    )
                        return
                    return (
                        <p className="mt-8">
                            {key}: {value || ""}
                        </p>
                    )
                })}
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

export default ChangeUsername
