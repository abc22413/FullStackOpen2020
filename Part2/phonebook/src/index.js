import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const persons = [
  {
    name: "John Doe",
    number: "12-34-56789",
  },
]

ReactDOM.render(<App persons={persons}/>, document.getElementById("root"))