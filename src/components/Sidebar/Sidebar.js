import React from 'react';
import './Sidebar.scss';
import plus from './plus.svg';
import folder from './folder.svg';
import trash from './trash.svg';

export default function Sidebar({addNote}) {
  return (
    <aside className="sidebar-wrapper">
      <button className="sidebar-button" onClick={addNote}>
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
