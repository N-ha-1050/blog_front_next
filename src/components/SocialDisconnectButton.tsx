import { useRouter } from "next/router"
import { Button } from "./Button"
import { Account, socialDisconnect } from "@/lib/auth"

export const SocialDisconnectButton = ({ account }: { account: Account }) => {
    const router = useRouter()
    const handleClick = async () => {
        const { isOk, data } = await socialDisconnect({ account })
        if (isOk) router.push("/user")
    }
    return (
        <Button fill onClick={handleClick}>
            Disconnect
        </Button>
    )
}
