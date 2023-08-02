import { Cookies, getCookies } from "./cookie"
import {
    GetListNormalUrl,
    GetNormalUrlProps,
    GetProps,
    generateGetList,
    generateGetListPages,
} from "./posts"
import { User } from "./types"

const API_AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL
const FRONT_ORIGIN = process.env.NEXT_PUBLIC_FRONT_ORIGIN

export type Provider = {
    name: string
    displayName: string
    authorizationUrl: string
    clientId?: string
    scope?: string[]
    extraParams?: { [key in string]: string }
}
export const providers: Provider[] = [
    {
        name: "google",
        displayName: "Google",
        authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: ["profile", "email"],
        extraParams: { access_type: "offline" },
    },
    // {
    //     name: "github",
    //     displayName: "GitHub",
    //     authorizationUrl: "https://github.com/login/oauth/authorize",
    //     clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    // },
    {
        name: "discord",
        displayName: "Discord",
        authorizationUrl: "https://discord.com/oauth2/authorize",
        clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
        scope: ["email", "identify"],
    },
]

export type UriType = "login" | "connect"
type GetProviderUrl = {
    provider: Provider
    uriType: UriType
    state?: string
}
export const getUriTypeInfo = (uriType: UriType) => {
    switch (uriType) {
        case "login":
            return { pageName: "Login", link: "/login" }
        case "connect":
            return { pageName: "Connect", link: "/social-accounts" }
    }
}
export const getProviderUrl = ({
    provider,
    uriType,
    state = "",
}: GetProviderUrl) => {
    const clientId = provider.clientId || ""
    const scope = provider.scope || []
    const responseType = "code"
    const redirectUri = `${FRONT_ORIGIN}/accounts/${provider.name}/${uriType}/callback/`
    const queryParams = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: scope.join(" "),
        response_type: responseType,
        state,
        ...provider.extraParams,
    })
    return `${provider.authorizationUrl}?${queryParams.toString()}`
}

const getSocialLoginUrl = ({
    uriType,
    provider,
}: {
    uriType: UriType
    provider: Provider
}) => {
    switch (uriType) {
        case "login": {
            return `${API_AUTH_URL}/${provider.name}/`
        }
        case "connect": {
            return `${API_AUTH_URL}/${provider.name}/connect/`
        }
    }
}

export const socialLogin = async ({
    provider,
    code,
    uriType = "login",
}: {
    provider: Provider
    code: string
    uriType?: UriType
}) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const url = getSocialLoginUrl({ uriType, provider })
    const res = await fetch(url, {
        headers,
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({ code }),
    })
    try {
        const data = await res.json()
        return { isOk: res.ok, data }
    } catch (e) {
        return { isOk: false, data: { message: `${e}` } }
    }
}

export const login = async ({
    username,
    password,
}: {
    username: string
    password: string
}) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const res = await fetch(`${API_AUTH_URL}/login/`, {
        headers,
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({ username, password }),
    })
    try {
        const data = await res.json()
        return { isOk: res.ok, data }
    } catch (e) {
        return { isOk: false, data: { message: `${e}` } }
    }
}

export const logout = async () => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const res = await fetch(`${API_AUTH_URL}/logout/`, {
        headers,
        method: "POST",
        mode: "cors",
        credentials: "include",
    })
    return res.ok
}

export const changeUsername = async ({ username }: { username: string }) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const res = await fetch(`${API_AUTH_URL}/user/`, {
        headers,
        method: "PUT",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({ username }),
    })
    try {
        const data = await res.json()
        return { isOk: res.ok, data }
    } catch (e) {
        return { isOk: false, data: { message: `${e}` } }
    }
}

export const changePassword = async ({
    newPassword1,
    newPassword2,
}: {
    newPassword1: string
    newPassword2: string
}) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const res = await fetch(`${API_AUTH_URL}/password/change/`, {
        headers,
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
            new_password1: newPassword1,
            new_password2: newPassword2,
        }),
    })
    try {
        const data = await res.json()
        return { isOk: res.ok, data }
    } catch (e) {
        return { isOk: false, data: { message: `${e}` } }
    }
}

export const deleteUser = async () => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const res = await fetch(`${API_AUTH_URL}/user/`, {
        headers,
        method: "PATCH",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
            is_active: false,
        }),
    })
    // if (res.ok) {
    //     const isOk = await logout()
    //     return isOk
    // }
    return res.ok
}

export const socialDisconnect = async ({ account }: { account: Account }) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const res = await fetch(
        `${API_AUTH_URL}/socialaccounts/${account.id}/disconnect/`,
        {
            headers,
            method: "POST",
            mode: "cors",
            credentials: "include",
        },
    )
    try {
        const data = await res.json()
        return { isOk: res.ok, data }
    } catch (e) {
        return { isOk: false, data: { message: `${e}` } }
    }
}

export const getUser = async ({ cookies }: { cookies?: Cookies }) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    if (cookies) headers.append("Cookie", getCookies(cookies || {}))
    const res = await fetch(`${API_AUTH_URL}/user/`, {
        headers,
        mode: "cors",
        credentials: "include",
    })
    if (res.ok) {
        const user = (await res.json()) as User
        // console.log(user)
        return user
    }
    return null
}

export type Account = {
    id: number
    provider: string
    uid: string
    last_login: string
    date_joined: string
}
export type Accounts = {
    id: number
    page: number
    has_next: boolean
    has_previous: boolean
    num_pages: number
    results: Account[]
}
const getAccountsUrl: GetListNormalUrl = ({ page = 1 }) =>
    `${API_AUTH_URL}/socialaccounts/?page=${page}`

const getAccounts = generateGetList<Accounts, GetNormalUrlProps>({
    getUrl: getAccountsUrl,
})

const getAccountsPages = generateGetListPages<Accounts, GetNormalUrlProps>({
    getList: getAccounts,
})

// const getAccountsPages2 = async (props: GetProps<GetNormalUrlProps>) => {
//     const accounts = await getAccounts(props)
//     const postsPages = [...Array(accounts.num_pages)].map((_, i) => i + 1)
//     return postsPages
// }

export const getAllAccount = async (props: GetProps<GetNormalUrlProps>) => {
    const accountsPages = await getAccountsPages(props)
    const result = await Promise.all(
        accountsPages.map(async (page) => {
            const accounts = await getAccounts({ page, ...props })
            return accounts.results
        }),
    )
    const allAccount = result.flat()
    return allAccount
}
