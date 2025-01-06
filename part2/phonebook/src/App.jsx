import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onNewNameChanged = (event) => {
    setNewName(event.target.value)
  }

  const onNewNumberChanged = (event) => {
    setNewName()
  }

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
      name: newName
    }))
    setNewName('')
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={onPhonebookSubmit}>
        <div>
          name: <input onChange={onNewNameChanged} value={newName}/>
        </div>
        <br/>
        <div>
          number: <input type="tel" onChange={onNewNumberChanged} value={newNumber} pattern='[0-9]{3}-[0-9]{5}'/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(person =>
            <li key={person.name}>{person.name}</li>
          )
        }
      </ul>
    </div>
  )
}

export default App