import phonebookService from '../services/phonebook.js';

const PersonList = ({persons, handleRemove, filter}) => {
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
            handleRemove(
              persons.filter(p => p.id !== returnedPerson.id),
              {
                message: `${returnedPerson.name} was succesfully removed from phonebook`,
                type: "success"
              }
            )
          })
          .catch(error => {
            handleRemove(
              persons.filter(p => p.id !== person.id),
              {
                message: `Could not remove ${person.name} from phonebook as it was already deleted (${error})`,
                type: "error"
              }
            )
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