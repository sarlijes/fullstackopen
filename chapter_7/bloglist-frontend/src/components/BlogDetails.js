import React from "react"
import { Button } from "./StyledComponents"
import { useParams } from "react-router-dom"

const BlogDetails = ({ blogs, handleDeleteButtonPress, handleLike, user }) => {

    const id = useParams().id
    const blog = blogs.find(n => n.id === id)

    if (blog === undefined) {
        return (
            <div className="App"></div>
        )

    }

    const renderDeleteButton = () => (
        <Button onClick={handleDeleteButtonPress(blog.id)}>Delete</Button>
    )

    return (
        <div className="App">
            <div className="author"><a href={blog.url}>{blog.title}</a> by {blog.author}</div>
            <div>Posted by: {blog.user.name}</div>
            <div className="likes">Likes: {blog.likes}</div>
            <Button onClick={handleLike(blog.id)}>like</Button>

            {blog.user.username === user.username ?
                renderDeleteButton()
                : <></>
            }
        </div>
    )
}

export default BlogDetails