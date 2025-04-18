import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'reactstrap';

const sampleValues = [
  { label: 'David', value: 'David' },
  { label: '5', value: '5' },
  { label: 'ABC123', value: 'ABC123' },
];

// 🔧 Converts *bold*, _italic_, ~strike~ into HTML
const applyFormatting = (text) => {
  return text
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/~(.*?)~/g, '<s>$1</s>');
};

// 🔧 Replaces {{n}} with values and applies formatting
const renderPreview = (template, values) => {
  const filled = template.replace(/{{\s*(\d+)\s*}}/g, (_, num) => {
    const index = parseInt(num, 10) - 1;
    return values[index] ? `[${values[index]}]` : `{{${num}}}`;
  });
  return applyFormatting(filled);
};

function MessageBodyEditorOptimized() {
  const [template, setTemplate] = useState(
    'Hello {{1}}, your code will expire in {{2}} mins.'
  );
  const [paramValues, setParamValues] = useState([]);
  const [preview, setPreview] = useState('');

  // 🔁 Update parameters when template changes
  useEffect(() => {
    const matchCount = (template.match(/{{\s*\d+\s*}}/g) || []).length;
    const newParams = Array.from(
      { length: matchCount },
      (_, i) => paramValues[i] || ''
    );
    setParamValues(newParams);
    setPreview(renderPreview(template, newParams));
  }, [template]);

  // 🛠 Handle dropdown change
  const handleParamChange = (index, value) => {
    const updated = [...paramValues];
    updated[index] = value;
    setParamValues(updated);
    setPreview(renderPreview(template, updated));
  };

  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <Card style={{ width: '1000px' }} className='p-3'>
        <Row>
          {/* Message input and parameter selection */}
          <Col md={7}>
            <h5>Message Template</h5>
            <textarea
              className='form-control'
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              rows={5}
              maxLength={1024}
            />

            <h5 className='mt-4'>Parameter Values</h5>
            {paramValues.map((val, index) => (
              <div key={index} className='mb-2'>
                <label className='form-label'>{`{{${index + 1}}}`}</label>
                <select
                  className='form-select'
                  value={val}
                  onChange={(e) => handleParamChange(index, e.target.value)}
                >
                  <option value=''>-- Select a value --</option>
                  {sampleValues.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </Col>

          {/* Live preview */}
          <Col md={5}>
            <div className='mt-4'>
              <h5>Live Preview</h5>
              <div
                className='border p-2 rounded bg-light'
                dangerouslySetInnerHTML={{ __html: preview }}
              ></div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default MessageBodyEditorOptimized;
