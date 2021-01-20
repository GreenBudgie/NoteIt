import React, { useState, useRef } from 'react';
import {NoteContext} from '../Notes/NoteHandler'
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable'
import sizeMe from 'react-sizeme';

const defaultWidth = 300;
const defaultHeight = 500;

function Note({maxX, maxY, size}) {

  const notes = React.useContext(NoteContext).notes;
  const position = useRef(getRandomPosition());

  function getRandomPosition() {
    return {x: Math.floor(Math.random() * (maxX - defaultWidth)), y: Math.floor(Math.random() * (maxY - defaultHeight))};
  }

  function getChildNote(children) {
    for(let item of children) {
      if(item.classList.contains("note-wrapper")) return item;
    }
    return null;
  }

  function dragStart(event, node) {
    let note = getChildNote(node.node.children);
    note.classList.add("note-drag");
  }

  function dragStop(event, node) {
    
    getChildNote(node.node.children).classList.remove("note-drag");
  }

  function handleDrag(event, node) {
    position.current.x = node.x;
    position.current.y = node.y;
  }

  return (
    <Draggable
      bounds={{left: 0, right: maxX - size.width, top: 0, bottom: maxY - size.height}}
      defaultPosition={position.current}
      handle=".note-wrapper"
      cancel=".note-wrapper *"
      onStart={dragStart}
      onDrag={handleDrag}
      onStop={dragStop}
    >
      <ResizableBox
        className="resizable-wrapper"
        width={defaultWidth}
        height={defaultHeight}
        minConstraints={[240, 200]}
        maxConstraints={[maxX - position.current.x, maxY - position.current.y]}
      > 
        <div className="note-wrapper">
          <input type="text"/>
          <textarea></textarea>
        </div>
      </ResizableBox>
    </Draggable>
  );
}

export default sizeMe({monitorHeight: true})(Note);