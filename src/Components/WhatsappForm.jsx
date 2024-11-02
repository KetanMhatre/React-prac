import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';

import Select from 'react-select';
import { InputGroupText, Input } from 'reactstrap';
import { MdDelete } from 'react-icons/md';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const headerOptions = ['none', 'text', 'image', 'video', 'document'];

function WhatsappTemplates() {
  const [userData, setUserData] = useState({
    templateName: '',
    category: '',
    headerType: '',
    headerTextValue: '',
    headerImageValue: '',
    headerVideoValue: '',
    headerDocumentValue: '',
    bodyTextValue: '',
    footerTextValue: '',
  });

  const handleChange = (e, type, index) => {
    if (type === 'radioButtons') {
      setUserData((prevData) => ({
        ...prevData,
        headerType: e.target.value,
      }));
    } else if (type === 'categoryOptions') {
      setUserData((prevData) => ({
        ...prevData,
        category: e.value,
      }));
    } else if (type === 'headerImage') {
      const base = e.target.files[0];
      if (!base.type.startsWith('image')) {
        console.log('please upload an image');
      }
      setUserData((prevData) => ({
        ...prevData,
        headerImageValue: base.name,
      }));
    } else if (type === 'headerVideo') {
      const base = e.target.files[0];
      if (!base.type.startsWith('video')) {
        console.log('please upload an video');
      }
      setUserData((prevData) => ({
        ...prevData,
        headerImageValue: base.name,
      }));
    } else if (type === 'headerDocument') {
      const base = e.target.files[0];
      if (!base.type.startsWith('application')) {
        console.log('please upload an file');
      }
      setUserData((prevData) => ({
        ...prevData,
        headerImageValue: base.name,
      }));
    } else if (type === 'websiteUrl') {
      const { value } = e.target;
      setWebsitesURL((prevData) =>
        prevData.map((website, i) =>
          i === index ? { ...website, value: value } : website
        )
      );
    } else if (type === 'phoneNumbers') {
      const { value } = e.target;
      setPhoneNumbers((prevData) =>
        prevData.map((numbers, i) =>
          i === index ? { ...numbers, value: value } : numbers
        )
      );
    } else if (type === 'quickReplies') {
      const { value } = e.target;
      setQuickReplies((prevData) =>
        prevData.map((replies, i) =>
          i === index ? { ...replies, value: value } : replies
        )
      );
    } else {
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [bodyVariables, setBodyVariables] = useState([]);
  const [counter, setCounter] = useState(1);

  const addVariableFunc = () => {
    const newVariable = { id: counter, value: '' };
    setBodyVariables([...bodyVariables, newVariable]);
    setCounter(counter + 1);
  };
  const handleBodyInputChange = (id, value) => {
    // Update the specific variable's value based on its id
    const updatedVariables = bodyVariables.map((variable) => {
      if (variable.id === id) {
        return { ...variable, value }; // Update only the targeted variable
      }
      return variable;
    });
    setBodyVariables(updatedVariables); // Update state with modified array
  };

  const [websitesURL, setWebsitesURL] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [quickReplies, setQuickReplies] = useState([]);

  const [clickCounts, setClickCounts] = useState({
    websitesURL: 0,
    phoneNumbers: 0,
    quickReplies: 0,
  });

  const handleAddInputField = (type, max) => {
    if (clickCounts[type] < max) {
      if (type === 'websitesURL') {
        const object = { id: clickCounts.websitesURL, value: '' };
        setWebsitesURL([...websitesURL, object]);
      } else if (type === 'phoneNumbers') {
        const object = { id: clickCounts.phoneNumbers, value: '' };
        setPhoneNumbers([...phoneNumbers, object]);
      } else if (type === 'quickReplies') {
        const object = { id: clickCounts.quickReplies, value: '' };
        setQuickReplies([...quickReplies, object]);
      }

      setClickCounts({
        ...clickCounts,
        [type]: clickCounts[type] + 1,
      });
    }
  };

  const deleteButton = (type, id) => {
    if (type === 'websiteUrl') {
      setClickCounts((prevData) => ({
        ...prevData,
        websitesURL: prevData.websitesURL - 1,
      }));
      setWebsitesURL(websitesURL.filter((website) => website.id !== id));
    } else if (type === 'phoneNumbers') {
      setClickCounts((prevData) => ({
        ...prevData,
        phoneNumbers: prevData.phoneNumbers - 1,
      }));
      setPhoneNumbers(phoneNumbers.filter((number) => number.id !== id));
    } else {
      setClickCounts((prevData) => ({
        ...prevData,
        quickReplies: prevData.quickReplies - 1,
      }));
      setQuickReplies(quickReplies.filter((reply) => reply.id !== id));
    }
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    console.log(userData);
    console.log(websitesURL);
    console.log(phoneNumbers);
    console.log(quickReplies);
    
    
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardBody>
            <Row>
              <Col md={6}>
                <h4>Template Name</h4>
                <input
                  type='text'
                  name='templateName'
                  value={setUserData.templateName}
                  onChange={handleChange}
                  className='w-100 h-50'
                />
              </Col>
              <Col md={6} className='mt-4 mt-md-0'>
                <h4>Category</h4>
                <Select
                  options={options}
                  name='category'
                  value={setUserData.category}
                  onChange={(e) => handleChange(e, 'categoryOptions')}
                />
              </Col>
              <Col md={7} className='mt-4'>
                <Row>
                  <Col md={12}>
                    <Card className='p-2'>
                      <CardBody>
                        <h4>Header</h4>
                        <p>
                          Add a title, or, select the media type you want to get
                          approved for this template's header
                        </p>
                        <div className='d-flex align-items-center gap-3'>
                          {headerOptions.map((option) => {
                            return (
                              <div key={option}>
                                <input
                                  type='radio'
                                  name={option}
                                  id={option}
                                  className='me-2'
                                  value={option}
                                  checked={userData.headerType === option}
                                  onChange={(e) =>
                                    handleChange(e, 'radioButtons')
                                  }
                                />
                                <label
                                  className='text-capitalize'
                                  htmlFor={option}
                                >
                                  {option}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                        <div className='mt-4'>
                          {userData.headerType === 'text' && (
                            <div>
                              <h5>Header Text</h5>
                              <input
                                type='text'
                                className='w-100'
                                name='headerTextValue'
                                value={userData.headerTextValue}
                                onChange={handleChange}
                                style={{ height: '35px' }}
                              />
                            </div>
                          )}
                          {userData.headerType === 'image' && (
                            <div className='mt-1'>
                              <input
                                type='file'
                                className='d-none'
                                name='headerImageValue'
                                id='headerImageValue'
                                onChange={(e) => handleChange(e, 'headerImage')}
                              />
                              <label
                                htmlFor='headerImageValue'
                                className='btn btn-primary w-100'
                                style={{ fontSize: '1rem' }}
                              >
                                click here to select a image
                              </label>
                            </div>
                          )}
                          {userData.headerType === 'video' && (
                            <div>
                              <input
                                type='file'
                                className='d-none'
                                name='headerVideoValue'
                                id='headerVideoValue'
                                onChange={(e) => handleChange(e, 'headerVideo')}
                              />
                              <label
                                htmlFor='headerVideoValue'
                                className='btn btn-primary w-100'
                                style={{ fontSize: '1rem' }}
                              >
                                click here to select a video
                              </label>
                            </div>
                          )}
                          {userData.headerType === 'document' && (
                            <div>
                              <input
                                type='file'
                                className='d-none'
                                name='headerDocumentValue'
                                id='headerDocumentValue'
                                onChange={(e) =>
                                  handleChange(e, 'headerDocument')
                                }
                              />
                              <label
                                htmlFor='headerDocumentValue'
                                className='btn btn-primary w-100'
                                style={{ fontSize: '1rem' }}
                              >
                                click here to select a document
                              </label>
                            </div>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={12} className='mt-4'>
                    <Card>
                      <CardBody>
                        <h4>Body</h4>
                        <p>
                          The Whatsapp message in the language you have selected
                        </p>
                        <div>
                          <textarea
                            name='bodyTextValue'
                            id='bodyTextValue'
                            rows={5}
                            className='w-100'
                            onChange={handleChange}
                            value={userData.bodyTextValue}
                          />
                          <Button
                            className='btn btn-primary mt-2'
                            onClick={addVariableFunc}
                          >
                            Add Variable
                          </Button>
                          {bodyVariables.map((variable) => {
                            return (
                              <InputGroup
                                key={variable.id}
                                className='mb-2 mt-3'
                              >
                                <InputGroupText>
                                  {`{{${variable.id}}}`}
                                </InputGroupText>
                                <Input
                                  placeholder='Enter value'
                                  value={variable.value}
                                  onChange={(e) =>
                                    handleBodyInputChange(
                                      variable.id,
                                      e.target.value
                                    )
                                  }
                                />
                              </InputGroup>
                            );
                          })}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={12} className='mt-4'>
                    <Card>
                      <CardBody>
                        <h4>Footer (Optional)</h4>
                        <p>
                          Add a short line of text to the bottom of your message
                          template.
                        </p>
                        <input
                          type='text'
                          name='footerTextValue'
                          onChange={handleChange}
                          value={userData.footerTextValue}
                          className='w-100'
                        />
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={12} className='mt-4'>
                    <Card>
                      <CardBody>
                        <h4>Buttons (Optional)</h4>
                        <p>
                          Create buttons that let customers respond to your
                          message or take action.
                        </p>
                        <div className='d-flex flex-column gap-3 '>
                          {websitesURL.map((input, index) => (
                            <div key={index}>
                              <InputGroup>
                                <InputGroupText>{input.id}</InputGroupText>
                                <Input
                                  value={input.value}
                                  onChange={(e) =>
                                    handleChange(e, 'websiteUrl', index)
                                  }
                                />
                                <Button
                                  onClick={() =>
                                    deleteButton('websiteUrl', input.id)
                                  }
                                >
                                  <MdDelete />
                                </Button>
                              </InputGroup>
                            </div>
                          ))}
                          <button
                            className='btn btn-outline-primary w-25'
                            onClick={() =>
                              handleAddInputField('websitesURL', 3)
                            }
                          >
                            Add websites Url
                          </button>
                          {phoneNumbers.map((input, index) => (
                            <div key={index}>
                              <InputGroup>
                                <InputGroupText>{input.id}</InputGroupText>
                                <Input
                                  value={input.value}
                                  onChange={(e) =>
                                    handleChange(e, 'phoneNumbers', index)
                                  }
                                />
                                <Button
                                  onClick={() =>
                                    deleteButton('phoneNumbers', input.id)
                                  }
                                >
                                  <MdDelete />
                                </Button>
                              </InputGroup>
                            </div>
                          ))}
                          <button
                            className='btn btn-outline-primary w-25'
                            onClick={() =>
                              handleAddInputField('phoneNumbers', 2)
                            }
                          >
                            Add Phone Number
                          </button>
                          {quickReplies.map((input, index) => (
                            <div key={index}>
                              <InputGroup>
                                <InputGroupText>{input.id}</InputGroupText>

                                <Input
                                  value={input.value}
                                  onChange={(e) =>
                                    handleChange(e, 'quickReplies', index)
                                  }
                                />
                                <Button
                                  onClick={() =>
                                    deleteButton('quickReplies', input.id)
                                  }
                                >
                                  <MdDelete />
                                </Button>
                              </InputGroup>
                            </div>
                          ))}
                          <button
                            className='btn btn-outline-primary w-25'
                            onClick={() =>
                              handleAddInputField('quickReplies', 5)
                            }
                          >
                            Add Quick Replies
                          </button>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col md={5} className='mt-4'>
                <Card>
                  <CardBody>
                    <h4>Preview</h4>
                    <div></div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Button type='submit' className='btn btn-primary mt-3'>
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default WhatsappTemplates;
