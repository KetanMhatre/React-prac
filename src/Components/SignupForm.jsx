import React, { useState } from 'react';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });
  const setChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='d-flex'>
          <h3>Name</h3>
          <input type='text' name='name' onChange={setChange} />
        </div>
        <div className='d-flex'>
          <h3>Last Name</h3>
          <input type='text' name='lastName' onChange={setChange} />
        </div>
        <div className='d-flex'>
          <h3>Email</h3>
          <input type='email' name='email' onChange={setChange} />
        </div>
        <div className='d-flex'>
          <h3>Password</h3>
          <input type='password' name='password' onChange={setChange} />
        </div>
        <button type='btn'>submit</button>
      </form>
    </div>
  );
}

export default SignupForm;
