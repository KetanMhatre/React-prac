import React, { useState } from 'react';

function DeleteForm() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = () => {
    console.log(userData);
  };
  return (
    <div>
      <form>
        <h4>Name</h4>
        <input
          name='name'
          type='text'
          value={userData.name}
          onChange={handleChange}
        />
        <h4>Email</h4>
        <input
          name='email'
          type='email'
          value={userData.email}
          onChange={handleChange}
        />
        <h4>password</h4>
        <input
          name='password'
          type='password'
          value={userData.password}
          onChange={handleChange}
        />
        <button onClick={handleSubmit} type='button'>
          submit
        </button>
      </form>
    </div>
  );
}

export default DeleteForm;
