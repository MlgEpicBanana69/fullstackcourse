import { useState, useEffect } from 'react'

import phonebookService from './services/phonebook.js';

import Filter from './components/filter.jsx';
import PersonForm from './components/personForm.jsx';
import PersonList from './components/personList.jsx';

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  // Initialize persons from server
  useEffect(() => {
    phonebookService
      .getAll()
      .then(allPersons => {
        console.log('allPersons :>> ', allPersons);
        setPersons(allPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>filter shown with <Filter value={filter} setValue={setFilter}/></h3>
      <h2>Add new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter} />
    </div>
  )
}

export default App