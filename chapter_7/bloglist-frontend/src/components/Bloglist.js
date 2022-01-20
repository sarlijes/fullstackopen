import React from "react"
import Blog from "./Blog"

const Bloglist = ({ blogs, handleDeleteButtonPress, handleSelectBlogChange, handleLike, user }) => {
    return (
        <>{blogs
            .sort((b1, b2) => b2.likes - b1.likes)
            .map(blog =>
                <Blog key={blog.id}
                    blog={blog}
                    handleDeleteButtonPress={() => handleDeleteButtonPress(blog.id)}
                    handleSelectBlogChange={() => handleSelectBlogChange(blog.id)}
                    handleLike={() => handleLike(blog.id)}
                    user={user} />)}</>
    )
}
export default Bloglist