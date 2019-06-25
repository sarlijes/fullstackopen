const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog.toJSON())
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    // const user = await User.findById(body.userId)
    // TEMP:
    const users = await User.find({})
    const user = users[0]
    // /TEMP
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        date: new Date(),
        user: user._id
    })
    if (!blog.likes) blog.likes = 0

    if (!blog.title || blog.title.length === 0) {
        return response.status(400).send({ error: 'Title is required' })
    }
    if (!blog.url || blog.url.length === 0) {
        return response.status(400).send({ error: 'URL  is required' })
    }
    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        blog.likes = Number(blog.likes) + 1

        Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
            .then(updatedBlog => {
                response.json(updatedBlog.toJSON())
            })
            .catch(error => next(error))
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter