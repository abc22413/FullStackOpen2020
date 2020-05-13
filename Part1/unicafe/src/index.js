import React, {useState, } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </>
  )
}

const Statistics = (props) => {
  let total = 0
  total = props.raw.forEach(val => {
    total += val
  })
  return (
    <>
      <p>Good: {props.raw[0]}</p>
      <p>Neutral: {props.raw[1]}</p>
      <p>Bad: {props.raw[2]}</p>
      <p>All: {total}</p>
    </>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <h1>give feedback</h1>
    <div>
      <Button text="good" onClick={handleGoodClick}/>
      <Button text="neutral" onClick={handleNeutralClick}/>
      <Button text="bad" onClick={handleBadClick}/>
    </div>
    <h1>statistics</h1>
    <div>
      <Statistics raw={[good,neutral,bad]}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
