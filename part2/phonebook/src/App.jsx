import { useState } from 'react'

import Filter from './components/filter.jsx';
import PersonForm from './components/personForm.jsx';
import PersonList from './components/personList.jsx';

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [filter, setFilter] = useState('')

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