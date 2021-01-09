import React from 'react';
import './App.scss';
import Sidebar from "./components/Sidebar/Sidebar";
import NoteHandler from "./components/Notes/NoteHandler";
import Note from "./components/Notes/Note";

export default function App() {
  return (
    <div className="main-wrapper">
      <Sidebar />
      <NoteHandler />
    </div>
  );
}
