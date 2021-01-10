import React from 'react';
import './App.scss';
import Sidebar from "./components/Sidebar/Sidebar";
import NoteHandler, {NoteProvider} from './components/Notes/NoteHandler'

function App() {
  return (
    <NoteProvider>
      <div className="main-wrapper">
        <Sidebar />
        <NoteHandler />
      </div>
    </NoteProvider>
  );
}

export default App;