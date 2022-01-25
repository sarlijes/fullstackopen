import React from "react"
import { Link } from "react-router-dom"

const SimpleBlog = ({ blog }) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle} className="blog">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
    )
}

export default SimpleBlog