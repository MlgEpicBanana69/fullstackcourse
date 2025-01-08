import phonebookService from '../services/phonebook.js';

const PersonList = ({persons, setPersons, filter}) => {
  const handleRemoveButtonOnClick = (person) => {

    return (
      () => {
        // Confirmation
        if (!window.confirm(`Are you sure you want to delete ${person.name}?`))
          return

        // Remove person
        phonebookService
          .remove(person.id)
          .then(returnedPerson => {
            setPersons(persons.filter(p => p.id !== returnedPerson.id ))
          })
      }
    )
  }

    return (
        <ul>
        {
          persons.filter(person => (
              person.name.toLowerCase().includes(filter.toLowerCase())
              ||
              person.number.includes(filter)
          )).map(person =>
            <li key={person.name}>{person.name} {person.number} <button onClick={handleRemoveButtonOnClick(person)}>Remove</button></li>
          )
        }
      </ul>
    )
}

export default PersonList