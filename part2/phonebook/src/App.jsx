import { useState } from 'react'

const App = (props) => {
  // Persons
  const [persons, setPersons] = useState(props.persons)

  // Filter
  const [filter, setNewFilter] = useState('')
  const onFilterChanged = (event) => {
    setNewFilter(event.target.value)
  }

  // New person
  const [newName, setNewName] = useState('')
  const onNewNameChanged = (event) => {
    setNewName(event.target.value)
  }
  const [newNumber, setNewNumber] = useState('')
  const onNewNumberChanged = (event) => {
    setNewNumber(event.target.value)
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
      name: newName,
      number: newNumber
    }))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>filter shown with <Filter value={filter} onChange={onFilterChanged}/></h3>
      <h2>Add new</h2>
      
      <h2>Numbers</h2>
      <ul>
        {
          persons.filter(person => (
              person.name.toLowerCase().includes(filter.toLowerCase())
              ||
              person.number.includes(filter)
          )).map(person =>
            <li key={person.name}>{person.name} {person.number}</li>
          )
        }
      </ul>
    </div>
  )
}

export default App