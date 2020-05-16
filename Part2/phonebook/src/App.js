import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Record = ({ person, handler }) => {
  return (
    <div>
    {person.name} {person.number}
    <button onClick={handler}>Delete</button>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [filteredPersons, setFilteredPersons] = useState([])

  //Fetch data from server
  useEffect(() => {
    personService
    .getAll()
    .then(initalPersons => {
      setPersons(initalPersons)
    })
  }, [])

  //Add person code
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
    }
    //Push to server
    personService
    .create(personObject)
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
    })
    .catch(error => {
      alert("Creation failed, please try again")
    })
    //add and reset change vars
    setNewName("")
    setNewNumber("")
  }

  //Delete person code
  const rmvPerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (!window.confirm(`Confirm deletion of ${person.name} ?`)) return
    personService
    .remove(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      alert(`The person '${person.name}' has already been deleted`)
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //Update filteredPersons when filter or persons changes
  useEffect(() => {
    if (!filter) {
      setFilteredPersons(persons)
      return
    }
    const filterVal = filter.toLowerCase()
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(filterVal) || person.number.toLowerCase().includes(filterVal)))
  },[filter, persons])

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
    {filteredPersons.map(person => <Record key={person.id} person={person} handler={() => rmvPerson(person.id)} />)}
    </>
  )
}

export default App;
