import React, { useState } from 'react';

function GenericSingleFieldForm() {
  const [userText, setUserText] = useState('');
  const CustomHandleChange = (e) => {
    setUserText(e.target.value);
  };

  const CustomHandleSubmit = (e) => {
    e.preventDefault();
    console.log(userText);
  };
  return (
    <div>
      <form onSubmit={CustomHandleSubmit}>
        <input
          type='text'
          name='userText'
          id='userText'
          onChange={CustomHandleChange}
          // onChange={(e) => setUserText(e.target.value)} //without function we can handle data directly 
        />
        <button className='btn btn-primary'>submit</button>
      </form>
    </div>
  );
}

export default GenericSingleFieldForm;
