import React, { useState, useEffect } from "react"
import "./App.css"
import blogService from "./services/blogService"
import loginService from "./services/loginService"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import Bloglist from "./components/Bloglist"
import Notification from "./components/Notification"
import Users from "./components/Users"
import { useField } from "./hooks/index"
import { addAllBlogs } from "./reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "./reducers/userReducer"

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"


const App = () => {
    const [selectedBlog, setSelectedBlog] = useState(null)

    const newAuthor = useField("text")
    const newTitle = useField("text")
    const newUrl = useField("text")

    const username = useField("text")
    const password = useField("password")

    const dispatch = useDispatch()

    const changeNotification = (message) => {
        dispatch({
            type: "NEW_NOTIFICATION",
            content: message,
        })
        // TODO refactor the dispatched objects to notificationReducer.js
        setTimeout(() => {
            dispatch({
                type: "EMPTY_NOTIFICATION",
                content: message,
            })
        }, 3000)
    }

    useEffect(() => {
        blogService
            .getAll()
            .then(blogsFromDatabase => {
                dispatch(addAllBlogs(blogsFromDatabase))
            })
    }, [dispatch])

    const blogs = useSelector(state =>
        state.blogs.sort((a, b) =>
            a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1))

    const user = useSelector(state => state.user)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(login(user))
            blogService.setToken(user.token)
        }
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()

        const credentials = {
            username: username.value,
            password: password.value
        }

        try {
            const user = await loginService.login(credentials)
            window.localStorage.setItem(
                "loggedBlogAppUser", JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(login(user))
            username.reset("")
            password.reset("")
        } catch (exception) {
            changeNotification("Wrong username or password")
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        blogService.removeToken()
        dispatch(logout())
    }

    const handleDeleteButtonPress = (id) => async () => {
        const blogToBeDeleted = blogs.find(b => b.id === id)
        const allOtherBlogs = blogs.filter(b => b.id !== blogToBeDeleted.id)
        try {
            blogService
                .deleteBlog(blogToBeDeleted.id)
            dispatch(addAllBlogs(allOtherBlogs))
            changeNotification(`Deleted ${blogToBeDeleted.title}`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSelectBlogChange = id => {
        const blogToBeSelected = blogs.find(b => b.id === id)
        setSelectedBlog(blogToBeSelected)
        blogToBeSelected.showDetails = true
        blogs.filter(b => b.id !== id).map(blog => blog.showDetails = false)
    }

    const handleLike = (id) => async () => {
        const blogToBeLiked = blogs.find(b => b.id === id)
        const allOtherBlogs = blogs.filter(b => b.id !== blogToBeLiked.id)
        try {
            const updatedBlog = await blogService.update(blogToBeLiked.id, {
                author: blogToBeLiked.author,
                title: blogToBeLiked.title,
                likes: blogToBeLiked.likes + 1,
                url: blogToBeLiked.url,
                user: blogToBeLiked.user._id
            })
            dispatch(addAllBlogs(allOtherBlogs.concat(updatedBlog)))
            changeNotification(`You have liked ${blogToBeLiked.title}`)
        } catch (err) {
            console.log(err)
        }
    }

    const createNewBlogPost = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newTitle.value,
            author: newAuthor.value,
            url: newUrl.value,
            user: user
        }
        changeNotification("Added " + newTitle.value + " by " + newAuthor.value)
        blogService
            .create(blogObject)
            .then(data => {
                dispatch(addAllBlogs(blogs.concat(data)))
                newAuthor.reset("")
                newTitle.reset("")
                newUrl.reset("")
            })
    }

    const renderLogin = () => (
        <div className="App">
            <header className="App-header">
                <h1>Blog post app</h1>
            </header>
            <div className="App-body">
                <h2>Log in to application</h2>
                <div><Notification/></div>
                <LoginForm className="loginform"
                    username={skipReset(username)}
                    password={skipReset(password)}
                    handleLogin={handleLogin}
                />
            </div>
        </div>
    )
    const blogFormRef = React.createRef()

    const skipReset = (hook) => {
        // eslint-disable-next-line no-unused-vars
        let { reset, ...hookWithoutAnyReset } = hook
        return hookWithoutAnyReset
    }

    const padding = {
        padding: 5
    }

    const Blogs = () => (
        <div className="App">
            <div className="App-body">
                <div>
                    <p>{user.name} logged in</p>
                    <div><button onClick={handleLogout}>Log out</button></div>
                    <div></div>
                    <Notification />
                    <Togglable buttonLabel='new blog' ref={blogFormRef} >
                        {/* <Togglable buttonLabel='add new blog' ref={BlogForm} > */}
                        <h4>Add new blog post</h4>
                        <BlogForm
                            createNewBlogPost={createNewBlogPost}
                            newAuthor={skipReset(newAuthor)}
                            newTitle={skipReset(newTitle)}
                            newUrl={skipReset(newUrl)}
                        // newAuthor={newAuthor}
                        // newTitle={newTitle}
                        // newUrl={newUrl}
                        />
                    </Togglable>
                </div>
                <Bloglist blogs={blogs}
                    handleDeleteButtonPress={handleDeleteButtonPress}
                    selectedBlog={selectedBlog} setSelectedBlog={setSelectedBlog}
                    handleSelectBlogChange={handleSelectBlogChange}
                    handleLike={handleLike}
                    user={user}
                />
            </div>
        </div>
    )

    return (
        <div>
            {user === null ? renderLogin() :
                <Router>
                    <div>
                        <Link style={padding} to="/">blogs</Link>
                        <Link style={padding} to="/users">users</Link>
                    </div>

                    <Switch>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/">
                            <Blogs />
                        </Route>
                    </Switch>

                    <div>
                        <i>Note app, Department of Computer Science 2021</i>
                    </div>
                </Router>}
        </div>
    )
}
export default App