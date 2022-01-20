// Run all tests: npm run test
// Run only this test: npx jest tests/blog_api.test.js --runInBand

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

describe('When there are 2 initial blogs', () => {
    test('blog posts are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('the two initial blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('a specific blog post is within the returned data', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)
        expect(contents).toContain('React patterns')
    })

    test('the first blog post is about React patterns ', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].title).toBe('React patterns')
    })

    test('the blog post object has an id defined (instead if an "__id")', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.id).toBeDefined
    })
})
describe('When adding blog posts', () => {
    test('adding one blog post increases the amount of posts', async () => {
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: "Jane Doe",
            url: "https://not.here",
            likes: 73,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(blog => blog.title)
        expect(response.body.length).toBe(helper.initialBlogs.length + 1)
        expect(titles).toContain('async/await simplifies making async calls')
    })

    test('when adding one blog post without likes, the likes count is set to 0', async () => {
        const newBlog =
        {
            title: 'Use describing blocks to ensure test result clarity',
            author: "Jane Doe",
            url: "https://www.fi"
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.likes).toBe(0)
            })
    })

    describe('When post request body has invalid data', () => {
        test('when adding one blog post without url, response is 400 Bad request', async () => {
            const newBlog =
            {
                title: 'Let us write a few more tests',
                author: "Jane Doe",
            }
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        test('when adding one blog post without title, response is 400 Bad request', async () => {
            const newBlog =
            {
                author: "Jane Doe",
                url: "https://www.fi"
            }
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
    })

})

describe('when removing a post', () => {
    test('can remove blog post with certain id', async () => {

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

})
describe('When increasing the like count of a post', () => {

    test('can increase the like count of a blog post with certain id', async () => {

        const blogsAtStart = await helper.blogsInDb()
        const blogToLike = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToLike.id}`)

        const blogsAfterUpdate = await helper.blogsInDb()
        const updatedBlog = blogsAfterUpdate[0]

        expect(updatedBlog.likes).toBe(blogToLike.likes + 1)
    })

})

afterAll(() => {
    mongoose.connection.close()
})