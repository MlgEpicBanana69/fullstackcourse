import {useState} from 'react';

import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target);
    setNotes(notes.concat(
      {
        id: notes.length,
        content: newNote,
        important: false
      }
    ))
    setNewNote('')
  }

  const handleNoteChanged = (event) => {
    console.log('event.target.value :>> ', event.target.value);
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {
          notes.map(note => {
            <Note key={note.id} note={note} />
          })
        }
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChanged} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App