import React, { useState } from 'react'
import Record from './components/Record'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const addName = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName("")
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
        number: <input value={newNumber}/>
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
