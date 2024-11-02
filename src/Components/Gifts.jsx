import React, { useEffect, useState } from 'react';

function Gifts() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');

  const gifts = ['crackers', 'clothes', 'sweets', 'vehicle', 'gadget'];

  const handleAddPerson = () => {
    if (text.trim()) {
      setUsers((prevPersons) => [...prevPersons, { userName: text, gift: '' }]);
      setText('');
    }
  };

  const handleRemovePerson = (userName) => {
    setUsers(users.filter((user) => user.userName !== userName));
  };

  const handleAssignGifts = () => {
    const shuffledGifts = [...gifts].sort(() => Math.random() - 0.5);

    setUsers((prevUsers) =>
      prevUsers.map((user, index) => ({
        ...user,
        gift: shuffledGifts[index % shuffledGifts.length],
      }))
    );
  };

  const handleReset = () => {
    setUsers((prevUser) =>
      prevUser.map((user) => ({
        ...user,
        gift: '',
      }))
    );
  };

  return (
    <div
      className='d-flex justify-content-center'
      style={{ marginTop: '5rem' }}
    >
      <div>
        <input
          type='text'
          name='text'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button onClick={handleAddPerson}>add person</button>
        {users.map((user) => {
          return (
            <div className='d-flex mt-2 gap-2' key={user.userName}>
              <h5>
                {user.userName} - {user.gift ? user.gift : 'No gifts assigned'}
              </h5>
              <button onClick={() => handleRemovePerson(user.userName)}>
                remove
              </button>
            </div>
          );
        })}
        <div className='d-flex gap-4 mt-2'>
          <button onClick={handleAssignGifts}>assign gifts</button>
          <button>shuffle gifts</button>
          <button onClick={handleReset}>reset</button>
        </div>
      </div>
    </div>
  );
}

export default Gifts;
