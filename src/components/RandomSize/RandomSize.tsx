import React, { CSSProperties, useState } from 'react';
import { fireResizeWindowEvent } from '../ReactGridItemWrapper/fireResizeWindowEvent';

const randomNumberBetween = (min: number, max: number, multiplier: number) => {
  return (Math.floor(Math.random() * max) + min) * multiplier;
};

const calculateWidth = () => {
  return randomNumberBetween(1, 25, 63);
};

const calculateHeight = () => {
  return randomNumberBetween(1, 10, 25);
};

const RandomSize = () => {
  // Calculate a random size
  const [size, setSize] = useState({ width: calculateWidth(), height: calculateHeight() });

  const handleResize = () => {
    setSize({ width: calculateWidth(), height: calculateHeight() });
    fireResizeWindowEvent();
  };

  const myStyle: CSSProperties = {
    minWidth: `${size.width}px`,
    minHeight: `${size.height}px`,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    border: '1px solid red',
    margin: '0',
  };

  return (
    <div style={myStyle}>
      <button onClick={handleResize}>Resize</button>
    </div>
  );
};

export { RandomSize };
