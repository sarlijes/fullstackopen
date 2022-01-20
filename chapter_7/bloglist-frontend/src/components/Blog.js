import React from "react"

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
            <button onClick={handleLike(blog)}>like</button>
        </>
    )
    const renderShowInfoButton = () => (
        <button onClick={handleSelectBlogChange}>Show more info</button>
    )
    const renderDeleteButton = () => (
        <button onClick={handleDeleteButtonPress(blog.id)}>Delete</button>
    )

    return (
        <div style={blogStyle} className="blog">

            <div className="author">{blog.author}</div>
            <div className="title"><a href={blog.url}>{blog.title}</a></div>

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