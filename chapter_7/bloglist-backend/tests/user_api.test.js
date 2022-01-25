// Run all tests: npm run test
// Run only this test: npx jest tests/user_api.test.js --runInBand

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const api = supertest(app)

test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingUserId()

    await api
        .get(`/api/users/${validNonexistingId}`)
        .expect(404)
})

beforeEach(async () => {
    await User.deleteMany({})

    let userObject = new User(helper.initialUsers[0])
    await userObject.save()

    userObject = new User(helper.initialUsers[1])
    await userObject.save()
})

describe('When there are 2 initial users', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('the two initial users are returned', async () => {
        const response = await api.get('/api/users')
        expect(response.body.length).toBe(helper.initialUsers.length)
    })
    test('a specific blog user is within the returned data', async () => {
        const response = await api.get('/api/users')
        const names = response.body.map(u => u.name)
        expect(names).toContain('Saba Peterson')
    })
})
describe('User info is validated', () => {
    test('User with the right input is created', async () => {
        await api
            .post('/api/users')
            .send({ username: 'darron', name: 'Darron Peterson', password: '123456' })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('Password is required, response is 400 Bad request', async () => {
        await api
            .post('/api/users')
            .send({ username: 'darron', name: 'Darron Peterson' })
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(helper.initialUsers.length)
    })
    test('Password minimum length is 3, response is 400 Bad request', async () => {
        await api
            .post('/api/users')
            .send({ username: 'darron', name: 'Darron Peterson', password: '12' })
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(helper.initialUsers.length)
    })
    test('Username minimum length is 3, response is 400 Bad request', async () => {
        await api
            .post('/api/users')
            .send({ username: 'dn', name: 'Darron Peterson', password: '123456' })
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})
afterAll(() => {
    mongoose.connection.close()
})

