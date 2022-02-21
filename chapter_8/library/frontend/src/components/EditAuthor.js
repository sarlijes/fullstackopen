import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { ALL_AUTHORS } from './Authors'

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

const EditAuthor = (props) => {
  const [name, setName] = useState('')
  const [bornYear, setBornYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log('edit author...')

    const born = parseInt(bornYear)
    editAuthor({ variables: { name: name, setBornTo: born } })

    setName('')
    setBornYear('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>
        <button type="submit">edit author</button>
      </form>
    </div>
  )
}

export default EditAuthor
