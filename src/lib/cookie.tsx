export type Cookies = {
    [key: string]: string
}

export const getCookies = (cookies: Cookies) => {
    const headerCookies = Object.entries(cookies)
        .map((cookie) => {
            const [key, value] = cookie
            return `${key}=${value}`
        })
        .join(";")
    return headerCookies
}
