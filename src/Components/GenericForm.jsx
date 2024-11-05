import React, { useState } from 'react';
import { Input } from 'reactstrap';
import { countries } from '../utils/data';

function GenericForm() {
  const [userText, setUserText] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
  });
  const CustomHandleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setUserText((previousData) => ({ ...previousData, [name]: value }));
  };

  const CustomHandleSubmit = (e) => {
    e.preventDefault();
    console.log(userText);
  };
  return (
    <div>
      <form onSubmit={CustomHandleSubmit}>
        <h5>name</h5>
        <Input
          type='text'
          name='firstName'
          id='firstName'
          value={userText.firstName}
          onChange={CustomHandleChange}
        />
        <h5>last name</h5>
        <Input
          type='text'
          name='lastName'
          id='lastName'
          value={userText.lastName}
          onChange={CustomHandleChange}
        />
        <h5>email</h5>
        <Input
          type='email'
          name='email'
          id='email'
          value={userText.email}
          onChange={CustomHandleChange}
        />
        <h5>password</h5>
        <Input
          type='text'
          name='password'
          id='password'
          value={userText.password}
          onChange={CustomHandleChange}
        />
        <h5 className='mt-2'>select country</h5>
        <select
          name='country'
          id=''
          className='w-100'
          style={{ height: '30px' }}
          onChange={CustomHandleChange}
        >
          {countries.map((data, index) => {
            return (
              <option key={index} value={data}>
                {data}
              </option>
            );
          })}
        </select>
        <button className='btn btn-primary mt-4'>submit</button>
      </form>
    </div>
  );
}

export default GenericForm;
