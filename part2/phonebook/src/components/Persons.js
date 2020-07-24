import React from 'react'

const Persons = ({persons}) => {
  return (
    <>
      {persons.map((person,i) => <li key={i}>{person.name} {person.number}</li>)}
    </>
  )
}

export default Persons