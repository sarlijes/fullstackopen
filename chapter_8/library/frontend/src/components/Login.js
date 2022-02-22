import { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { ALL_AUTHORS } from './Authors'
import { ALL_BOOKS } from './Books'

const CREATE_LOGIN = gql`
  mutation createLogin($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password,
    ) {
      value
    }
  }
`
const Login = ({ show, setToken, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(CREATE_LOGIN, {
    onError: (error) => {
      console.log(error)
      setError(error.graphQLErrors[0].message)
    }
  })
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data, setToken])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )
}

export default Login
