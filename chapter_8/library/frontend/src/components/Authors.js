import { gql, useQuery } from '@apollo/client'
import EditAuthor from './EditAuthor'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
    name
    born
    bookCount
  }
}
`

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const names = []
  authors.forEach((a) => (names.push({ value: a.name, label: a.name })));

  return (
    <div>
      <h2>authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Edit author</h2>
      <EditAuthor show={true} options={names} />
    </div>
  )
}

export default Authors
