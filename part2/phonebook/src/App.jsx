import { useState, useEffect } from 'react'

import phonebookService from './services/phonebook.js';

import Filter from './components/filter.jsx';
import PersonForm from './components/personForm.jsx';
import PersonList from './components/personList.jsx';
import Notification from './components/notification.jsx';

import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  const [notification, setNotification] = useState(null)

  const personFormOnSubmit = (newPersons, notification=null) => {
      console.log('newPersons :>> ', newPersons);
      console.log('notification :>> ', notification);
      setPersons(newPersons)
      setNotification(notification)
  }

  const personListHandleRemove = (newPersons, notification=null) => {
    if (newPersons) {
      console.log('newPersons :>> ', newPersons);
      setPersons(newPersons)
    }
    setNotification(notification)
  }

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
      <Notification notification={notification}/>
      <h3>filter shown with <Filter value={filter} setValue={setFilter}/></h3>
      <h2>Add new</h2>
      <PersonForm persons={persons} onSubmit={personFormOnSubmit} />
      <h2>Numbers</h2>
      <PersonList persons={persons} handleRemove={personListHandleRemove} filter={filter} />
    </div>
  )
}

export default App