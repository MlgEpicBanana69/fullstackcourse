import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const onNewNameChanged = (event) => {
    setNewName(event.target.value)
  }

  const onPhonebookSubmit = (event) => {
    event.preventDefault()
    console.log('newName is now :>> ', newName);
    console.log('persons.concat({name: newName}) :>> ', persons.concat({name: newName}));
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