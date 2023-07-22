import { Cookies, getCookies } from "./cookie"
import { Post, Posts, Tag, Tags } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const PAGE_SIZE = 10
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

const getHeaders = ({ cookies }: { cookies: Cookies }) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Cookie", getCookies(cookies))
    return headers
}

export type GetProps<GetUrlProps> = {
    cookies?: Cookies
    reqLoop?: boolean
} & GetUrlProps
type Get<T, GetUrlProps> = ({
    cookies,
    reqLoop,
    ...getUrlProps
}: GetProps<GetUrlProps>) => Promise<T>

export type GetListUrlProps<GetUrlProps> = {
    page?: string | number
} & GetUrlProps
type GetList<T, GetUrlProps> = Get<T, GetListUrlProps<GetUrlProps>>

export type GetDetailUrlProps<GetUrlProps> = {
    id: string | number
} & GetUrlProps
type GetDetail<T, GetUrlProps> = Get<T, GetDetailUrlProps<GetUrlProps>>

type GetUrl<GetUrlProps> = ({}: GetUrlProps) => string
type GetListUrl<GetUrlProps> = GetUrl<GetListUrlProps<GetUrlProps>>
// type GetListUrl2<GetUrlProps> = ({}: {page?:string|number} & GetUrlProps) => string
type GetDetailUrl<GetUrlProps> = GetUrl<GetDetailUrlProps<GetUrlProps>>
// type GetListUrl<GetUrlProps> = ({page, ...getListUrlProps}: GetListUrlProps<GetUrlProps>) => string
// type GetDetailUrl<GetUrlProps> = ({id, ...getDetailUrlProps}: GetDetailUrlProps<GetUrlProps>) => string

export type GetNormalUrlProps = {}
export type GetListNormalUrl = GetListUrl<GetNormalUrlProps>
export type GetDetailNormalUrl = GetDetailUrl<GetNormalUrlProps>

type GetIdUrlProps = { id: number | string }
type GetListIdUrl = GetListUrl<GetIdUrlProps>

type GetSearchUrlProps = { search: string }
type GetListSearchUrl = GetListUrl<GetSearchUrlProps>
// type GetUrl<GetUrlProps> = (getUrlProps: GetUrlProps) => string
// type GetNormalUrlProps = { page?: string | number }
// type GetIdUrlProps = { page?: number | string; id: number | string }
// type GetSearchUrlProps = { page?: number | string; search: string }

// type GetDetail<T> = ({ id }: { id: number | string }) => Promise<T>
type GetPages = () => Promise<number[]>
type GetIds = () => Promise<number[]>

type GenerateGetList = <T, Props>({
    getUrl,
}: {
    getUrl: GetListUrl<Props>
}) => GetList<T, GetListUrlProps<Props>>

export const generateGetList: GenerateGetList = <T, Props>({
    getUrl,
}: {
    getUrl: GetListUrl<Props>
}) => {
    const getList: GetList<T, Props> = async ({
        cookies = {},
        reqLoop = false,
        ...getUrlProps
    }) => {
        const headers = getHeaders({ cookies })
        const url = getUrl(getUrlProps as GetListUrlProps<Props>)
        const fetchList = async () =>
            await fetch(url, { headers, mode: "cors", credentials: "include" })
        let res = await fetchList()
        for (; reqLoop && !res.ok; await sleep(1000)) res = await fetchList()

        const list = (await res.json()) as T
        return list
    }
    return getList
}

type GenerateGetDetail = <T, Props>({
    getUrl,
}: {
    getUrl: GetDetailUrl<Props>
}) => GetDetail<T, GetDetailUrlProps<Props>>
export const generateGetDetail: GenerateGetDetail = <T, Props>({
    getUrl,
}: {
    getUrl: GetDetailUrl<GetDetailUrlProps<Props>>
}) => {
    const getDetail: GetDetail<T, GetDetailUrlProps<Props>> = async ({
        cookies = {},
        reqLoop = false,
        ...getUrlProps
    }) => {
        const headers = getHeaders({ cookies })
        const url = getUrl(getUrlProps as GetDetailUrlProps<Props>)
        const fetchList = async () =>
            await fetch(url, { headers, mode: "cors", credentials: "include" })
        let res = await fetchList()
        for (; reqLoop && !res.ok; await sleep(1000)) res = await fetchList()
        const list = (await res.json()) as T
        return list
    }
    return getDetail
}
// const generateGetNormalList = <T>(getNormalUrl: GetUrl<GetNormalUrlProps>) => {
//     const getNormalList: GetNormalList<T> = generateGetList<
//         T,
//         GetNormalUrlProps
//     >({ getUrl: getNormalUrl })
//     return getNormalList
// }
const getPostsUrl: GetListNormalUrl = ({ page = 1 }) =>
    `${API_URL}/posts/?ordering=-id&page=${page}`
export const getPosts = generateGetList<Posts, GetNormalUrlProps>({
    getUrl: getPostsUrl,
})

// export const getPosts = async ({ page = 1, cookies = {}, reqLoop = false }) => {
//     const headers = getHeaders({ cookies })
//     const fetchPosts = async () =>
//         await fetch(
//             `${API_URL}/posts/?is_visible=true&ordering=-id&page=${page}`,
//             { headers, mode: "cors", credentials: "include" },
//         )
//     let res = await fetchPosts()
//     for (; reqLoop && !res?.ok; await sleep(1000)) res = await fetchPosts()
//     const posts = (await res.json()) as Posts
//     return posts
// }

// export const getPosts = async ({
//     page = 1,
//     token,
//     csrftoken,
//     sessionid,
//     cookies,
// }: {
//     page?: number | string
//     token?: string
//     sessionid?: string
//     csrftoken?: string
//     cookies?: {
//         [key: string]: string
//     }
// }) => {
//     let res: Response | undefined = undefined
//     const headers = new Headers()
//     headers.append("Content-Type", "application/json")
//     // if (token) headers.append("Authorization", `Token ${token}`)
//     // if (sessionid) headers.append("Authorization", `SessionId ${sessionid}`)
//     if (cookies) {
//         const header_cookie = Object.entries(cookies)
//             .map((entry) => {
//                 const [key, value] = entry
//                 return `${key}=${value}`
//             })
//             .join(";")
//         headers.append("Cookie", header_cookie)
//     }

//     // for (; !res?.ok; await sleep(1000)) {
//     res = await fetch(`${API_URL}/posts/?ordering=-id&page=${page}`, {
//         headers,
//         method: "GET",
//         mode: "cors",
//         credentials: "include",
//     })
//     console.log(res)
//     // }
//     const posts = (await res.json()) as Posts
//     return posts
// }

const getTagPostsUrl: GetListIdUrl = ({ page = 1, id }) =>
    `${API_URL}/posts/?tags=${id}&ordering=-id&page=${page}`
export const getTagPosts = generateGetList<Posts, GetIdUrlProps>({
    getUrl: getTagPostsUrl,
})
// export const getTagPosts = async ({
//     id,
//     page = 1,
// }: {
//     id: number | string
//     page?: number | string
// }) => {
//     let res: Response | undefined = undefined
//     for (; !res?.ok; await sleep(1000)) {
//         res = await fetch(
//             `${API_URL}/posts/?is_visible=true&tags=${id}&ordering=-id&page=${page}`,
//         )
//     }
//     // const res = await fetch(
//     //     `${API_URL}/posts/?is_visible=true&tags=${id}&ordering=-id&page=${page}`,
//     // )
//     const posts = (await res.json()) as Posts
//     return posts
// }

const getSearchPostsUrl: GetListSearchUrl = ({ page = 1, search }) =>
    `${API_URL}/posts/?ordering=-id&search=${search}&page=${page}`
export const getSearchPosts = generateGetList<Posts, GetSearchUrlProps>({
    getUrl: getSearchPostsUrl,
})

// export const getSearchPosts = async ({
//     search = "",
//     page = 1,
// }: {
//     search?: string
//     page?: number | string
// }) => {
//     let res: Response | undefined = undefined
//     for (; !res?.ok; await sleep(1000)) {
//         res = await fetch(
//             `${API_URL}/posts/?is_visible=true&ordering=-id&search=${search}&page=${page}`,
//         )
//     }
//     // const res = await fetch(
//     //     `${API_URL}/posts/?is_visible=true&ordering=-id&search=${search}&page=${page}`,
//     // )
//     const posts = (await res.json()) as Posts
//     return posts
// }

const getTagsUrl: GetListNormalUrl = ({ page = 1 }) =>
    `${API_URL}/tags/?ordering=id&page=${page}`
export const getTags = generateGetList<Tags, GetNormalUrlProps>({
    getUrl: getTagsUrl,
})

// export const getTags = async ({ page = 1 }: { page?: number | string }) => {
//     let res: Response | undefined = undefined
//     for (; !res?.ok; await sleep(1000)) {
//         res = await fetch(`${API_URL}/tags/?ordering=id&page=${page}`)
//     }
//     // const res = await fetch(`${API_URL}/tags/?ordering=id&page=${page}`)
//     const tags = (await res.json()) as Tags
//     return tags
// }

const getPostUrl: GetDetailNormalUrl = ({ id }) => `${API_URL}/posts/${id}/`
export const getPost = generateGetDetail<Post, GetNormalUrlProps>({
    getUrl: getPostUrl,
})
// export const getPost = async ({ id }: { id: number | string }) => {
//     let res: Response | undefined = undefined
//     for (; !res?.ok; await sleep(1000)) {
//         res = await fetch(`${API_URL}/posts/${id}/`)
//     }
//     // const res = await fetch(`${API_URL}/posts/${id}/`)
//     const post = (await res.json()) as Post
//     return post
// }

const getTagUrl: GetDetailNormalUrl = ({ id }) => `${API_URL}/tags/${id}/`
export const getTag = generateGetDetail<Tag, GetNormalUrlProps>({
    getUrl: getTagUrl,
})
// export const getTag = async ({ id }: { id: number | string }) => {
//     let res: Response | undefined = undefined
//     for (; !res?.ok; await sleep(1000)) {
//         res = await fetch(`${API_URL}/tags/${id}/`)
//     }
//     // const res = await fetch(`${API_URL}/tags/${id}/`)
//     const tag = (await res.json()) as Tag
//     return tag
// }

// const generateGetListPages = <T, Props>({getList}: {getList: GetList<T, GetListUrlProps<Props>>}) => {
//     const getListPages = async ({getListProps}: {getListProps: GetProps<GetListUrlProps<Props>>}) => {
//         const list = await getList(getListProps)
//         const listPages = [...Array(list.num_page)].map((_, i) => i + 1)
//     }
// }

export const getPostsPages = async ({ reqLoop }: { reqLoop?: boolean }) => {
    const posts = await getPosts({ reqLoop })
    // const postsNumPages = posts.num_pages
    const postsPages = [...Array(posts.num_pages)].map((_, i) => i + 1)
    // const postsCount = Math.ceil(posts.count / PAGE_SIZE)
    // const postsPages = [...Array(postsCount)].map((_, i) => i + 1)
    // console.log(`getPostsIds => ${postsIds}`)
    return postsPages
}
export const getTagPostsPages = async ({
    id,
    reqLoop = false,
}: {
    id: number | string
    reqLoop?: boolean
}) => {
    const posts = await getTagPosts({ id })
    const postsPages = [...Array(posts.num_pages)].map((_, i) => i + 1)
    return postsPages
}
export const getTagsPages = async () => {
    const tags = await getTags({})
    const tagsPages = [...Array(tags.num_pages)].map((_, i) => i + 1)
    return tagsPages
}
export const getPostsTagPages = async ({ id = 1 }: { id: number | string }) => {
    const posts = await getTagPosts({ id })
    const postsCount = Math.ceil(posts.count / PAGE_SIZE)
    const postsPages = [...Array(postsCount)].map((_, i) => i + 1)
    // console.log(`getPostsIds => ${postsIds}`)
    return postsPages
}

export const getPostIds = async ({ reqLoop }: { reqLoop?: boolean }) => {
    const postsPages = await getPostsPages({ reqLoop })
    const result = await Promise.all(
        postsPages.map(async (page) => {
            const posts = await getPosts({ page })
            return posts.results.map((post) => post.id)
        }),
    )
    const postIds = result.flat()
    // console.log(`getPostIds => ${postIds}`)
    return postIds
}

export const getTagIds = async ({ reqLoop = false }: { reqLoop?: boolean }) => {
    const tagsPages = await getTagsPages()
    const result = await Promise.all(
        tagsPages.map(async (page) => {
            const tags = await getTags({ page, reqLoop })
            return tags.results.map((tag) => tag.id)
        }),
    )
    const tagIds = result.flat()
    return tagIds
}
