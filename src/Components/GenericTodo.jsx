import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function GenericTodo() {
  const [task, setTask] = useState([]);
  const [userText, setUserText] = useState('');
  const [taskId, setTaskId] = useState(0);
  const handleTextInput = (e) => {
    setUserText(e.target.value);
  };
  const handleAddTask = () => {
    if (userText.trim()) {
      const data = { id: taskId, task: userText };
      setTask((prevData) => [...prevData, data]);
    }
    setTaskId(taskId + 1);
    setUserText('');
  };
  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <Card className='p-2'>
        <div className='d-flex gap-2'>
          <input
            type='text'
            style={{ width: '300px' }}
            name='userText'
            value={userText}
            onChange={handleTextInput}
          />
          <button className='btn btn-primary' onClick={handleAddTask}>
            add{' '}
          </button>
        </div>
        {task.map((data) => {
          return (
            <Card key={data.id} className='p-2'>
              {data.task}
            </Card>
          );
        })}
      </Card>
    </div>
  );
}

export default GenericTodo;
