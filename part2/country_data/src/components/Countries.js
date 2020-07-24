import React, { useState, useEffect }from 'react'
import axios from 'axios'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
) 

const Show = ({country, handleShow}) => {
  console.log('show: ', country.name)
  return(
    <Button handleClick={() => handleShow(country.name)} text="Show"/>
  )
}

const Country = ({country}) => {
  const [ weather, setWeather ] = useState([]) 
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [country.capital])

  console.log('weather', weather)

  return (
    <>
      <h1>{country.name}</h1>
      <p>
        Capital: {country.capital}<br></br>
        Population: {country.population}
      </p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language,i) => <li key={i}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width='150px' alt={'The flag of ' + country.name} ></img>
      <h2>Weather in {country.name}</h2>
      <p>
        Temperature: 
      </p>
    </>
  )
}

const Countries = ({countries, result, filter, handleShow}) => { 
  const country = countries[0]

  if(filter===''){
    return(
      <>
      </>
    )
  }
  if(result === 0){
    return(
      <>
        <p>no country found</p>
      </>
    )
  }
  if(result === 1){
    return(
      <>
        <Country country={country} />
      </>
    )
  }
  if(result <= 10){
    return (
      <>
        {countries.map((country,i) => 
        <div key={i}>
          {country.name}
          <Show country={country} handleShow={handleShow} />
        </div>)}
      </>
    )
  }
  return(
    <>
      narrow down search
    </>
  )
}

export default Countries