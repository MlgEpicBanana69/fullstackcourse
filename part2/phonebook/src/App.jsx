import { useState, useEffect } from 'react'
import axios from 'axios';

import Filter from './components/filter.jsx';
import PersonForm from './components/personForm.jsx';
import PersonList from './components/personList.jsx';

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios.get("http://localhost:3001/persons")
    .then(response => {
      console.log('response.data :>> ', response.data);
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

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