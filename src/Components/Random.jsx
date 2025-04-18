import React, { useState } from 'react';

function Random() {
  const [grid, setGrid] = useState([]);
  const handleClick = () => {
    const newGrid = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => 0)
    );
    setGrid(newGrid);
    console.log(newGrid);
  };
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <button onClick={handleClick}>click</button>
    </div>
  );
}

export default Random;
