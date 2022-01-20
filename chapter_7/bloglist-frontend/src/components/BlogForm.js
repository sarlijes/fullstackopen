import React from "react"

const BlogForm = ({ newTitle, newAuthor, newUrl, createNewBlogPost }) => (
    <div>
        <form onSubmit={createNewBlogPost}>
            <div><label>Title: </label>
                <input {...newTitle} />
            </div>
            <div><label>Author:</label>
                <input {...newAuthor} />
            </div>
            <div><label>URL: </label>
                <input {...newUrl} />
            </div>
            <div><small>please include the http:// in the URL</small></div>
            <button type='submit'>Confirm</button>
        </form>
    </div>
)

export default BlogForm