const bcrypt = require('bcrypt')
const commentsRouter = require('express').Router()
const Blog = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('blog', { title: 1, date: 1 })

    response.json(blogs.map(u => u.toJSON()))
})

commentsRouter.post('/', async (request, response, next) => {

    try {
        const body = request.body
        if (body.content === undefined) {
            return response.status(400).json({ error: 'content missing' })
        }
        if (body.blog === undefined) {
            return response.status(400).json({ error: 'blog missing' })
        }
        const comment = new Comment({
            content: body.content,
            blog: body.blog
        })

        const savedBlog = await comment.save()

        response.json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = commentsRouter