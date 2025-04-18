import React, { useState } from 'react';
import { Card, Input } from 'reactstrap';

function RemoveTodo() {
  const [input, setInput] = useState('');
  const [userTasks, setUserTasks] = useState([]);
  const [inputId, setInputId] = useState(null);
  const handleNewTask = () => {
    if (input.trim()) {
      const data = { id: Date.now(), value: input };
      setUserTasks((prevData) => [...prevData, data]);
    }
    setInput('');
  };
  const [updatedValue, setUpdatedValue] = useState('');
  const handleTaskEdit = (id) => {
    if (updatedValue.trim()) {
      const updatedTask = userTasks.map((task) =>
        task.id === id ? { ...task, value: updatedValue } : task
      );
      setUserTasks(updatedTask);
    }

    setUpdatedValue('');
    setInputId(null);
  };
  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <div style={{ width: '500px' }}>
        <div className='d-flex gap-2'>
          <Input
            name='input'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className='px-4 btn btn-primary' onClick={handleNewTask}>
            add
          </button>
        </div>
        <div className='mt-2'>
          {userTasks.map((data) => {
            return (
              <Card key={data.id}>
                <div className='p-2 d-flex justify-content-between'>
                  <h5>{data.value}</h5>
                  <button
                    className='btn btn-danger'
                    onClick={() => {
                      setInputId(data.id);
                    }}
                  >
                    edit
                  </button>
                </div>
                {data.id === inputId && (
                  <div>
                    <input
                      type='text'
                      name='updatedValue'
                      value={updatedValue}
                      onChange={(e) => {
                        setUpdatedValue(e.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        handleTaskEdit(data.id);
                      }}
                    >
                      save
                    </button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RemoveTodo;
