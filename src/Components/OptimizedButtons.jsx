import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { IoMdTrash } from 'react-icons/io';
import { Input, InputGroup, InputGroupText } from 'reactstrap';

function OptimizedButtons() {
  const [replyData, setReplyData] = useState([]);
  const [phoneData, setPhoneData] = useState([]);
  const [emailData, setEmailData] = useState([]);

  const [clickCounts, setClickCounts] = useState({
    reply: 0,
    phone: 0,
    email: 0,
  });
  const [maxClicks, setMaxClick] = useState({
    reply: 3,
    phone: 5,
    email: 4,
  });

  const dataMap = {
    reply: { data: replyData, setData: setReplyData },
    phone: { data: phoneData, setData: setPhoneData },
    email: { data: emailData, setData: setEmailData },
  };

  const handleButtonClick = (type, max) => {
    if (clickCounts[type] < max) {
      const newId = dataMap[type].data.length;
      const data = { id: newId, value: '' };

      dataMap[type].setData((prevData) => [...prevData, data]);
      setClickCounts({ ...clickCounts, [type]: clickCounts[type] + 1 });
    }
  };

  const handleChange = (type, id, value) => {
    const { data, setData } = dataMap[type];
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, value } : item
    );
    setData(updatedData);
  };

  const handleRemoveData = (type, index) => {
    const { data, setData } = dataMap[type];
    const updatedData = data
      .filter((item) => item.id !== index)
      .map((item, id) => ({ ...item, id }));
    setData(updatedData);
    setClickCounts({ ...clickCounts, [type]: updatedData.length });
  };

  const handleSubmit = () => {
    console.log(replyData, phoneData, emailData);
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
        <button
          className='btn btn-primary'
          onClick={() => {
            handleButtonClick('email', maxClicks.email);
          }}
          disabled={clickCounts.email >= maxClicks.email}
        >
          email
        </button>
        {emailData.map((data, index) => {
          return (
            <div key={index}>
              <InputGroup>
                <InputGroupText>{`{{${index}}}`}</InputGroupText>
                <Input
                  onChange={(e) => handleChange('email', index, e.target.value)}
                />
                <InputGroupText
                  className='btn btn-danger'
                  onClick={() => handleRemoveData('email', index)}
                >
                  <IoMdTrash />
                </InputGroupText>
              </InputGroup>
            </div>
          );
        })}
        <button
          type='submit'
          onClick={handleSubmit}
          className='btn btn-primary'
        >
          Submit
        </button>
      </Card>
    </div>
  );
}

export default OptimizedButtons;
