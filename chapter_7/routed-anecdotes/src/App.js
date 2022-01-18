import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, Redirect
} from "react-router-dom"
import { useField } from './hooks'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(a =>
        <li key={a.id}>
          <Link to={`/anecdotes/${a.id}`}>{a.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const padding = { padding: 15 }
  const id = useParams().id
  const anecdote = anecdotes.find(a => Number(a.id) === Number(id))
  return (
    <div>
      <h2>ID {anecdote.id} by {anecdote.author}</h2>
      <div style={padding}>"{anecdote.content}"</div>
      <div style={padding}>Has {anecdote.votes} votes</div>
      <div style={padding}>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.
    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  return (
    <div>
      <h2>create a new anecdote</h2>

      <form onSubmit={handleSubmit}>
        content:
        <input  {...content} />
        <br />
        author:
        <input {...author} />
        <br />
        url for more info
        <input {...info} />
        <button>create</button>
      </form>

    </div>
  )

}

const Notification = ({ message }) => {
  if (message === undefined) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [newAdded, setNewAdded] = useState(undefined)
  const [notification, setNotification] = useState('')

  const changeNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(undefined)
    }, 10000)
  }

  const changeNewAdded = (anecdote) => {
    setNewAdded(anecdote)
    setTimeout(() => {
      setNewAdded(undefined)
    }, 1000)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    changeNotification("New anecdote was added: " + anecdote.content)
    changeNewAdded(anecdote);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = { padding: 5 }

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Router>
        <div>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create">create</Link>
          <Link style={padding} to="/about">about</Link>
        </div>
        <Notification message={notification} />
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path="/create">
            {newAdded ? <Redirect to="/" /> : <CreateNew addNew={addNew} />}
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      </Router>

      <Footer />
    </div>
  )
}

export default App;