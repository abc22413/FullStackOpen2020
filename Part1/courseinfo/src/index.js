import React from 'react'
import ReactDOM from 'react-dom'

//Header shows course name
const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

//Content shows parts
const Content = (props) => {
  const parts = props.parts
  const nums = props.nums
  return (
    <>
      <Part name={props.parts[0]} num={props.nums[0]} />
      <Part name={props.parts[1]} num={props.nums[1]} />
      <Part name={props.parts[2]} num={props.nums[2]} />
    </>
  )
}

//part shows body text row
const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.num}</p>
    </>
  )
}

//Total shows summary
const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.totalnum}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [part1, part2, part3]
  const nums = [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} nums={nums}/>
      <Total totalnum={exercises1+exercises2+exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))