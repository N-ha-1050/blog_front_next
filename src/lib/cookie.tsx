export type Cookies = {
    [key: string]: string
}

export const getCookies = (cookies: Cookies) => {
    const headerCookies = Object.entries(cookies)
        .map((entry) => {
            const [key, value] = entry
            return `${key}=${value}`
        })
        .join(";")
    return headerCookies
}
