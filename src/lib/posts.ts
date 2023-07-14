const API_URL = process.env.NEXT_PUBLIC_API_URL

// const API_URL = "http://127.0.0.1:8000"
// const API_URL = "https://api.blog.n-ha.cf"
const PAGE_SIZE = 10
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

export type Tag = {
    id: number
    url: string
    name: string
}
export type Tags = {
    count: number
    page: number
    has_next: boolean
    has_previous: boolean
    num_pages: number
    results: Tag[]
}
export type Post = {
    id: number
    url: string
    title: string
    content: string
    is_visible: boolean
    created_at: string
    updated_at: string
    tags: Tag[]
}

export type Posts = {
    count: number
    page: number
    has_next: boolean
    has_previous: boolean
    num_pages: number
    results: Post[]
}

export const getPosts = async ({ page = 1 }: { page?: number | string }) => {
    let res: Response | undefined = undefined
    for (; !res?.ok; await sleep(1000)) {
        res = await fetch(
            `${API_URL}/posts/?is_visible=true&ordering=-id&page=${page}`,
        )
    }
    // const res = await fetch(
    //     `${API_URL}/posts/?is_visible=true&ordering=-id&page=${page}`,
    // )
    const posts = (await res.json()) as Posts
    return posts
}
export const getTagPosts = async ({
    id,
    page = 1,
}: {
    id: number | string
    page?: number | string
}) => {
    let res: Response | undefined = undefined
    for (; !res?.ok; await sleep(1000)) {
        res = await fetch(
            `${API_URL}/posts/?is_visible=true&tags=${id}&ordering=-id&page=${page}`,
        )
    }
    // const res = await fetch(
    //     `${API_URL}/posts/?is_visible=true&tags=${id}&ordering=-id&page=${page}`,
    // )
    const posts = (await res.json()) as Posts
    return posts
}

export const getSearchPosts = async ({
    search = "",
    page = 1,
}: {
    search?: string
    page?: number | string
}) => {
    let res: Response | undefined = undefined
    for (; !res?.ok; await sleep(1000)) {
        res = await fetch(
            `${API_URL}/posts/?is_visible=true&ordering=-id&search=${search}&page=${page}`,
        )
    }
    // const res = await fetch(
    //     `${API_URL}/posts/?is_visible=true&ordering=-id&search=${search}&page=${page}`,
    // )
    const posts = (await res.json()) as Posts
    return posts
}

export const getTags = async ({ page = 1 }: { page?: number | string }) => {
    let res: Response | undefined = undefined
    for (; !res?.ok; await sleep(1000)) {
        res = await fetch(`${API_URL}/tags/?ordering=id&page=${page}`)
    }
    // const res = await fetch(`${API_URL}/tags/?ordering=id&page=${page}`)
    const tags = (await res.json()) as Tags
    return tags
}

export const getPost = async ({ id }: { id: number | string }) => {
    let res: Response | undefined = undefined
    for (; !res?.ok; await sleep(1000)) {
        res = await fetch(`${API_URL}/posts/${id}/`)
    }
    // const res = await fetch(`${API_URL}/posts/${id}/`)
    const post = (await res.json()) as Post
    return post
}

export const getTag = async ({ id }: { id: number | string }) => {
    let res: Response | undefined = undefined
    for (; !res?.ok; await sleep(1000)) {
        res = await fetch(`${API_URL}/tags/${id}/`)
    }
    // const res = await fetch(`${API_URL}/tags/${id}/`)
    const tag = (await res.json()) as Tag
    return tag
}

export const getPostsPages = async () => {
    const posts = await getPosts({})
    // const postsNumPages = posts.num_pages
    const postsPages = [...Array(posts.num_pages)].map((_, i) => i + 1)
    // const postsCount = Math.ceil(posts.count / PAGE_SIZE)
    // const postsPages = [...Array(postsCount)].map((_, i) => i + 1)
    // console.log(`getPostsIds => ${postsIds}`)
    return postsPages
}
export const getTagPostsPages = async ({ id }: { id: number | string }) => {
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

export const getPostIds = async () => {
    const postsPages = await getPostsPages()
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

export const getTagIds = async () => {
    const tagsPages = await getTagsPages()
    const result = await Promise.all(
        tagsPages.map(async (page) => {
            const tags = await getTags({ page })
            return tags.results.map((tag) => tag.id)
        }),
    )
    const tagIds = result.flat()
    return tagIds
}
