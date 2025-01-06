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

const personForm = (props) => {
  
  return (
    <form onSubmit={props.onSubmit}>
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