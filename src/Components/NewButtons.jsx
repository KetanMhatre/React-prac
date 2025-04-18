import React, { useState } from 'react';
import { Card, InputGroup } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { Input, InputGroupText } from 'reactstrap';

function NewButtons() {
  const [replyValues, setReplyValues] = useState([]);
  const [phoneValues, setPhoneValues] = useState([]);
  const [inputText, setInputText] = useState('');
  const handleButtonClick = (type) => {
    if (clickCount[type] < maxClickCount[type]) {
      if (type === 'reply') {
        const newId = replyValues.length;
        const data = { value: '', id: newId };
        setReplyValues((prevData) => [...prevData, data]);
      } else if (type === 'phone') {
        const newId = phoneValues.length;
        const data = { value: '', id: newId };
        setPhoneValues((prevData) => [...prevData, data]);
      }
    }
    setClickCount({ ...clickCount, [type]: clickCount[type] + 1 });
  };
  const handleDelete = (type, id) => {
    if (type === 'reply') {
      const updatedReplies = replyValues
        .filter((reply) => reply.id !== id)
        .map((data, index) => ({ ...data, id: index }));
      setReplyValues(updatedReplies);
      setClickCount({ ...clickCount, reply: updatedReplies.length });
    } else if (type === 'phone') {
      const updatedPhones = phoneValues
        .filter((phone) => phone.id !== id)
        .map((data, index) => ({ ...data, id: index }));
      setPhoneValues(updatedPhones);
      setClickCount({ ...clickCount, phone: updatedPhones.length });
    }
  };
  const [clickCount, setClickCount] = useState({
    reply: 0,
    phone: 0,
  });
  const [maxClickCount, setMaxClickCount] = useState({
    reply: 5,
    phone: 3,
  });
  const maxReplyBoolean = clickCount.reply !== maxClickCount.reply;
  const maxPhoneBoolean = clickCount.phone !== maxClickCount.phone;

  const handleChange = (type, id, value) => {
    if (type === 'reply') {
      const updated = replyValues.map((reply, index) => {
        if (reply.id === id) {
          return { ...reply, value };
        }
        return reply;
      });
      setReplyValues(updated);
    }
  };

  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <Card className='p-3'>
        {replyValues?.map((reply, index) => {
          return (
            <div key={index} className='mt-2'>
              <InputGroup>
                <InputGroupText>
                  <h5 className='mb-0'>{index}</h5>
                </InputGroupText>
                <Input
                  type='text'
                  onChange={(e) =>
                    handleChange('reply', reply.id, e.target.value)
                  }
                  style={{ width: '300px' }}
                />
                <InputGroupText
                  style={{ background: 'red' }}
                  onClick={() => handleDelete('reply', reply.id)}
                >
                  <MdDelete style={{ color: 'white' }} />
                </InputGroupText>
              </InputGroup>
            </div>
          );
        })}
        {maxReplyBoolean && (
          <button
            className='btn btn-primary mt-3'
            onClick={() => handleButtonClick('reply')}
            style={{ width: '300px' }}
          >
            reply
          </button>
        )}
        {phoneValues?.map((phone, index) => {
          return (
            <div key={index} className='mt-2'>
              <InputGroup>
                <InputGroupText>
                  <h5 className='mb-0'>{index}</h5>
                </InputGroupText>
                <Input
                  type='text'
                  onChange={(e) =>
                    handleChange('phone', phone.id, e.target.value)
                  }
                  style={{ width: '300px' }}
                />
                <InputGroupText
                  style={{ background: 'red' }}
                  onClick={() => handleDelete('phone', phone.id)}
                >
                  <MdDelete style={{ color: 'white' }} />
                </InputGroupText>
              </InputGroup>
            </div>
          );
        })}
        {maxPhoneBoolean && (
          <button
            className='btn btn-primary mt-3'
            onClick={() => handleButtonClick('phone')}
            style={{ width: '300px' }}
          >
            phone
          </button>
        )}
        <button
          className='btn btn-light mt-4'
          onClick={() => {
            console.log(replyValues, phoneValues);
          }}
        >
          submit
        </button>
      </Card>
    </div>
  );
}

export default NewButtons;
