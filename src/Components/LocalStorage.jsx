import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

function LocalStorage() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem('task')) || []
  );

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const addNewTask = () => {
    if (text.trim()) {
      setTasks((prevTask) => [...prevTask, text]);
      setText('');
    }
  };

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ marginTop: '10rem' }}
    >
      <Card className='p-3'>
        <div className='d-flex  align-items-center gap-2'>
          <input
            type='text'
            name='text'
            value={text}
            onChange={handleChange}
            style={{ height: '2.2rem', width: '400px' }}
          />
          <button
            type='submit'
            className='btn btn-primary'
            onClick={addNewTask}
          >
            add task
          </button>
        </div>
        <div>
          {tasks?.map((task, index) => {
            return (
              <Card className='mt-3' key={index}>
                <div>
                  <p className='mb-0 p-2' style={{ fontSize: '1.3rem' }}>
                    {task}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default LocalStorage;
