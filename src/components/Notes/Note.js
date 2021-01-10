import React, { useState } from 'react';

const defaultWidth = 300;
const defaultHeight = 500;

export default function Note({maxX, maxY}) {
  const [x, setX] = useState(Math.floor(Math.random() * (maxX - defaultWidth)));
  const [y, setY] = useState(Math.floor(Math.random() * (maxY - defaultHeight)));

  return (
    <div 
      className="note-wrapper"
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
