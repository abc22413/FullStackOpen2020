import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Result = () => {

}

const Entry = () => {

}

const Content = ({ countries, search }) => {
  //If no search
  if (!search) {
    return (
      <>
      <p>Type a country's name to learn more</p>
      </>
    )
  }
  //Too many countries
  else if(countries.length > 10) {
    return (
      <>
      <p>Your search criteria are too broad.</p>
      </>
    )
  }
  //No countries found
  else if(countries.length === 0) {
    return (
      <>
      <p>No country matches your search criteria.</p>
      </>
    )
  }
  else if(countries.length === 1) {
    return (
      <>
      <p>One Country found</p>
      </>
    )
  }
  else {
    return (
      <>
      <p>You found {countries.length} countries</p>
      </>
    )
  }
}

const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  useEffect(
    () => {
      axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setAllCountries(response.data))
    }
  ,[])

  const handleSearchChange = (event) => {
    let newSearch = event.target.value
    setSearch(newSearch)
    const filteredCountries = allCountries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))
    setCountries(filteredCountries)
  }

  return (
    <>
    <div>find countries <input value={search} onChange={handleSearchChange} /></div>
    <Content countries={countries} search={search}/>
    </>
  )
}

export default App