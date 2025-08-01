import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdotes, setVote }) => {
  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => setVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const setVote = (id) => {
    dispatch(vote(id))
  }

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Anecdote anecdotes={filteredAnecdotes} setVote={setVote} />
    </div>
  )
}

export default AnecdoteList
