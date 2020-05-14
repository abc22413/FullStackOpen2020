import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const persons = [
  {
    name: "John Doe"
  },
]

ReactDOM.render(<App persons={persons}/>, document.getElementById("root"))