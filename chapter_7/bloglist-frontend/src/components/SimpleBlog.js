import React from "react"

const SimpleBlog = ({ blog, onClick }) => (
    <div>
        <div className="blog">
            <span className="author">{blog.author}</span>
            <span className="title">{blog.title}</span>
        </div>
        <div>
            this blog has <span className="likes">{blog.likes}</span> likes
            <button onClick={onClick}>like</button>
        </div>
    </div>
)

export default SimpleBlog