import { useState, useEffect } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

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
const ME = gql`
  query {
    me {
        username
        id
        favoriteGenre
    }
  }
`

const Recommendations = (props) => {

  const currentUser = useQuery(ME)
  const [selectedGenre, setSelecterGenre] = useState("js")

  const resultByGenre = useQuery(ALL_BOOKS, {
    variables: { selectedGenre }
  })


  if (!props.show) {
    return null
  }
  if (resultByGenre.loading || currentUser.loading) {
    return <div>loading...</div>
  }

  const booksbyGenre = resultByGenre.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
          </tr>
          {booksbyGenre.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Recommendations
