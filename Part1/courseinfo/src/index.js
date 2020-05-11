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
  return (
    <>
      <Part name={parts[0].name} num={parts[0].exercises} />
      <Part name={parts[1].name} num={parts[1].exercises} />
      <Part name={parts[2].name} num={parts[2].exercises} />
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))