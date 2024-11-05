import React, { useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Input } from 'reactstrap';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });
  const setChange = (e, type) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <Row className='py-4'>
        <h4>React forms</h4>
      </Row>
      <Card className='p-3' style={{ backgroundColor: '#f7fafc' }}>
        <Row>
          <form onSubmit={handleSubmit}>
            <div className='mt-3'>
              <p>Name</p>
              <Input
                type='text'
                name='name'
                onChange={(e) => {
                  setChange(e, 'name');
                }}
              />
            </div>
            <div className='mt-3'>
              <p>Last Name</p>
              <Input type='text' name='lastName' onChange={setChange} />
            </div>
            <div className='mt-3'>
              <p>Email</p>
              <Input type='email' name='email' onChange={setChange} />
            </div>
            <div className='mt-3'>
              <p>Password</p>
              <Input
                type='password'
                name='password'
                onChange={(e) => {
                  setChange(e, 'password');
                }}
              />
            </div>
            <button className='btn btn-primary mt-3 py-2 '>submit form</button>
          </form>
        </Row>
      </Card>
    </div>
  );
}

export default SignupForm;
