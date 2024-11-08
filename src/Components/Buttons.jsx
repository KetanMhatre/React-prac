import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { IoMdTrash } from 'react-icons/io';
import { Input, InputGroup, InputGroupText } from 'reactstrap';

function Buttons() {
  const [replyData, setReplyData] = useState([]);
  const [phoneData, setPhoneData] = useState([]);

  const [clickCounts, setClickCounts] = useState({
    reply: 0,
    phone: 0,
  });
  const [maxClicks, setMaxClick] = useState({
    reply: 3,
    phone: 5,
  });

  const handleButtonClick = (type, max) => {
    if (clickCounts[type] < max) {
      if (type === 'reply') {
        const newId = replyData.length;
        const data = { id: newId, value: '' };
        setReplyData((prevData) => [...prevData, data]);
      } else if (type === 'phone') {
        const newId = phoneData.length;
        const data = { id: newId, value: '' };
        setPhoneData((prevData) => [...prevData, data]);
      }
    }
    setClickCounts({ ...clickCounts, [type]: clickCounts[type] + 1 });
  };

  const handleChange = (type, id, value) => {
    if (type === 'reply') {
      const updatedReplyData = replyData.map((data) => {
        if (data.id === id) {
          return { ...data, value: value };
        }
        return data;
      });
      setReplyData(updatedReplyData);
    } else if (type === 'phone') {
      const updatePhoneData = phoneData.map((data) => {
        if (data.id === id) {
          return { ...data, value: value };
        }
        return data;
      });
      setPhoneData(updatePhoneData);
    }
  };

  const handleRemoveData = (type, index) => {
    if (type === 'reply') {
      const updatedReplyData = replyData
        .filter((data) => data.id !== index)
        .map((data, index) => ({ ...data, id: index }));
      setReplyData(updatedReplyData);
      setClickCounts({ ...clickCounts, reply: updatedReplyData.length });
    } else if (type === 'phone') {
      const updatePhoneData = phoneData
        .filter((data) => data.id !== index)
        .map((data, index) => ({ ...data, id: index }));
      setPhoneData(updatePhoneData);
      setClickCounts({ ...clickCounts, phone: updatePhoneData.length });
    }
  };

  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <Card className='p-3 gap-2' style={{ width: '500px' }}>
        <button
          className='btn btn-primary'
          onClick={() => {
            handleButtonClick('reply', maxClicks.reply);
          }}
          disabled={clickCounts.reply >= maxClicks.reply}
        >
          reply
        </button>
        {replyData.map((data, index) => {
          return (
            <div key={index}>
              <InputGroup>
                <InputGroupText>{`{{${index}}}`}</InputGroupText>
                <Input
                  onChange={(e) => handleChange('reply', index, e.target.value)}
                />
                <InputGroupText
                  className='btn btn-danger'
                  onClick={() => handleRemoveData('reply', index)}
                >
                  <IoMdTrash />
                </InputGroupText>
              </InputGroup>
            </div>
          );
        })}
        <button
          className='btn btn-primary'
          onClick={() => {
            handleButtonClick('phone', maxClicks.phone);
          }}
          disabled={clickCounts.phone >= maxClicks.phone}
        >
          phone Number
        </button>
        {phoneData.map((data, index) => {
          return (
            <div key={index}>
              <InputGroup>
                <InputGroupText>{`{{${index}}}`}</InputGroupText>
                <Input
                  onChange={(e) => handleChange('phone', index, e.target.value)}
                />
                <InputGroupText
                  className='btn btn-danger'
                  onClick={() => handleRemoveData('phone', index)}
                >
                  <IoMdTrash />
                </InputGroupText>
              </InputGroup>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

export default Buttons;
