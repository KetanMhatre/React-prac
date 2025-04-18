import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function RowsAndColsGenerator() {
  const [userInput, setUserInput] = useState({
    row: 0,
    col: 0,
  });
  const [grid, setGrid] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevData) => ({ ...prevData, [name]: Number(value) }));
  };

  const handleClick = () => {
    const { row, col } = userInput;
    const newGrid = Array.from({ length: row }, () =>
      Array.from({ length: col }, () => 0)
    );
    setGrid(newGrid);
    // console.log(newGrid);
  };

  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <Card className='p-3'>
        <div className='d-flex gap-3'>
          <div>
            <h5>Rows</h5>
            <input type='number' name='row' onChange={handleChange} />
          </div>
          <div>
            <h5>Cols</h5>
            <input type='number' name='col' onChange={handleChange} />
          </div>
          <button onClick={handleClick} className='btn btn-primary mt-4'>
            Generate
          </button>
        </div>
        <div className='mt-4'>
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className='d-flex'>
                {row.map((_, colIndex) => {
                  return (
                    <div
                      key={colIndex}
                      className='d-flex align-items-center justify-content-center'
                      style={{
                        width: '100px',
                        height: '50px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ddd',
                      }}
                    >
                      {rowIndex},{colIndex}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default RowsAndColsGenerator;
