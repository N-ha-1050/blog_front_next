import { SetCenter } from "@/components/SetCenter"
import { providers, socialLogin } from "@/lib/auth"
import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import React from "react"
import nookies from "nookies"

type Props = {
    error: string
}
const Callback: NextPage<Props> = ({ error }) => {
    return (
        <SetCenter>
            <p>{error}</p>
            <Link href="/login">Retry to Login</Link>
        </SetCenter>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const cookies = nookies.get(ctx)
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

    const code = typeof query?.code === "string" ? query.code : ""
    const state = typeof query?.state === "string" ? query.state : ""

    if (!("N_ha_blog_state" in cookies))
        return { props: { error: "Error: Cookie" } }

    if (cookies["N_ha_blog_state"] !== state)
        return { props: { error: "Error: State" } }

    const { isOk, data } = await socialLogin({ provider, code })
    console.log(data)
    if (isOk) return { redirect: { permanent: false, destination: "/user" } }
    return { props: { error: "Error: Social Login" } }
}

export default Callback
