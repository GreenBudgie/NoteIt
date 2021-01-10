import React from 'react';
import './Sidebar.scss';
import plus from './plus.svg';
import folder from './folder.svg';
import trash from './trash.svg';
import {NoteContext} from '../Notes/NoteHandler'

export const sidebarWidth = 100;

export default function Sidebar() {
  const addNoteFunc = React.useContext(NoteContext).addNote;

  return (
    <aside className="sidebar-wrapper" style={{width: sidebarWidth + 'px'}}>
      <button className="sidebar-button" onClick={addNoteFunc}>
        <img src={plus} alt="Add note"/>
      </button>
      <button className="sidebar-button">
        <img src={folder} alt="Folder"/>
      </button>
      <button className="sidebar-button">
        <img src={trash} alt="Delete note"/>
      </button>
    </aside>
  )
}
