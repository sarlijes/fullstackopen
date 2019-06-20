const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const listWithSixBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

test('dummy returns one', () => {
    const dummyBlogs = []
    const result = listHelper.dummy(dummyBlogs)
    expect(result).toBe(1)
})

test('count returns 5', () => {
    const result = listHelper.count(listWithSixBlogs)
    expect(result).toBe(6)
})

describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    test('likes count of many is calculated right', () => {
        const result = listHelper.totalLikes(listWithSixBlogs)
        expect(result).toBe(36)
    })
    test('likes count of empty array is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

})

describe('favourite blog (most votes)', () => {
    test('when list has one blog post with 12 votes', () => {
        const result = listHelper.favouriteBlog(listWithSixBlogs)
        expect(result).toEqual(listWithSixBlogs[2]);
    })
})

describe('which author has most blog posts', () => {
    test('when list one author with 3 posts', () => {
        const expectedAuthor = {
            author: "Robert C. Martin",
            blogs: 3
        }
        const result = listHelper.authorWithMostPosts(listWithSixBlogs)
        expect(result).toEqual(expectedAuthor);
    })
})

describe('which author has most likes on their blog posts', () => {
    const expectedAuthor = {
        author: "Edsger W. Dijkstra",
        likes: 17
    }
    test('when list has six authors with one author with 17 likes', () => {
        const result = listHelper.authorWithMostLikes(listWithSixBlogs)
        expect(result).toEqual(expectedAuthor);
    })
})