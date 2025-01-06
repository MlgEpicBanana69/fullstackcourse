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

    let noteObj = {
      content: newNote,
      important: newNoteImportant,
    }

    axios
      .post("http://localhost:3001/notes", noteObj)
      .then(response => {
        console.log('response.data :>> ', response.data);
        setNotes(notes.concat(response.data));
        setNewNote('');
      })
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

  const toggleImportanceOf = id => {
    console.log(`importance of ${id} needs to be toggled`);
    const url = `http://localhost:3001/notes/${id}`
    console.log('id :>> ', id);
    const note = notes.find(n => n.id === id)
    console.log('note :>> ', note);
    const changedNote = {...note, important: !note.important}

    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(n => n.id === id ? response.data : n))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {
          notesToShow.map(note =>
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
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