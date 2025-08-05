import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { notify, emptyNotification } from "../reducers/notificationReducer"


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value

        dispatch(createAnecdote(content))
        dispatch(notify(`you added ${content}`))
        setTimeout(() => {
            dispatch(emptyNotification())
            }, 5000)
        event.target.newAnecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name='newAnecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm