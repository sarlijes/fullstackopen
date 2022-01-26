import React from "react"
import blogService from "../services/blogService"
import { Button, Input } from "./StyledComponents"
import { useParams } from "react-router-dom"
import { useField } from "../hooks"
import { addAllBlogs } from "../reducers/blogReducer"

import { useDispatch } from "react-redux"

const BlogDetails = ({ blogs, handleDeleteButtonPress, handleLike, user }) => {
    const newComment = useField("text")
    const id = useParams().id
    const blog = blogs.find(n => n.id === id)

    const dispatch = useDispatch()

    if (blog === undefined) {
        return (
            <div className="App"></div>
            // TODO redirect would add a nice touch (in case the blog was just deleted)
        )
    }

    const createNewComment = () => {
        // event.preventDefault()

        const commentObject = {
            content: newComment.value,
            blog: blog
        }
        //changeNotification("Commented")
        blogService
            .addComment(blog.id, commentObject)
            .then(data => {
                dispatch(addAllBlogs(blogs.concat(data)))
                newComment.reset("")
            })
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
            <div>
                <Input {...newComment} />
            </div>
            <Button onClick={createNewComment()}>Submit comment</Button>
        </div>
    )
}

export default BlogDetails