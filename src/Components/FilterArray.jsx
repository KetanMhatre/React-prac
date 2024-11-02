import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

function FilterArray() {
  const users = [
    {
      username: 'john',
      id: 1,
      location: 'New York, USA',
      email: 'john.doe@example.com',
    },
    {
      username: 'jane',
      id: 2,
      location: 'London, UK',
      email: 'jane.smith@example.com',
    },
    {
      username: 'mike',
      id: 3,
      location: 'Sydney, Australia',
      email: 'mike.jones@example.com',
    },
    {
      username: 'emily',
      id: 4,
      location: 'Toronto, Canada',
      email: 'emily.davis@example.com',
    },
    {
      username: 'david',
      id: 5,
      location: 'Berlin, Germany',
      email: 'david.clark@example.com',
    },
    {
      username: 'sarah',
      id: 6,
      location: 'Paris, France',
      email: 'sarah.lee@example.com',
    },
    {
      username: 'tom',
      id: 7,
      location: 'San Francisco, USA',
      email: 'tom.brown@example.com',
    },
    {
      username: 'lisa',
      id: 8,
      location: 'Tokyo, Japan',
      email: 'lisa.white@example.com',
    },
    {
      username: 'chris',
      id: 9,
      location: 'Rome, Italy',
      email: 'chris.wilson@example.com',
    },
    {
      username: 'amy',
      id: 10,
      location: 'Cape Town, South Africa',
      email: 'amy.johnson@example.com',
    },
    {
      username: 'kevin',
      id: 11,
      location: 'Dubai, UAE',
      email: 'kevin.turner@example.com',
    },
    {
      username: 'olivia',
      id: 12,
      location: 'Mexico City, Mexico',
      email: 'olivia.martin@example.com',
    },
    {
      username: 'daniel',
      id: 13,
      location: 'São Paulo, Brazil',
      email: 'daniel.evans@example.com',
    },
    {
      username: 'anna',
      id: 14,
      location: 'Moscow, Russia',
      email: 'anna.roberts@example.com',
    },
    {
      username: 'paul',
      id: 15,
      location: 'Los Angeles, USA',
      email: 'paul.walker@example.com',
    },
  ];
  const [input, setInput] = useState('');

  const result = users.filter((user) => user.username.includes(input));
  useEffect(() => {
    console.log(result);
  }, [input]);
  return (
    <Container style={{ height: '100vh', marginTop: '2rem' }}>
      <Row className='d-flex align-items-center justify-content-center'>
        <Col md={4}>
          <Card>
            <input
              type='text'
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />

            {result.map((user) => {
              return (
                <div key={user.id} className='text-center'>
                  <h4 className='m-1'>{user.username}</h4>
                </div>
              );
            })}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FilterArray;
