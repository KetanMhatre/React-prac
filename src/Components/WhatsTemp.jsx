import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  CardTitle,
  CardBody,
  CardText,
} from 'react-bootstrap';
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaPlusCircle,
  FaRegSmile,
  FaBold,
  FaItalic,
  FaApple,
} from 'react-icons/fa';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { IoIosAddCircle, IoIosAddCircleOutline } from 'react-icons/io';
import { BsInfoCircleFill, BsAndroid2 } from 'react-icons/bs';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

function WhatsTemp() {
  const [formData, setFormData] = useState({
    templateName: '',
    category: '',
    language: '',
    headerType: 'None',
    bodyText: '',
    footerText: '',
    textInput: '', // Added property for text input
    imageInput: null, // Added property for image input
    videoInput: null, // Added property for video input
    documentInput: null, // Added property for document input
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log('data:', formData);
    const { name, value, files } = e.target;

    // Check if the input is a file (e.g., image, video, document)
    const inputValue = files ? files[0] : value;
    console.log('data:', formData);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={6}>
            <h4>Template Name</h4>
            <FormGroup>
              <input
                className='form-control w-100'
                type='text'
                name='templateName'
                id='templateName'
                style={{ height: '40px' }}
                value={formData.templateName}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
          <Col lg={6}>
            <h4>Category</h4>
            <div>
              <FormGroup>
                <Input
                  type='select'
                  name='category'
                  id='category'
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value='AUTHENTICATION'>Authentication</option>
                  <option value='AUTHENTICATION2'>Authentication2</option>
                  <option value='AUTHENTICATION3'>Authentication3</option>
                  <option value='AUTHENTICATION3'>Authentication3</option>
                </Input>
              </FormGroup>
            </div>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col xs={12}>
            <h4>Template(s)</h4>
          </Col>
          <Col xs={12}>
            <div className='d-flex  align-items-center '>
              <p className='mb-0 me-2'>Albanian</p>
              <FormGroup className='mt-3'>
                <Input
                  type='select'
                  name='language'
                  id='language'
                  value={formData.language}
                  onChange={handleInputChange}
                  className='border border-success rounded-5'
                >
                  <option value='' disabled>
                    Add Language
                  </option>
                  <option value='Language 1'>Language 1</option>
                  <option value='Language 2'>Language 2</option>
                  <option value='Language 3'>Language 3</option>
                </Input>
              </FormGroup>
            </div>
          </Col>
          <hr className='mt-2' />
        </Row>
        <Row className='mt-4'>
          <Col lg={8}>
            <div className='left_first d-flex align-items-center justify-content-between accordion '>
              <h4 className='mb-0'>Template for Albanian Language </h4>
              <button
                type='button'
                className='btn btn-primary'
                style={{ background: 'green', border: 'none' }}
              >
                Add Sample
              </button>
            </div>
            <Card className='mt-4'>
              <CardBody>
                <h4> Header (Optional)</h4>
                <Card.Text className='mt-1'>
                  Add a title, or, select the media type you want to get
                  approved for this template's header
                </Card.Text>
                {/* <FormGroup className='mt-3'>
                  {['None', 'Text', 'Image', 'Video', 'Document'].map(
                    (label, index) => (
                      <div
                        key={`inline-radio-${index}`}
                        className='mb-3 form-check-inline'
                      >
                        <Label check>
                          <Input
                            type='radio'
                            name='headerType'
                            value={label}
                            checked={formData.headerType === label}
                            onChange={handleInputChange}
                            className='me-1'
                          />
                          {label}
                        </Label>
                      </div>
                    )
                  )}
                </FormGroup> */}
                <div>
                  {/* Your existing radio button code */}
                  <FormGroup className='mt-3'>
                    {['None', 'Text', 'Image', 'Video', 'Document'].map(
                      (label, index) => (
                        <div
                          key={`inline-radio-${index}`}
                          className='mb-3 form-check-inline'
                        >
                          <Label check>
                            <Input
                              type='radio'
                              name='headerType'
                              value={label}
                              checked={formData.headerType === label}
                              onChange={handleInputChange}
                              className='me-1'
                            />
                            {label}
                          </Label>
                        </div>
                      )
                    )}
                  </FormGroup>

                  {/* Input fields based on the selected type */}
                  {formData.headerType === 'Text' && (
                    <div>
                      <Label for='textInput'>Text Input:</Label>
                      <Input
                        type='text'
                        id='textInput'
                        name='textInput'
                        value={formData.textInput}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  {formData.headerType === 'Image' && (
                    <div>
                      <Label for='imageInput'>Image Input:</Label>
                      <Input
                        type='file'
                        id='imageInput'
                        name='imageInput'
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  {formData.headerType === 'Video' && (
                    <div>
                      <Label for='videoInput'>Video Input:</Label>
                      <Input
                        type='file' // You can adjust the type as per your requirements
                        id='videoInput'
                        name='videoInput'
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  {formData.headerType === 'Document' && (
                    <div>
                      <Label for='documentInput'>Document Input:</Label>
                      <Input
                        type='file' // You can adjust the type as per your requirements
                        id='documentInput'
                        name='documentInput'
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
            <Card className='mt-4'>
              <Card.Body>
                <h4>Body</h4>
                <Card.Text className='mt-1'>
                  The Whatsapp message in the language you have selected
                </Card.Text>
                <textarea
                  className='form-control'
                  style={{ width: '100%', height: '200px', resize: 'none' }}
                  name='bodyText'
                  id='bodyText'
                  value={formData.bodyText}
                  onChange={handleInputChange}
                ></textarea>
                <div className='d-flex justify-content-between mt-2'>
                  <div className='left_side d-flex align-items-center gap-2'>
                    <IoIosAddCircle className='fs-4' />
                    <p className='mb-0 '>Add variable</p>
                    <BsInfoCircleFill className='fs-5 ' />
                  </div>
                  <div className='right_side d-flex align-items-center gap-2'>
                    <FaRegSmile />
                    <FaBold />
                    <FaItalic />
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card className='mt-4'>
              <CardBody>
                <h4>Footer (Optional)</h4>
                <CardText className='mt-1'>
                  Add a short line of text to the bottom of your message
                  template.
                </CardText>
                <FormGroup>
                  <input
                    type='text'
                    className='w-100 p-2 form-control'
                    name='footerText'
                    id='footerText'
                    value={formData.footerText}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </CardBody>
            </Card>
            <Card className='mt-4'>
              <CardBody>
                <h4>Buttons Optional</h4>
                <CardText>
                  Create buttons that let customers respond to your message or
                  take action.
                </CardText>
              </CardBody>
            </Card>
            <Button type='submit' className='btn-primary text-end '>
              Submit
            </Button>
          </Col>
          <Col md={4} className='mt-5'>
            <Card>
              <CardBody>
                <div className='d-flex justify-content-between align-items-center'>
                  <h4 className='mb-0'>Preview</h4>
                  <div className='d-flex gap-2 fs-5'>
                    <BsAndroid2 />
                    <FaApple />
                  </div>
                </div>
                <hr />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default WhatsTemp;
