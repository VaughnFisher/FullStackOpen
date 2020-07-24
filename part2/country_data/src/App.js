import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, countries)

  const filteredCountries = newFilter 
    ? countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase())) 
    : countries

  const result = filteredCountries.length

  console.log('result', result, ' countries')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleShow = (event) => {
    console.log('handle: ', event)
    setNewFilter(event)
  }
  

  return (
    <div>
      <h1>Search for a country</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>  
      <Countries countries={filteredCountries} result={result} filter={newFilter} handleShow={handleShow}/>
    </div>
  )
}

export default App