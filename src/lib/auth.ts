import { Cookies, getCookies } from "./cookie"
import { User } from "./types"

const API_AUTH_URL = "http://127.0.0.1:8000/dj-rest-auth"

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
        console.log(user)
        return user
    }
    return null
}
