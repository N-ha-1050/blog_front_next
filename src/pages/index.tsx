import { SetCenter } from "@/components/SetCenter"
import { SocialLink, SocialLinkProps } from "@/components/SocialLink"
import { NextPage } from "next"

const socialLinks: SocialLinkProps[] = [
    { url: "https://github.com/N-ha-1050", displayName: "GitHub" },
    { url: "https://twitter.com/N_ha_1050", displayName: "Twitter" },
    { url: "https://atcoder.jp/users/N_ha_1050", displayName: "AtCoder" },
]

const Home: NextPage = () => {
    return (
        <SetCenter>
            <h1 className="text-4xl font-bold mb-4">N_ha</h1>
            <p className="mb-4">Hello, World!</p>
            <ul className="flex gap-4">
                {socialLinks.map((socialLink) => (
                    <SocialLink key={socialLink.displayName} {...socialLink} />
                ))}
            </ul>
        </SetCenter>
    )
}
export default Home
