import { useState, useEffect } from 'react';

import './index.css';

import noteService from './services/notes.js';

import Note from './components/Note'
import Notification from './components/notification.jsx';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {
  // notes
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [newNoteImportant, setNewNoteImportant] = useState(false)

  // notification
  const [notificationBanner, setNotificationBanner] = useState(null)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  useEffect(() => {
    noteService
      .getAll()
      .then(notes => {
        setNotes(notes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target);
    let noteObj = {
      content: newNote,
      important: newNoteImportant,
    }
    noteService
      .create(noteObj)
      .then(returnedNote => {
        console.log('returnedNote :>> ', returnedNote);
        setNotes(notes.concat(returnedNote));
        setNewNote('');
        setNotificationBanner({type: "success", message: `${returnedNote.content} was added succesfully`})
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
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id === id ? returnedNote : n))
      })
      .catch(error => {
        setNotificationBanner({
          message: `the note '${note.content}' was already deleted from server (errorcode ${error.code}})`,
          type: "error"
        })
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification notification={notificationBanner} />
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
        <br />
        <label>
          Show all: <input type='checkbox' name='showAll' checked={showAll} onChange={handleShowAllChanged} />
        </label>
        <br />
        <label>
          Important: <input type='checkbox' name='noteImportant' onChange={handleNoteImportantChanged} />
        </label>
      </form>
      <Footer />
    </div>
  )
}

export default App