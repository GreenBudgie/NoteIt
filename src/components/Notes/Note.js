import React, { useState, useRef } from 'react';

const defaultWidth = 300;
const defaultHeight = 500;

export default function Note({maxX, maxY, cursor}) {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [x, setX] = useState(Math.floor(Math.random() * (maxX - width)));
  const [y, setY] = useState(Math.floor(Math.random() * (maxY - height)));
  
  const movementStatus = useRef({moving: false, startX: null, startY: null, pivotX: null, pivotY: null});
  const intervalId = useRef(null);

  //Sets the current position relative to the NoteHandler. Prevents the note from going outside the boundaries.
  function setPosition(x, y) {
    const clamp0 = (n, max) => n < 0 ? 0 : (n > max ? max : n);
    setX(clamp0(x, Math.floor(maxX - width)));
    setY(clamp0(y, Math.floor(maxY - height)));
  }

  function startMoving(event) {
    if(!movementStatus.current.moving) {
      movementStatus.current = {moving: true, startX: x, startY: y, pivotX: event.clientX, pivotY: event.clientY};
      cursor.current.forceStop = false;
      intervalId.current = setInterval(() => {
        handleMovement();
      }, 20);
    }
  }

  function handleMovement() {
    if(cursor.current.x == null || cursor.current.y == null || cursor.current.forceStop == null) return;
    if(movementStatus.current.moving && !cursor.current.forceStop) {
      setPosition(movementStatus.current.startX + (cursor.current.x - movementStatus.current.pivotX), 
                  movementStatus.current.startY + (cursor.current.y - movementStatus.current.pivotY));
    } else stopMoving();
  }

  function stopMoving() {
    if(movementStatus.current.moving) {
      movementStatus.current.moving = false;
      if(intervalId != null) {
        clearInterval(intervalId);
      }
    } 
  }

  return (
    <div 
      className="note-wrapper"
      onMouseDown={startMoving}
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
