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
            <button type='submit'>Submit</button>
        </form>
    </div>
)

export default BlogForm