import React, {useState} from 'react'
import Note from '../Notes/Note'
import './NoteHandler.scss';

export default function NoteHandler({notes}) {
  return (
    <div className="note-handler">
      {notes.map(note => {return <Note key={note.key} maxWidth={note.maxWidth} maxHeight={note.maxHeight} />})}
    </div>
  )
}
