import React, { useState, useRef } from 'react';
import { ResizableBox } from 'react-resizable'

const defaultWidth = 300;
const defaultHeight = 500;

function Note({maxX, maxY, cursor}) {
  const [x, setX] = useState(Math.floor(Math.random() * (maxX - defaultWidth)));
  const [y, setY] = useState(Math.floor(Math.random() * (maxY - defaultHeight)));
  const [moveStyle, setMoveStyle] = useState({scale: 1, opacity: 1});

  const movementStatus = useRef({moving: false, startX: null, startY: null, pivotX: null, pivotY: null});
  const intervalId = useRef(null);
  const boxRef = useRef(null);
  const noteRef = useRef(null);

  //Sets the current position relative to the NoteHandler. Prevents the note from going outside the boundaries.
  function setPosition(x, y) {
    const clamp0 = (n, max) => n < 0 ? 0 : (n > max ? max : n);
    setX(clamp0(x, maxX - boxRef.current.state.width));
    setY(clamp0(y, maxY - boxRef.current.state.height));
  }

  function startMoving(event) {
    if(event.target.className === "note-wrapper" && !movementStatus.current.moving) {
      movementStatus.current = {moving: true, startX: x, startY: y, pivotX: event.clientX, pivotY: event.clientY};
      cursor.current.forceStop = false;
      setMoveStyle({scale: 0.98, opacity: 0.9});
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
      setMoveStyle({scale: 1, opacity: 1});
      if(intervalId.current != null) {
        clearInterval(intervalId.current);
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
      ref={boxRef}
      style={{
        transform: 'translate(' + x + 'px, ' + y + 'px)',
      }}
    >
      <div 
        className="note-wrapper"
        ref={noteRef}
        onMouseDown={startMoving}
        style={{
          transform: 'scale(' + moveStyle.scale + ')',
          opacity: moveStyle.opacity
        }}
      >
        <input type="text"/>
        <textarea></textarea>
      </div>
    </ResizableBox>
  );
}

export default Note;