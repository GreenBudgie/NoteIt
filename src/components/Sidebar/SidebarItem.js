import React from 'react';

export default function SidebarItem({image, alt, onClick, onDrag, onNoteDrop}) {
  return (
    <button className="sidebar-button" onClick={onClick} onDragStart={event => {onDrag(event); event.preventDefault()}}>
        <img src={image} alt={alt}/>
    </button>
  )
}