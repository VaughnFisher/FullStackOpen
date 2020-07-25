import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const Notification = ({error,success}) => {
  if(error===null && success===null){
    return null
  }
  
  else if(error !== null){
    return(
      <div className='error'>
        {error}
      </div>
    )
  }

  else if(success !== null){
    return(
      <div className='success'>
        {success}
      </div>
    )
  }  
} 

const Footer = () => {
  const footerStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Vaughn Fisher's Phonebook App, 2020</em>
    </div> 
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, persons)

  const filteredPersons = newFilter 
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) 
    : persons

  const addPerson = (event) => {
    const nameList = persons.map(person => person.name)
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber,
    }

    if(nameList.includes(newName)&&newNumber===('')){
      setErrorMessage(`${newName} is already in the phonebook!`)
      setTimeout(() => {setErrorMessage(null)}, 3000);
    }
    else if(nameList.includes(newName)&&newNumber!==('')){
      const confirm = window.confirm(`Update ${newName}'s number?`);
      if(confirm){
        const toUpdate = persons.find(person => person.name === newName)
        personService.update(toUpdate.id, person)
        setPersons(persons.map(p => p.name !== person.name ? p : person))
        setSuccessMessage(`${newName} has been updated!`)
        setTimeout(() => {setSuccessMessage(null)}, 3000);
      }
    }
    else{
      personService
        .create(person)
        .then(response => {
          setPersons(persons.concat(response.data))
          setSuccessMessage(`${newName} has been added!`)
          setTimeout(() => {setSuccessMessage(null)}, 3000);
        })
    }

  }

  const delPerson = ({person}) => {
    const confirm = window.confirm(`Delete?`)
    if(confirm){
      personService
      .remove(person.id)
      .then(response => {
        console.log('removing: ', person.id )
        setPersons(persons.filter(p => p.id !== person.id))
        setSuccessMessage(`${person.name} has been deleted!`)
        setTimeout(() => {setSuccessMessage(null)}, 3000);
      })
      .catch(error => {
        setPersons(persons.filter(p => p.id !== person.id))
        setErrorMessage(`${person.name} has already been deleted!`)
        setTimeout(() => {setErrorMessage(null)}, 3000);
      })

    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification error={errorMessage} success={successMessage}/>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <br></br>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Numbers</h2>
      <ul>
        <Persons persons={filteredPersons} delPerson={delPerson}/>
      </ul>
      <Footer/>
    </div>
  )
}

export default App