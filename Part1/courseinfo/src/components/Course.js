import React from 'react'

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce(
    (sum,part) => (sum+part.exercises)
  ,0)
  return(
    <p><em>Number of exercises {sum}</em></p>
  ) 
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <>
    {parts.map(part => <Part key={part.id} part={part}/>)}
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
  )
}

export default Course