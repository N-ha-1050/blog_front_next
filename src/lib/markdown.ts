import { load } from "js-yaml"
import { Post } from "./types"

const getMdfromPost = ({
    post,
    yaml = false,
    toc = true,
}: {
    post: Post
    yaml: boolean
    toc: boolean
}) => {
    return `${
        yaml &&
        `---
        title: ${post.title}
        is_visible: ${post.is_visible}
        tags: ${post.tags.map((tag) => tag.name)}
        ---
        
        `
    }${
        toc &&
        `[toc]
        
        `
    }${post.content}`
}

const getPostfromMd = ({ md }: { md: string }) => {
    if (md.startsWith("---")) {
        const yamls = md.match("----*.*----*")
        if (yamls) {
            const yaml = yamls[0]
        }
    }
}
