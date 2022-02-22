require('dotenv').config()

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')

const uri = process.env.MONGODB_URI;

console.log('connecting to', uri)

mongoose.connect(uri)
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
    author: Author!
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

      const books = await Book.find({}).populate('author');

      if (args.genre) {
        const byGenre = (book) =>
          book.genres.includes(args.genre)
        return books.filter(byGenre)
      }

      if (!args.author) {
        return books
      }
      const byAuthor = (book) =>
        book.author.name === args.author
      return books.filter(byAuthor)
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author');
      const byAuthor = (book) =>
        book.author.name === root.name
      return books.filter(byAuthor).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      let book;

      if (!author) {
        // No existing author, create new author
        author = new Author({
          name: args.author,
          id: uuid(),
          born: null
        });
        try {
          await author.save()
          book = new Book({ ...args, id: uuid(), author: author.id, })
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        // Existing author was found
        book = new Book({ ...args, id: uuid(), author: author.id, })
      }
      try {
        await book.save()
          .then((savedItem) => {
            return savedItem;
          })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {

      let author = await Author.findOne({ name: args.name })

      if (author === undefined || author === null) {
        return null;
      }
      author.born = args.setBornTo;

      try {
        await author.save()
          .then((savedItem) => {
            return savedItem;
          })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
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