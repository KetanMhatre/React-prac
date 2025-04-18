import React, { useState } from 'react';

function RandomQuestion() {
  const [move, setMove] = useState(false);
  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <div>
        <div className='border' style={{ width: '300px', height: '50px' }}>
          <div
            className={move ? 'float-end' : 'float-start'}
            style={{
              width: '50px',
              backgroundColor: 'red',
              height: '100%',
            }}
          ></div>
        </div>
      </div>
      <button className='btn btn-primary' onClick={() => setMove(!move)}>
        move
      </button>
    </div>
  );
}

export default RandomQuestion;
