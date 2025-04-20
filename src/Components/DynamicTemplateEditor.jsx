import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'reactstrap';
import Select from 'react-select'; // Importing react-select

const dropdownOptions = [
  { value: 'Mohit', label: 'Mohit' },
  { value: '5', label: '5' },
  { value: 'ABC123', label: 'ABC123' },
];

function DynamicTemplateEditor() {
  const [inputText, setInputText] = useState(
    'Hello {{1}}, your code will expire in {{2}} mins.'
  );
  const [placeHolders, setPlaceHolders] = useState([]);
  const [placeHolderValues, setPlaceHolderValues] = useState([]);

  useEffect(() => {
    const regex = /{{\s*(\d+)\s*}}/g;
    const matches = [...inputText.matchAll(regex)];
    const uniquePlaceHolders = [...new Set(matches.map((m) => m[0]))];
    setPlaceHolders(uniquePlaceHolders);
  }, [inputText]);

  const handleSelectChange = (placeHolder, selectedOption) => {
    setPlaceHolderValues((prev) => ({
      ...prev,
      [placeHolder]: selectedOption ? selectedOption.value : '',
    }));
  };

  const insertNextPlaceHolder = () => {
    const existingNumbers = placeHolders.map((ph) =>
      parseInt(ph.replace(/[{}]/g, ''))
    );

    let nextNumber = 1;
    while (existingNumbers.includes(nextNumber)) {
      nextNumber++;
    }

    const newPlaceHolder = `{{${nextNumber}}}`;
    setInputText((prev) => prev + '' + newPlaceHolder);
  };

  const renderPreview = () => {
    let result = inputText;
    for (const key in placeHolderValues) {
      const value = placeHolderValues[key];
      if (value) {
        result = result.split(key).join(value);
      }
    }
    return result;
  };

  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <Card className='p-3 gap-2' style={{ width: '800px' }}>
        <Row>
          <Col md={8}>
            <textarea
              className='w-100'
              name='inputText'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={10}
            ></textarea>
            <button
              className='btn btn-primary mt-2'
              onClick={() => insertNextPlaceHolder()}
            >
              Add PlaceHolder
            </button>
          </Col>
          <Col>
            <h5>Live Preview:</h5>
            <div className='border p-2 rounded bg-light'>{renderPreview()}</div>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <h5 className='mt-3'>Detected Placeholders:</h5>
            {placeHolders.map((ph, i) => {
              return (
                <div key={i} className='d-flex align-items-center gap-2 mb-2'>
                  <strong>{ph}</strong>
                  <Select
                    className='w-100'
                    value={
                      placeHolderValues[ph]
                        ? {
                            value: placeHolderValues[ph],
                            label: placeHolderValues[ph],
                          }
                        : null
                    }
                    onChange={(selectedOption) =>
                      handleSelectChange(ph, selectedOption)
                    }
                    options={dropdownOptions}
                    placeholder='Select Value'
                    isClearable
                  />
                </div>
              );
            })}
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default DynamicTemplateEditor;
