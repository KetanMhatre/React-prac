import React, { useEffect, useState } from 'react';

const ToDo = () => {
  const [task, setTask] = useState([]);
  const [addTask, setNewTask] = useState('');

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };
  const handleClick = () => {
    if (addTask.trim()) {
      setTask((prevTask) => [...prevTask, addTask]);
    }
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);
  
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div>
        <div className='d-flex gap-2'>
          <input type='text' name='addTask' onChange={handleChange} />
          <button onClick={handleClick}>add</button>
        </div>
        <div>
          {task &&
            task.map((item, index) => {
              return <h4>{item}</h4>;
            })}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
