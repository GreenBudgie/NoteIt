import React, {useState} from 'react'
import Note from '../Notes/Note'
import './NoteHandler.scss';

export default function NoteHandler() {
  const [notes, setNotes] = useState([]);

  function addNote() {
    setNotes(prevNotes => prevNotes.push(new Note()));
  }
  
  return (
    <div className="note-handler">
      <Note />
    </div>
  )
}
