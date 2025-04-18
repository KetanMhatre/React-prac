import React, { useState } from 'react';
import { Input } from 'reactstrap';

function Calculator() {
  const [input, setInput] = useState(0);
  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <Input
        name='input'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

export default Calculator;
