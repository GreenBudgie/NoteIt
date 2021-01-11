import React, { useState } from 'react';
import {sidebarWidth} from '../Sidebar/Sidebar'
import { NoteContext } from './NoteHandler';

const defaultWidth = 300;
const defaultHeight = 500;

export default function Note({maxX, maxY}) {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [x, setX] = useState(Math.floor(Math.random() * (maxX - width)));
  const [y, setY] = useState(Math.floor(Math.random() * (maxY - height)));
  const [movementStatus, setMovementStatus] = useState({moving: false, startX: null, startY: null, pivotX: null, pivotY: null});

  //Sets the current position relative to the NoteHandler. Prevents the note from going outside the boundaries.
  function setPosition(x, y) {
    const clamp0 = (n, max) => n < 0 ? 0 : (n > max ? max : n);
    setX(clamp0(x, maxX - width));
    setY(clamp0(y, maxY - height));
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
