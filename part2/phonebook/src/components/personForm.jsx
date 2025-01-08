import {useState} from 'react';

import phonebookService from '../services/phonebook.js';

const PersonForm = ({persons, setPersons}) => {
  // New person
  const [newName, setNewName] = useState('')
  const onNewNameChanged = (event) => {
    setNewName(event.target.value)
  }
  const [newNumber, setNewNumber] = useState('')
  const onNewNumberChanged = (event) => {
    setNewNumber(event.target.value)
  }

  // Submit event
  const onPhonebookSubmit = (event) => {
    event.preventDefault()
    console.log('newName is now :>> ', newName);

    // The new person to potentially add
    let newPerson = {
      name: newName,
      number: newNumber
    }

    let duplicatePerson = persons.find(person => person.name === newPerson.name)
    console.log('duplicatePerson :>> ', duplicatePerson);
    // Already exists
    if (duplicatePerson) {
      // Exists with a different number
      if (duplicatePerson.number !== newPerson.number) {
        if (window.confirm(`${newPerson.name} already exists with a different number. Do you want to update the number to the new one?`)) {
          phonebookService
          .update(duplicatePerson.id, {...duplicatePerson, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
        }
      }
      // Is already the exact same
      else {
        alert(`${newName} is already added to phonebook!`)
      }
    }
    // Not already exists
    else {
      // Add new person to phonebook
      phonebookService
      .add(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  return (
    <form onSubmit={onPhonebookSubmit}>
        <div>
          name: <input onChange={onNewNameChanged} value={newName} required/>
        </div>
        <div>
          number: <input type="tel" onChange={onNewNumberChanged} value={newNumber} pattern='[0-9]{3}-[0-9]{7}' required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

console.log("personForm component defined...");
export default PersonForm