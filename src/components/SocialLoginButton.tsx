import { useRouter } from "next/router"
import { Button } from "./Button"
import { Provider, getProviderUrl } from "@/lib/auth"

export const SocialLoginButton = ({ provider }: { provider: Provider }) => {
    const router = useRouter()
    const handleClick = () => {
        const state = Math.random().toString(36).substring(2)
        sessionStorage.setItem("N_ha_blog_state", state)
        const loginUrl = getProviderUrl({ provider, uriType: "login", state })
        router.push(loginUrl)
    }
    return <Button onClick={handleClick}>{provider.displayName} Login</Button>
}
