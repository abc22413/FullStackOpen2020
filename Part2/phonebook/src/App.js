import React, { useState } from 'react'
import Record from './components/Record'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState("")

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: event.target.value
    }
    setPersons(persons.concat(personObject))
    //setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <>
    <h2>Phonebook</h2>
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        <button type="submit" onClick={addName}>
          Add
        </button>
      </div>
    </form>
    <h2>Numbers</h2>
    {persons.map(person => <Record key={person.name} person={person}/>)}
    </>
  )
}

export default App;
