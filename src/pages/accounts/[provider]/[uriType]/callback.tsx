import { SetCenter } from "@/components/SetCenter"
import { Provider, UriType, providers, socialLogin } from "@/lib/auth"
import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

type Props = {
    provider?: Provider
    code?: string
    state?: string
    error?: string
    uriType?: UriType
}
const Callback: NextPage<Props> = ({
    code,
    state,
    provider,
    error,
    uriType,
}) => {
    const [msg, setMsg] = React.useState(error || "Loading...")
    const [isLoggedIn, setLoggedIn] = React.useState<boolean>(false)
    const router = useRouter()
    React.useEffect(() => {
        const SocialLogin = async () => {
            if (isLoggedIn) return
            if (!code || !state || !provider) {
                if (!error) setMsg("Error: Unexpected Error")
                return
            }
            const sessionState = sessionStorage.getItem("N_ha_blog_state")
            sessionStorage.removeItem("N_ha_blog_state")
            if (state !== sessionState) {
                setMsg("Error: Missing State")
                return
            }
            const { isOk, data } = await socialLogin({
                provider,
                code,
                uriType,
            })
            console.log(data)
            if (isOk) {
                setLoggedIn(true)
                router.push("/user")
                return
            }
            setMsg("Error: Social Login")
            return
        }
        SocialLogin()
    }, [])
    return (
        <SetCenter>
            <p>{msg}</p>
            <Link href="/login">Retry to Login</Link>
        </SetCenter>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const { params, query } = ctx

    const uriType = typeof params?.uriType === "string" ? params.uriType : ""
    if (uriType !== "login" && uriType !== "connect")
        return { props: { error: "Error: UriType" } }

    const providerName =
        typeof params?.provider === "string" ? params.provider : ""
    const provider = providers.find(
        (provider) => provider.name === providerName,
    )
    if (!provider) return { props: { error: "Error: Provider" } }

    if (typeof query?.code !== "string")
        return { props: { error: "Error: Code" } }
    const code = query.code

    if (typeof query?.state !== "string")
        return { props: { error: "Error: State" } }
    const state = query.state

    return { props: { provider, code, state, uriType } }
}

export default Callback
