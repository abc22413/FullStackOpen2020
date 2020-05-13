import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    new Array(props.anecdotes.length).fill(0)
  )
  const [popular, setPopular] = useState(0)

  //Generate new value for selected
  const genRandom = (original, length) => {
    let fresh = Math.floor(Math.random()*length)
    while (original === fresh) {
      fresh = Math.floor(Math.random()*length)
    }
    return fresh
  }

  //Handle when random button is clicked
  const handleRandomClick = () => {
    setSelected(genRandom(selected, props.anecdotes.length))
  }

  //Handle when vote button clicked
  const handleVoteClick = () => {
    //Update votes array
    let copy = votes
    copy[selected]++
    setVotes(copy)

    //Update popular
    if(votes[selected]>votes[popular]) {
      setPopular(selected)
    }

    alert("Your vote was counted")
  }

  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>This has {votes[selected]} votes</p>
    </div>
    <div>
      <button onClick={handleRandomClick}>
        Generate random
      </button>
      <button onClick={handleVoteClick}>
        Vote
      </button>
    </div>
    <h1>Anecdote with most votes</h1>
    <div>
      <p>{props.anecdotes[popular]}</p>
      <p>This has {votes[popular]} votes</p>
    </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById("root"))