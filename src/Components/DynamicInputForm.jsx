import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const DynamicInputForm = () => {
  const [inputs, setInputs] = useState([]);
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    const regex = /\{\{(\d+)\}\}/g;
    let match;
    const newInputs = [];
    while ((match = regex.exec(value)) !== null) {
      newInputs.push({ id: Date.now() + Math.random(), number: match[1], value: "" });
    }
    setInputs(newInputs);
  };

  const addInput = () => {
    const newNumber = inputs.length + 1;
    setInputs((prev) => [...prev, { id: Date.now(), number: newNumber, value: "" }]);
    setText((prev) => prev + `{{${newNumber}}}`);
  };

  const removeInput = (id) => {
    setInputs((prev) => prev.filter((input) => input.id !== id));
    setText((prev) => {
      const inputToRemove = inputs.find((input) => input.id === id);
      return prev.replace(`{{${inputToRemove?.number}}}`, "");
    });
  };

  return (
    <div className='container mt-4'>
      <h3>Dynamic Input Fields</h3>
      <input
        type='text'
        className='form-control mb-3'
        placeholder='Type {{1}}, {{2}}... to add an input'
        value={text}
        onChange={handleTextChange}
      />
      <button className='btn btn-primary mb-3' onClick={addInput}>
        Add Input
      </button>
      {inputs.map((input) => (
        <div key={input.id} className='input-group mb-2'>
          <span className='input-group-text'>{`{{${input.number}}}`}</span>{' '}
          <input
            type='text'
            className='form-control'
            value={input.value}
            onChange={(e) =>
              setInputs((prev) =>
                prev.map((inp) =>
                  inp.id === input.id ? { ...inp, value: e.target.value } : inp
                )
              )
            }
          />
          <button
            className='btn btn-danger'
            onClick={() => removeInput(input.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default DynamicInputForm;
