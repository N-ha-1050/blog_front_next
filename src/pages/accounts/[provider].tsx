import { SetCenter } from "@/components/SetCenter"
import { providers, socialLogin } from "@/lib/auth"
import { GetServerSideProps, NextPage } from "next"

type Props = {
    error?: string
}
const LoginCallback: NextPage<Props> = ({ error }) => {
    return <SetCenter>{error}</SetCenter>
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const { params, query } = ctx
    const providerName =
        typeof params?.provider === "string" ? params.provider : ""
    const provider = providers.find(
        (provider) => provider.name === providerName,
    )
    if (!provider) return { props: { error: "Error" } }
    const code = typeof query?.code === "string" ? query.code : ""
    const { isOk, data } = await socialLogin({ provider, code })
    if (isOk) return { redirect: { permanent: false, destination: "/user" } }
    return { props: { error: "Error" } }
}

export default LoginCallback
