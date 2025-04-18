import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

const UserForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    personalInfo: { name: '', email: '', phone: '' },
    addresses: [{ street: '', city: '', state: '', zip: '' }],
    skills: [{ skillName: '', proficiency: '' }],
  });

  // State for form errors
  const [formErrors, setFormErrors] = useState({});

  // Handler for input change in nested fields
  const handleChange = (section, index, field, value) => {
    const updatedSection = formData[section].map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, [section]: updatedSection });
  };

  // Handler for single input change (for personal info)
  const handlePersonalInfoChange = (field, value) => {
    setFormData({
      ...formData,
      personalInfo: { ...formData.personalInfo, [field]: value },
    });
  };

  // Function to add a new address or skill
  const handleAddField = (section) => {
    const newField =
      section === 'addresses'
        ? { street: '', city: '', state: '', zip: '' }
        : { skillName: '', proficiency: '' };
    setFormData({
      ...formData,
      [section]: [...formData[section], newField],
    });
  };

  // Validation function (basic)
  const validateForm = () => {
    const errors = {};
    if (!formData.personalInfo.name) errors.name = 'Name is required';
    if (!formData.personalInfo.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      errors.email = 'Invalid email format';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted', formData);
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <Card className='p-4 m-3 shadow'>
      <Card.Body>
        <Card.Title className='text-primary'>User Registration Form</Card.Title>

        <Form onSubmit={handleSubmit}>
          <h4 className='mt-4'>Personal Information</h4>
          <Row>
            <Col md={4}>
              <Form.Group controlId='formName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={formData.personalInfo.name}
                  onChange={(e) =>
                    handlePersonalInfoChange('name', e.target.value)
                  }
                  isInvalid={!!formErrors.name}
                />
                <Form.Control.Feedback type='invalid'>
                  {formErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId='formEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    handlePersonalInfoChange('email', e.target.value)
                  }
                  isInvalid={!!formErrors.email}
                />
                <Form.Control.Feedback type='invalid'>
                  {formErrors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId='formPhone'>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type='tel'
                  placeholder='Enter phone number'
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    handlePersonalInfoChange('phone', e.target.value)
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <h4 className='mt-4'>Addresses</h4>
          {formData.addresses.map((address, index) => (
            <Card key={index} className='p-3 mb-3'>
              <Row>
                <Col md={3}>
                  <Form.Group controlId={`formStreet${index}`}>
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Street'
                      value={address.street}
                      onChange={(e) =>
                        handleChange(
                          'addresses',
                          index,
                          'street',
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group controlId={`formCity${index}`}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='City'
                      value={address.city}
                      onChange={(e) =>
                        handleChange('addresses', index, 'city', e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group controlId={`formState${index}`}>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='State'
                      value={address.state}
                      onChange={(e) =>
                        handleChange(
                          'addresses',
                          index,
                          'state',
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group controlId={`formZip${index}`}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Zip'
                      value={address.zip}
                      onChange={(e) =>
                        handleChange('addresses', index, 'zip', e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          ))}
          <Button variant='info' onClick={() => handleAddField('addresses')}>
            Add Address
          </Button>

          <h4 className='mt-4'>Skills</h4>
          {formData.skills.map((skill, index) => (
            <Row key={index} className='mb-3'>
              <Col md={6}>
                <Form.Group controlId={`formSkillName${index}`}>
                  <Form.Label>Skill Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Skill Name'
                    value={skill.skillName}
                    onChange={(e) =>
                      handleChange('skills', index, 'skillName', e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId={`formProficiency${index}`}>
                  <Form.Label>Proficiency Level</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Proficiency Level'
                    value={skill.proficiency}
                    onChange={(e) =>
                      handleChange(
                        'skills',
                        index,
                        'proficiency',
                        e.target.value
                      )
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          ))}

          <Button variant='info' onClick={() => handleAddField('skills')}>
            Add Skill
          </Button>

          <div>
            <Button type='submit' variant='primary' className='mt-4'>
              Submit
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserForm;
