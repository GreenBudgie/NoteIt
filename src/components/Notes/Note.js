import React, { useState } from 'react';
import {sidebarWidth} from '../Sidebar/Sidebar'
import { NoteContext } from './NoteHandler';

const defaultWidth = 300;
const defaultHeight = 500;

export default function Note({maxX, maxY}) {
  const [x, setX] = useState(Math.floor(Math.random() * (maxX - defaultWidth)));
  const [y, setY] = useState(Math.floor(Math.random() * (maxY - defaultHeight)));
  const [movementStatus, setMovementStatus] = useState({moving: false, startX: null, startY: null, pivotX: null, pivotY: null});

  function setPosition(x, y) {
    setX(x);
    setY(y);
  }

  function startMoving(event) {
    if(!movementStatus.moving) {
      setMovementStatus({moving: true, startX: x, startY: y, pivotX: event.clientX, pivotY: event.clientY});
    }
  }

  function handleMovement(event) {
    if(movementStatus.moving) {
      setPosition(movementStatus.startX + (event.clientX - movementStatus.pivotX), 
                  movementStatus.startY + (event.clientY - movementStatus.pivotY));
    }
  }

  function stopMoving() {
    setMovementStatus({moving: false});
  }

  return (
    <div 
      className="note-wrapper"
      onMouseDown={startMoving}
      onMouseMove={handleMovement}
      onMouseUp={stopMoving}
      style={{
        transform: 'translate(' + x + 'px, ' + y + 'px)',
        width: defaultWidth + 'px',
        height: defaultHeight + 'px'
      }}
    >
      <input type="text"/>
      <textarea></textarea>
    </div>
  );
}
