const blogReducer = (state = [], action) => {
    if (action.type === "ADD_BLOG") {
        state.push(action.content)
    }
    if (action.type === "ADD_ALL") {
        state = action.content
    }
    return state
}

export const addBlog = blog => {
    return {
        type: "ADD_BLOG",
        blog: blog,
    }
}

export const addAllBlogs = blogList => {
    return {
        type: "ADD_ALL",
        content: blogList,
    }
}

export default blogReducer