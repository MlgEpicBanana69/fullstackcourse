import {useState} from 'react';

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

    // Already exists
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook!`)
      return
    }

    // Add new person to phonebook
    setPersons(persons.concat({
      name: newName,
      number: newNumber
    }))
    setNewName('')
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