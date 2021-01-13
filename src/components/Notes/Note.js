import React, { useState, useRef } from 'react';
import { ResizableBox } from 'react-resizable'
import { sidebarWidth } from '../Sidebar/Sidebar'

const defaultWidth = 300;
const defaultHeight = 500;
const sidebarResizeFactor = 0.25;

function Note({maxX, maxY, cursor, byDragging}) {
  let currentX, currentY;
  if(byDragging) {
    currentX = cursor.current.x - defaultWidth / 2;
    currentY = cursor.current.y - defaultHeight / 2;
  } else {
    currentX = Math.floor(Math.random() * (maxX - defaultWidth));
    currentY = Math.floor(Math.random() * (maxY - defaultHeight));
  }

  const [x, setX] = useState(currentX);
  const [y, setY] = useState(currentY);
  const [moveStyle, setMoveStyle] = useState({scale: 1, opacity: 1});

  const movementStatus = useRef({moving: false, startX: null, startY: null, pivotX: null, pivotY: null, sidebar: false});
  const intervalId = useRef(null);
  const boxRef = useRef(null);

  React.useEffect(() => {
    if(byDragging) {
      movementStatus.current = {
        moving: true, 
        startX: cursor.current.x, 
        startY: cursor.current.y, 
        pivotX: cursor.current.x, 
        pivotY: cursor.current.y, 
        sidebar: true }
      cursor.current.forceStop = false;
      setMoveStyle({scale: 0.98, opacity: 0.9});
      intervalId.current = setInterval(() => {
        handleMovement();
      }, 20);
    }
  }, []);

  //Sets the current position relative to the NoteHandler. Prevents the note from going outside the page, but includes negative x
  //coordinates to allow moving on sidebar. Returns whether the note is on sidebar.
  function setPositionIncludeSidebar(x, y) {
    const onSidebar = cursor.current.x < sidebarWidth;
    if(onSidebar) {
      setX(x);
      setY(y);
    } else {
      const clamp0 = (n, max) => n < 0 ? 0 : (n > max ? max : n);
      setX(clamp0(x, maxX - boxRef.current.state.width));
      setY(clamp0(y, maxY - boxRef.current.state.height));
    }
    return onSidebar;
  }

  //Recalculates the note position to fit the NoteHandler size
  function recalculatePosition() {
    const clamp0 = (n, max) => n < 0 ? 0 : (n > max ? max : n);
    setX(currentX => clamp0(currentX, maxX - boxRef.current.state.width));
    setY(currentY => clamp0(currentY, maxY - boxRef.current.state.height));
  }

  function startMoving(event) {
    if(event.target.className === "note-wrapper" && !movementStatus.current.moving) {
      movementStatus.current = {moving: true, startX: x, startY: y, pivotX: event.clientX, pivotY: event.clientY, sidebar: false};
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
      const onSidebar = cursor.current.x < sidebarWidth;
      movementStatus.current.sidebar = onSidebar;
      setPositionIncludeSidebar(movementStatus.current.startX + (cursor.current.x - movementStatus.current.pivotX), 
                                                movementStatus.current.startY + (cursor.current.y - movementStatus.current.pivotY));
    } else stopMoving();
  }

  function stopMoving() {
    if(movementStatus.current.moving) {
      recalculatePosition();
      movementStatus.current.moving = false;
      movementStatus.current.sidebar = false;
      setMoveStyle({scale: 1, opacity: 1, smooth: false});
      if(intervalId.current != null) {
        clearInterval(intervalId.current);
      }
    } 
  }

  let translateX = 0, translateY = 0;
  if(movementStatus.current.sidebar) {
    const startCenterX = (2 * movementStatus.current.startX + boxRef.current.state.width) / 2
    const startCenterY = (2 * movementStatus.current.startY + boxRef.current.state.height) / 2
    const vectorX = movementStatus.current.pivotX - sidebarWidth - startCenterX;
    const vectorY = movementStatus.current.pivotY - startCenterY;
    translateX = (1 / sidebarResizeFactor) * vectorX;
    translateY = (1 / sidebarResizeFactor) * vectorY;
  }

  const transform = `scale(${movementStatus.current.sidebar ? sidebarResizeFactor : moveStyle.scale}) translate(${translateX}px, ${translateY}px)`

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
        onMouseDown={startMoving}
        style={{
          transform: transform,
          opacity: (movementStatus.current.sidebar ? 0.6 : moveStyle.opacity)
        }}
      >
        <input type="text"/>
        <textarea></textarea>
      </div>
    </ResizableBox>
  );
}

export default Note;