import { SetCenter } from "@/components/SetCenter"
import { getUser, login } from "@/lib/auth"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import nookies from "nookies"
import { Button } from "@/components/Button"
import { Title } from "@/components/Title"
import { InputWithLabel } from "@/components/InputWithLabel"
type Props = {}
const Login: NextPage<Props> = () => {
    const [username, setUsername] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [data, setData] = React.useState<any>()
    const router = useRouter()

    return (
        <SetCenter>
            <Title>Login</Title>
            <form>
                <div className="grid gap-y-4 w-60 md:w-80">
                    <InputWithLabel
                        label="Username"
                        htmlFor="username"
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
                    <InputWithLabel
                        label="Password"
                        htmlFor="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        message={
                            data?.password &&
                            typeof data.password === "object" &&
                            Array.isArray(data.password) &&
                            data.password[0]
                        }
                    />
                    <Button
                        onClick={async () => {
                            const { isOk, data } = await login({
                                username,
                                password,
                            })
                            console.log(data)
                            console.log(data?.password)
                            console.log(
                                data?.password &&
                                    typeof data.password === "object",
                            )
                            console.log(
                                data?.password &&
                                    typeof data.password === "object" &&
                                    data.password[0],
                            )
                            if (isOk) router.push("/user")
                            if (data) setData(data)
                        }}
                        fill
                    >
                        Login
                    </Button>
                </div>
            </form>
            {data &&
                typeof data === "object" &&
                Object.entries(data as { [key: string]: any }).map((entry) => {
                    const [key, value] = entry
                    if (key === "username" || key === "password") return
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
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx)
    const user = await getUser({ cookies })
    if (user) return { redirect: { permanent: false, destination: "/user" } }
    return {
        props: {},
    }
}
export default Login
