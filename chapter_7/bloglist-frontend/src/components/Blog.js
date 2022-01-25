import React from "react"
import { Button } from "./StyledComponents"

const Blog = ({ blog, handleDeleteButtonPress, handleSelectBlogChange, handleLike, user }) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    const renderDetails = () => (
        <>
            <div>Posted by: {blog.user.name}</div>
            <div className="likes">Likes: {blog.likes}</div>
            <Button onClick={handleLike(blog)}>like</Button>
        </>
    )
    const renderShowInfoButton = () => (
        <Button onClick={handleSelectBlogChange}>Show more info</Button>
    )
    const renderDeleteButton = () => (
        <Button onClick={handleDeleteButtonPress(blog.id)}>Delete</Button>
    )

    return (
        <div style={blogStyle} className="blog">

            <div className="author"><a href={blog.url}>{blog.title}</a> by {blog.author}</div>

            {blog.showDetails === true ?
                renderDetails() :
                renderShowInfoButton()
            }
            {blog.user.username === user.username ?
                renderDeleteButton()
                : <></>
            }
        </div>
    )
}

export default Blog