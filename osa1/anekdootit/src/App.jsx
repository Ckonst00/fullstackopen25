import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
      <button onClick={onClick}>{text}</button>
  )
}

const Votes = ({votes}) => {
  return (
    <p>Has {votes} votes</p>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(8))


  const handleNextClick = () => {
    let ranNum = Math.floor(Math.random() * 8)
    if (ranNum == selected) {   // Making sure that every click changes the anecdote. (Same number doesn't come twice in a row)
      ranNum = Math.floor(Math.random() * 8) 
    }
    setSelected(ranNum)
    console.log(votes)
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotes = Math.max(...votes)  // Get the highest value in the array
  const popAnecdote = votes.indexOf(mostVotes)  // Find the index of the highest value :)
  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <p>has {votes[selected]} votes</p>
      </div>
      <div>
        <Button text="vote" onClick={handleVoteClick}/>
        <Button text="next anecdote" onClick={handleNextClick}/>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {anecdotes[popAnecdote]}
        <p>has {mostVotes} votes</p>
      </div>
    </div>
  )
}

export default App