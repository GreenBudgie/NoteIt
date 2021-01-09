import React from 'react';
import './Sidebar.scss';
import plus from './plus.svg';
import folder from './folder.svg';
import trash from './trash.svg';

export default function Sidebar() {
  return (
    <aside className="sidebar-wrapper">
      <SidebarButton image={plus} alt="Add note" />
      <SidebarButton image={folder} alt="Folder" />
      <SidebarButton image={trash} alt="Delete note" />
    </aside>
  )
}

function SidebarButton({image, alt}) {
  return (
    <button className="sidebar-button">
      <img src={image} alt={alt}/>
    </button>
  );
} 
