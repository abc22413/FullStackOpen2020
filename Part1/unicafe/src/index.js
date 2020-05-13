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
  const total = props.raw.reduce(
    (a,b) => a+b,
    0
  )
  const avg = (props.raw[0]-props.raw[2])/total
  const positive = ((props.raw[0])*100/total).toString()+"%"
  if(total === 0) {
    return (
      <>
      <p>No feedback given</p>
      </>
    )
  }
  return (
  <table>
    <tbody>
    <Statistic text="Good" value={props.raw[0]} />
    <Statistic text="Neutral" value={props.raw[1]} />
    <Statistic text="Bad" value={props.raw[2]} />
    <Statistic text="All" value={total} />
    <Statistic text="Average" value={avg} />
    <Statistic text="Positive" value={positive} />
    </tbody>
  </table>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
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
    <>
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
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
