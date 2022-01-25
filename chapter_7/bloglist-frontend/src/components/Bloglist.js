import React from "react"
import SimpleBlog from "./SimpleBlog"

const Bloglist = ({ blogs }) => {
    return (
        <>{blogs
            .map(blog =>
                <SimpleBlog key={blog.id}
                    blog={blog} />)}</>
    )
}
export default Bloglist