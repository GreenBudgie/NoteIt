import React, { useState} from 'react';

const defaultWidth = 300;
const defaultHeight = 500;

export default function Note({maxWidth, maxHeight}) {
  const [x, setX] = useState(Math.floor(Math.random() * (maxWidth - defaultWidth)));
  const [y, setY] = useState(Math.floor(Math.random() * (maxHeight - defaultHeight)));

  return (
    <div 
      className="note-wrapper" 
      style={{
        transform: 'translate(' + x + 'px, ' + y + 'px)',
        width: defaultWidth + 'px',
        height: defaultHeight + 'px'
      }}
    >
    </div>
  );
}
