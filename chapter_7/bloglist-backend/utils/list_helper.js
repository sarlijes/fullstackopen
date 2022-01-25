// let _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const count = (blogs) => {
    return blogs.length
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const blogWithMostVotes = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return blogWithMostVotes
}

const authorWithMostPosts = (blogs) => {

    const author = {}
    const count = {}
    blogs.forEach(blog => {
        if (!(blog.author in count))
            count[blog.author] = 0
        count[blog.author]++
    })

    author.author = Object.keys(count).reduce((best, author) => count[best] > count[author] ? best : author)
    author.blogs = count[author.author]

    return author

}
const authorWithMostLikes = (blogs) => {
    const returnAuthor = {}
    const likes = {}
    blogs.forEach(blog => {
        if (!(blog.author in likes))
            likes[blog.author] = 0
        likes[blog.author] = likes[blog.author] + blog.likes
    })
    returnAuthor.author = Object.keys(likes).reduce((best, author) => likes[best] > likes[author] ? best : author)
    returnAuthor.likes = likes[returnAuthor.author]

    return returnAuthor
}
module.exports = {
    dummy, count, totalLikes, favouriteBlog, authorWithMostPosts, authorWithMostLikes
}
