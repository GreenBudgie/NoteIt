import React from 'react';
import Note from './Note';
import { v4 as uuid } from "uuid";
import sizeMe from 'react-sizeme';
import './Notes.scss';

export const NoteContext = React.createContext();

export function NoteProvider(props) {
  const [notes, setNotes] = React.useState([]);

  function addNote() {
    setNotes(prevNotes => [...prevNotes, {key:uuid()}]);
  }

  return (
    <NoteContext.Provider value={{notes, addNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}

function NoteHandler(props) {
  const notes = React.useContext(NoteContext).notes;

  return (
    <div className="note-handler">
      {notes.map(note => { return (
          <Note 
            key={note.key} 
            byDragging={note.byDragging} 
            maxX={props.size.width} 
            maxY={props.size.height} 
            cursor={props.cursor}/>
        )})}
    </div>
  )
}

export default sizeMe({monitorHeight: true})(NoteHandler);