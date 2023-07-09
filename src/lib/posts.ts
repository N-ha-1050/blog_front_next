const API_URL = "http://127.0.0.1:8000"
// const API_URL = "https://api.blog.n-ha.cf"
const PAGE_SIZE = 10

export type Tag = {
    id: number
    url: string
    name: string
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
    // contentHtml?: string
}

export type Posts = {
    count: number
    page: number
    has_next: boolean
    has_previous: boolean
    num_pages: number
    results: Post[]
}

export const getPosts = async ({ id = 1 }: { id?: number | string }) => {
    const res = await fetch(
        `${API_URL}/posts/?is_visible=true&ordering=-id&page=${id}`,
    )
    const posts = (await res.json()) as Posts
    return posts
}

export const getPost = async ({ id }: { id: number | string }) => {
    const res = await fetch(`${API_URL}/posts/${id}/`)
    const post = (await res.json()) as Post
    return post
}

export const getPostsIds = async () => {
    const posts = await getPosts({})
    const postsCount = Math.ceil(posts.count / PAGE_SIZE)
    const postsIds = [...Array(postsCount)].map((_, i) => i + 1)
    // console.log(`getPostsIds => ${postsIds}`)
    return postsIds
}

export const getPostIds = async () => {
    const postsIds = await getPostsIds()
    const result = await Promise.all(
        postsIds.map(async (id) => {
            const posts = await getPosts({ id })
            return posts.results.map((post) => post.id)
        }),
    )
    const postIds = result.flat()
    // console.log(`getPostIds => ${postIds}`)
    return postIds
}
