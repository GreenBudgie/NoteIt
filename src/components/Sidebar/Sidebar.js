import React from 'react';
import './Sidebar.scss';
import plus from './plus.svg';
import folder from './folder.svg';
import trash from './trash.svg';
import {NoteContext} from '../Notes/NoteHandler'
import SidebarItem from './SidebarItem'

export const sidebarWidth = 100;

export default function Sidebar() {
  const addNote = React.useContext(NoteContext).addNote;

  return (
    <aside className="sidebar-wrapper" style={{width: sidebarWidth + 'px'}}>
      <SidebarItem 
        image={plus}
        alt="Add note"
        onClick={addNote}
      />
      <SidebarItem 
        image={folder}
        alt="Folder"
      />
      <SidebarItem 
        image={trash}
        alt="Delete note"
      />
    </aside>
  )
}
