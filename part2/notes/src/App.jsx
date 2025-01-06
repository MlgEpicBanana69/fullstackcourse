import { useState, useEffect } from 'react';
import axios from 'axios';

import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const [newNoteImportant, setNewNoteImportant] = useState(false)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const hook = () => {
    console.log("effect");
    axios
      .get("http://localhost:3001/notes")
      .then(response => {
        console.log("promise fulfilled");
        setNotes(response.data)
      })
  }

  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target);
    setNotes(notes.concat(
      {
        content: newNote,
        important: newNoteImportant,
        id: String(notes.length + 1)
      }
    ))
    setNewNote('')
  }

  const handleNoteImportantChanged = (event) => {
    setNewNoteImportant(event.target.checked)
  }

  const handleShowAllChanged = (event) => {
    setShowAll(event.target.checked)
  }

  const handleNoteChanged = (event) => {
    console.log('event.target.value :>> ', event.target.value);
    setNewNote(event.target.value)
  }

  console.log('notes :>> ', notes);
  console.log('Notes list :>> ', notes.map(note =>
    <Note key={note.id} note={note} />
  ));

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {
          notesToShow.map(note =>
            <Note key={note.id} note={note} />
          )
        }
      </ul>
      <form onSubmit={addNote}>
        <input name='noteInput' value={newNote} onChange={handleNoteChanged} />
        <button type="submit">save</button>
        <br/>
        <label>
          Show all: <input type='checkbox' name='showAll' checked={showAll} onChange={handleShowAllChanged} />
        </label>
        <br/>
        <label>
          Important: <input type='checkbox' name='noteImportant' onChange={handleNoteImportantChanged} />
        </label>
      </form>
    </div>
  )
}

export default App