import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'reactstrap';

function MessageBodyEditorCopy() {
  const [useMsgBody, setMsgBody] = useState(
    'Hello {{1}}, your code will expire in {{2}} mins.'
  );
  const [bodyParameters, setBodyParameters] = useState([]);
  const [displayedMessage, setDisplayedMessage] = useState(useMsgBody);

  const sampleValues = [
    { label: 'David', value: 'David' },
    { label: '5', value: '5' },
    { label: 'ABC123', value: 'ABC123' },
  ];

  const getFormattedText = (text) => {
    return text
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/~(.*?)~/g, '<s>$1</s>');
  };

  const updatedDisplayedMessage = (message, parameters) => {
    let result = message.replace(/{{\s*(\d+)\s*}}/g, (_, num) => {
      const index = parseInt(num) - 1;
      return parameters[index] ? `[${parameters[index]}]` : `{{${num}}}`;
    });
    result = getFormattedText(result);
    setDisplayedMessage(result);
  };

  useEffect(() => {
    // Step 1: Count how many placeholders like {{1}}, {{2}}, etc.
    const matches = useMsgBody.match(/{{\s*(\d+)\s*}}/g) || [];
    const count = matches.length;

    const updatedParams = Array.from(
      { length: count }, //will create length
      (_, i) => bodyParameters[i] || ''
    );
    setBodyParameters(updatedParams);
    updatedDisplayedMessage(useMsgBody, updatedParams);
  }, [useMsgBody]);

  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <Card style={{ width: '1000px' }} className='p-3'>
        <Row>
          <Col md={7}>
            <textarea
              className='form-control'
              value={useMsgBody}
              onChange={(e) => setMsgBody(e.target.value)}
              rows={5}
              maxLength={1024}
            ></textarea>

            <h5 className='mt-4'>Detected Parameters</h5>
            <ul>
              {bodyParameters.map((value, index) => {
                return (
                  <div key={index} className='mb-2'>
                    <label className='form-label'>{`{{${index + 1}}}`}</label>
                    <select
                      className='form-select'
                      value={value}
                      onChange={(e) => {
                        const updated = [...bodyParameters];
                        updated[index] = e.target.value;
                        setBodyParameters(updated);
                        updatedDisplayedMessage(useMsgBody, updated);
                      }}
                    >
                      <option value=''>-- Select a value --</option>
                      {sampleValues.map((opt, i) => (
                        <option key={i} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </ul>
          </Col>
          <Col md={5}>
            <div className='mt-4'>
              <h5>Live Preview</h5>
              <div
                className='border p-2 rounded bg-light'
                dangerouslySetInnerHTML={{ __html: displayedMessage }}
              ></div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default MessageBodyEditorCopy;
