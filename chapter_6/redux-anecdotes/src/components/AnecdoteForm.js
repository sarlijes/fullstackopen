import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.createAnecdote(content)
        event.target.anecdote.value = ''
        props.setNotification(`you added '${content}'`, 3)
    }

    return (
        <form onSubmit={addAnecdote}>
            Abbreviation
            <input name="abbrev" />
            Details
            <input size= '100' name="anecdote" />
            <button type="submit">add</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        notification: state.notification
    }
}

const ConnectedAnecdoteForm = connect(mapStateToProps, { createAnecdote, setNotification })(AnecdoteForm)

export default ConnectedAnecdoteForm
