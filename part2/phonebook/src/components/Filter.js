import React from 'react'

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <>
      <div><b>Filter: </b><input value={newFilter} onChange={handleFilterChange}/></div>
    </>
  )
}

export default Filter