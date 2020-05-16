import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShortEntry = ({ country, handler }) => {
  return (
    <div>
      <p>{country.name}</p>
      <button onClick={() => {handler(country)}}>See more</button>
    </div>
  )
}

const Entry = ({ country }) => {
  const [weather, setWeather] = useState({
    main: {
      temp: NaN
    },
    weather: {
      icon: "01d",
      description: "NaN"
    },
  })

  useEffect(() => {
    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(response => setWeather(response.data))
  })
  return (
    <div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>Languages</h2>
    <ul>
      {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
    </ul>
    <img width="auto" height="150px" src={country.flag} alt={`Flag of ${country.name}`} />
    <h2>Weather in {country.capital}</h2>
    <p><strong>Temperature</strong> {weather.main.temp-273.15} {"\u2103"}</p>
    <img src={`http://openweathermap.org/img/w/${weather.weather.icon}.png`} alt={weather.weather.description} />
    <p><strong>Wind</strong> </p>
    </div>
  )
}

const Content = (props) => {
  const [countries, setCountries] = useState([])
  const [focusCountry, setFocusCountry] = useState(null)

  useEffect(() => {
    setCountries(props.countries)
  }, [props.countries])

  useEffect(() => {
    if (focusCountry) {
      setCountries([focusCountry])
      setFocusCountry(null)
    }
  }, [focusCountry])
  
  //If no search
  if (!props.search) {
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
  //Only 1 country in countries
  else if(countries.length === 1) {
    return (
      <>
      <Entry country={countries[0]} />
      </>
    )
  }
  else {
    const handleSubClick = (country) => {
      setFocusCountry(country)
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
    const newSearch = event.target.value
    setSearch(event.target.value)
    const filteredCountries = allCountries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))
    setCountries(filteredCountries)
  }

  return (
    <>
    <div>find countries <input value={search} onChange={handleSearchChange} /></div>
    <Content countries={countries} search={search} />
    </>
  )
}

export default App