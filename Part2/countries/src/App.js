import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShortEntry = ({ country, handler }) => {
  return (
    <div>
      <p>{country.name}</p>
      <button onClick={handler(country.name)}>See more</button>
    </div>
  )
}

const Entry = ({ country }) => {
  return (
    <div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>Languages</h2>
    <ul>
      {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
    </ul>
    <img width="100px" height="100px" src={country.flag} alt={`Flag of ${country.name}`} />
    </div>
  )
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
      <Entry country={countries[0]} />
      </>
    )
  }
  else {
    const handleSubClick = (country) => {
      countries = [country]
    }
    return (
      <div>
      {countries.map(country => <ShortEntry key={country.name} country={country} handler={handleSubClick}/>)}
      </div>
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