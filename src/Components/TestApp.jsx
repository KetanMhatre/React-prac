import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Input } from 'reactstrap';

function TestApp() {
  return (
    <Container>
      <Row>
        <Col md={5}>
          <div className='mt-4'>
            <Input className='w-100' />
          </div>
        </Col>
        <Col md={12}></Col>
      </Row>
    </Container>
  );
}

export default TestApp;
