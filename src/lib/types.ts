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

export type User = {
    id: number
    username: string
    email?: string
    is_active: boolean
    is_staff: boolean
}
