import { useRouter } from "next/router"
import { Button } from "./Button"
import { Provider, getProviderUrl } from "@/lib/auth"

export const SocialConnectButton = ({ provider }: { provider: Provider }) => {
    const router = useRouter()
    const handleClick = () => {
        const state = Math.random().toString(36).substring(2)
        sessionStorage.setItem("N_ha_blog_state", state)
        const connectUrl = getProviderUrl({
            provider,
            uriType: "connect",
            state,
        })
        router.push(connectUrl)
    }
    return <Button onClick={handleClick}>Connect</Button>
}
