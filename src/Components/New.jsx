import React, { useEffect, useState } from 'react';

function New() {
  const [storeData, setStoreData] = useState([]);
  const [userText, setUserText] = useState('');

  const handleClick = () => {
    if (userText) {
      setStoreData((prevData) => [...prevData, userText]);
      setUserText('');
    }
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserText((prevText) => ({ ...prevText, [name]: value }));
  // };
  return (
    <div>
      <input
        type='text'
        name='userText'
        id='userText'
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
      />
      <button type='submit' onClick={handleClick}>
        add
      </button>
    </div>
  );
}

export default New;
