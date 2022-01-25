import React from "react"
import { Button, Input } from "./StyledComponents"

const BlogForm = ({ newTitle, newAuthor, newUrl, createNewBlogPost }) => (
    <div>
        <form onSubmit={createNewBlogPost}>
            <div><label>Title: </label>
                <Input {...newTitle} />
            </div>
            <div><label>Author:</label>
                <Input {...newAuthor} />
            </div>
            <div><label>URL: </label>
                <Input {...newUrl} />
            </div>
            <Button type='submit'>Submit</Button>
        </form>
    </div>
)

export default BlogForm