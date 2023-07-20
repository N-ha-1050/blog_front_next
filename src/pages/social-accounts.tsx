import { SetCenter } from "@/components/SetCenter"
import { SocialConnectButton } from "@/components/SocialConnectButton"
import { SocialDisconnectButton } from "@/components/SocialDisconnectButton"
import { Title } from "@/components/Title"
import {
    Account,
    Provider,
    getAllAccount,
    getUser,
    providers,
} from "@/lib/auth"
import { GetServerSideProps, NextPage } from "next"
import nookies from "nookies"

type Props = {
    providersAndAccounts: {
        provider: Provider
        account: Account | null
    }[]
}

const SocialAccounts: NextPage<Props> = ({ providersAndAccounts }) => {
    return (
        <SetCenter>
            <Title>Social Accounts</Title>
            <div className="grid gap-4">
                {providersAndAccounts.map((providersAndAccount) => (
                    <div
                        key={providersAndAccount.provider.name}
                        className="grid grid-cols-3 gap-2 justify-items-stretch items-center border-b-2 border-blue-200 pb-2"
                    >
                        <h2 className="text-xl">
                            {providersAndAccount.provider.displayName}
                        </h2>
                        <p className="text-blue-600 font-bold self-end justify-self-start">
                            {providersAndAccount.account
                                ? "Connected"
                                : "Unconnected"}
                        </p>
                        {providersAndAccount.account ? (
                            <SocialDisconnectButton
                                account={providersAndAccount.account}
                            />
                        ) : (
                            <SocialConnectButton
                                provider={providersAndAccount.provider}
                            />
                        )}
                    </div>
                ))}
            </div>
        </SetCenter>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const cookies = nookies.get(ctx)
    const user = await getUser({ cookies })
    if (!user) return { redirect: { permanent: false, destination: "/login" } }
    const allAccount = await getAllAccount({ cookies })
    const providersAndAccounts = providers.map((provider) => {
        const account = allAccount.find(
            (account) => account?.provider === provider.name,
        )
        return {
            provider,
            account: account || null,
        }
    })
    // console.log(providersAndAccounts)
    return {
        props: {
            providersAndAccounts,
        },
    }
}

export default SocialAccounts
