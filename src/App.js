import React, {useState} from 'react';
import './App.scss';
import Sidebar from "./components/Sidebar/Sidebar";
import Note from "./components/Notes/Note"
import { v4 as uuid } from "uuid";
import sizeMe from 'react-sizeme';

function App(props) {
  const [notes, setNotes] = useState([]);

  function addNote() {
    console.log(props.size);
    setNotes(prevNotes => [...notes, {key:uuid(), maxX: props.size.width - 100, maxY: props.size.height}]);
  }

  return (
    <div className="main-wrapper">
      <Sidebar addNote={addNote}/>

      <div className="note-handler">
        {notes.map(note => {return <Note key={note.key} maxX={note.maxX} maxY={note.maxY} />})}
      </div>

    </div>
  );
}

export default sizeMe({monitorHeight: true})(App);