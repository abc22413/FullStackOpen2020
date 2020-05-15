import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AddPersonForm = (props) => {
  return (
  <form>
    <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
    <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
    <div><button type="submit" onClick={props.addPerson}>Add</button></div>
  </form>
  )
}

const FilterForm = (props) => {
  return (
    <div>
      filter shown with <input value={props.filter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const Record = ({ person }) => {
  return (
    <div>
    {person.name} {person.number}
    </div>
  )
}

const Content = (props) => {
  const filter = props.filter.toLowerCase()
  const persons = props.persons
  let filteredVals = !filter ? persons : persons.filter(
    person => person.name.toLowerCase().includes(filter) || person.number.toLowerCase().includes(filter)
  )
  return (
    <>
      {filteredVals.map(person => <Record key={person.id} person={person}/>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  //Fetch data from server
  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => setPersons(response.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    //if a field is blank
    if (!newName || !newNumber) {
      alert("Please fill in all fields!")
      return
    }
    //if name already inserted
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    //if number already exists
    if (persons.map(person => person.number).includes(newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }
    //create person object
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    //add and reset change vars
    setPersons(persons.concat(personObject))
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
    <h2>Phonebook</h2>
    <FilterForm flter={filter} handleFilterChange={handleFilterChange}/>
    <h2>Add a new</h2>
    <AddPersonForm newName={newName} handleNameChange={handleNameChange} 
    newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
    <h2>Numbers</h2>
    <Content persons={persons} filter={filter}/>
    </>
  )
}

export default App;
