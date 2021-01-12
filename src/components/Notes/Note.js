import React, { useState, useRef } from 'react';
import { ResizableBox } from 'react-resizable'
import sizeMe from 'react-sizeme';

const defaultWidth = 300;
const defaultHeight = 500;

function Note({maxX, maxY, cursor}) {
  const [x, setX] = useState(Math.floor(Math.random() * (maxX - defaultWidth)));
  const [y, setY] = useState(Math.floor(Math.random() * (maxY - defaultHeight)));
  
  const movementStatus = useRef({moving: false, startX: null, startY: null, pivotX: null, pivotY: null});
  const intervalId = useRef(null);
  const ref = useRef(null);

  //Sets the current position relative to the NoteHandler. Prevents the note from going outside the boundaries.
  function setPosition(x, y) {
    const clamp0 = (n, max) => n < 0 ? 0 : (n > max ? max : n);
    setX(clamp0(x, maxX - ref.current.state.width));
    setY(clamp0(y, maxY - ref.current.state.height));
  }

  function startMoving(event) {
    if(event.target.className === "note-wrapper" && !movementStatus.current.moving) {
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
    <ResizableBox
      className="resizable-wrapper"
      width={defaultWidth}
      height={defaultHeight}
      minConstraints={[240, 200]}
      maxConstraints={[maxX - x, maxY - y]}
      ref={ref}
      style={{
        transform: 'translate(' + x + 'px, ' + y + 'px)'
      }}
    >
      <div 
        className="note-wrapper"
        onMouseDown={startMoving}
      >
        <input type="text"/>
        <textarea></textarea>
      </div>
    </ResizableBox>
  );
}

export default Note;