const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
        .populate('comments')
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

blogsRouter.post('/:id/comments', async (request, response, next) => {
    try {
        const body = request.body
        if (body.content === undefined) {
            return response.status(400).json({ error: 'content missing' })
        }
        if (body.blog === undefined) {
            return response.status(400).json({ error: 'blog missing' })
        }

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const blog = await Blog.findById(request.params.id)

        const comment = new Comment({
            content: body.content,
            date: new Date(),
            blog: blog._id
        })

        const savedComment = await comment.save()
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()

        response.json(blog.toJSON)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

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
        const blog = await Blog.findById(request.params.id)
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        if (decodedToken.id !== blog.user.toString()) {
            return response.status(401).json({ error: 'deleting this post is not authorized' })
        }
        await blog.delete()
        response.sendStatus(204)
    }
    catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const blog = await Blog
            .findById(request.params.id)
            .populate('comments')
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