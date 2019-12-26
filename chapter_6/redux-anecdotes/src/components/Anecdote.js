import React from 'react'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content}
      <button onClick={handleClick}>vote</button>
      {anecdote.votes}
    </li>
  )
}

export default Anecdote