import React from 'react'

const Button = ({person, delPerson}) => {
  return (
    <>
      <button onClick={() => delPerson({person})}>delete</button>
    </>
  )
}


const Persons = ({persons, delPerson}) => {
  return (
    <>
      {persons.map((person,i) => <li className='person' key={i}>{person.name} {person.number} <Button person={person} delPerson={delPerson}/></li>)}
    </>
  )
}

export default Persons