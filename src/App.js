import React, {useState} from 'react';
import './App.scss';
import Sidebar from "./components/Sidebar/Sidebar";
import NoteHandler from "./components/Notes/NoteHandler";
import { v4 as uuid } from "uuid";

export default function App() {
  const [notes, setNotes] = useState([]);

  function addNote() {
    setNotes(prevNotes => [...notes, {key:uuid(), maxWidth: 1800, maxHeight: 1080}]);
  }

  return (
    <div className="main-wrapper">
      <Sidebar addNote={addNote}/>
      <NoteHandler notes={notes}/>
    </div>
  );
}
