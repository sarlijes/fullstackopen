const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = 'mongodb+srv://user123:123@cluster0.prolt.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String]! 
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    books: [Book]! 
    id: ID!
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author],
    allBooks(author: String, genre: String): [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
  }

  type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
  }

`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

      // if (args.genre) {
      //   const byGenre = (book) =>
      //     book.genres.includes(args.genre)
      //   return books.filter(byGenre)
      // }

      // if (!args.author) {
      //   return books
      // }
      // const byAuthor = (book) =>
      //   book.author === args.author
      return Book.find({})
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: (root) =>
      -1 // TODO
    // books.filter(book =>
    //   book.author === root.name)
    //   .length
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }

      // TODO 
      console.log("adding book")
      // books = books.concat(book)

      // const existingAuthor = authors.find(a => a.name === args.author)

      // if (!existingAuthor) {
      //   const newAuthor = {
      //     name: args.author,
      //     id: uuid(),
      //     born: null
      //   }
      //   authors = authors.concat(newAuthor)
      // }

      return book
    },
    editAuthor: (root, args) => {

      return null // TODO
      // const author = authors.find(a => a.name === args.name)

      // if (author === undefined) {
      //   return null;
      // }
      // author.born = args.setBornTo;
      // return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})