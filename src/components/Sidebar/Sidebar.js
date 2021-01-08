import React from 'react';
import './Sidebar.scss';
import plus from './plus.svg';
import folder from './folder.svg';
import trash from './trash.svg';

export default function Sidebar() {
  return (
    <div className="sidebar-wrapper">
      <SidebarButton image={plus} alt="Add note" />
      <SidebarButton image={folder} alt="Folder" />
      <SidebarButton image={trash} alt="Delete note" />
    </div>
  )
}

function SidebarButton(props) {
  return (
    <button className="sidebar-button">
      <img src={props.image} alt={props.alt}/>
    </button>
  );
} 
