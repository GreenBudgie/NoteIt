import React from 'react';
import './App.scss';
import Sidebar from "./components/Sidebar/Sidebar";
import NoteHandler, {NoteProvider} from './components/Notes/NoteHandler'

function App() {
  const globalCursorPosition = React.useRef({x: null, y: null, forceStop: false});
  
  return (
    <NoteProvider>
      <div 
        className="main-wrapper"
        onMouseMove={event => {globalCursorPosition.current.x = event.clientX; globalCursorPosition.current.y = event.clientY}}
        onMouseLeave={() => globalCursorPosition.current.forceStop = true}
        onMouseUp={() => globalCursorPosition.current.forceStop = true}
      >
        <Sidebar />
        <NoteHandler cursor={globalCursorPosition}/>
      </div>
    </NoteProvider>
  );
}

export default App;