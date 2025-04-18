import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// Dummy sample values for dropdown
const paramatersList = [
  { value: 'Mohit', label: 'Mohit' },
  { value: '5', label: '5' },
  { value: 'ABC123', label: 'ABC123' },
];

// Formatting helper
const getBoldStr = (text) => {
  return text
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/~(.*?)~/g, '<s>$1</s>');
};

export default function MessageBodyEditor() {
  const [useMsgBody, setMsgBody] = useState(
    'Hello {{1}}, your code will expire in {{2}} mins.'
  );
  const [Body_Parameters, setBody_Parameters] = useState([]);
  const [displayedMessage, setDisplayedMessage] = useState(useMsgBody);

  const handleBodyDisplay = (message, parameters) => {
    let uptDisplayMsg = message.replace(/{{\s*(\d+)\s*}}/g, (_, n) => {
      const replacement = parameters[n - 1];
      return replacement === '' || replacement === undefined
        ? `{{${n}}}`
        : `[${replacement}]`;
    });
    uptDisplayMsg = getBoldStr(uptDisplayMsg);
    setDisplayedMessage(uptDisplayMsg);
  };

  const handleMsgBodyChange = () => {
    try {
      let str = useMsgBody;
      let sequenceCount = (str.match(/{{\s*(\d+)\s*}}/g) || []).length;
      let sequence = Array.from({ length: sequenceCount }, (_, i) => 1 + i);

      let newParam = sequence.map((_, i) => Body_Parameters[i] || '');
      let replacedString = str.replace(
        /{{\s*(\d+)\s*}}/g,
        () => `{{${sequence.shift()}}}`
      );

      setBody_Parameters(newParam);
      setMsgBody(replacedString);
      handleBodyDisplay(replacedString, newParam);
    } catch (error) {
      console.error(error);
      setBody_Parameters([]);
      setMsgBody(useMsgBody);
    }
  };

  const handleParameterChange = (index, value) => {
    let updatedParameters = [...Body_Parameters];
    updatedParameters[index] = value;
    handleBodyDisplay(useMsgBody, updatedParameters);
    setBody_Parameters(updatedParameters);
  };

  useEffect(() => {
    handleMsgBodyChange();
  }, [useMsgBody]);

  return (
    <div className='p-3 border rounded'>
      <h4>Message Body</h4>
      <textarea
        className='form-control'
        value={useMsgBody}
        onChange={(e) => setMsgBody(e.target.value)}
        rows='5'
        maxLength={1024}
      ></textarea>
      <button
        className={`btn btn-primary mt-2 ${
          Body_Parameters.length > 9 ? 'd-none' : 'd-block'
        }`}
        onClick={() =>
          setMsgBody((prev) => `${prev}{{${Body_Parameters.length + 1}}}`)
        }
      >
        Add Parameter
      </button>

      <div className='mt-4'>
        <h5>Sample Values</h5>
        <div className='d-flex flex-column gap-2'>
          {Body_Parameters.map((param, index) => (
            <div className='d-flex align-items-center' key={index}>
              <div className='me-2'>
                <strong>{`{{ ${index + 1} }}`}</strong>
              </div>
              <div className='flex-grow-1'>
                <Select
                  options={paramatersList}
                  value={{ value: param, label: param }}
                  onChange={(e) => handleParameterChange(index, e.label)}
                  closeMenuOnSelect={true}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-4'>
        <h5>Preview</h5>
        <div
          className='border p-2 rounded bg-light'
          dangerouslySetInnerHTML={{ __html: displayedMessage }}
        ></div>
      </div>
    </div>
  );
}
