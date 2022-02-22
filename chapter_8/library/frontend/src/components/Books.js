import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

export const ALL_BOOKS_OLD = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
export const ALL_BOOKS = gql`
  query findBooksByGenre($selectedGenre: String) {
    allBooks(genre: $selectedGenre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  console.log("🚀 ~ file: Books.js ~ line 31 ~ Books ~ selectedGenre", selectedGenre)

  const result = useQuery(ALL_BOOKS, {
    variables: { selectedGenre }
  })

  // console.log("🚀 ~ file: Books.js ~ line 36 ~ Books ~ result", result.data.allBooks)

  // const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks

  let genreOptions = new Set();

  books.forEach((a) => a.genres.forEach(genreOptions.add, genreOptions));
  genreOptions = Array.from(genreOptions)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>filter by genre</h2>
      <div>
        {genreOptions.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>
        ))}
        <button key="all" onClick={() => setSelectedGenre(null)}>All genres</button>
      </div>
    </div>
  )
}

export default Books
