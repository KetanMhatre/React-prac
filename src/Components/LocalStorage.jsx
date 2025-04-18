import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

function LocalStorage() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem('task')) || []
  );

  const [editText, setEditText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addNewTask = () => {
    if (text.trim()) {
      const newId = Date.now();
      const data = { id: newId, task: text };
      setTasks((prevTask) => [...prevTask, data]);
      setText('');
    }
  };

  const handleSaveTask = (id) => {
    if (editText.trim()) {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === id ? { ...task, task: editText } : task
        )
      );
    }
    setEditIndex(null);
    setEditText('');
  };

  const handleTaskDelete = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
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
            onChange={(e) => setText(e.target.value)}
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
              <div key={index} className='d-flex justify-content-between gap-2'>
                <Card className='mt-3 flex-grow-1'>
                  <div>
                    <p className='mb-0 p-2' style={{ fontSize: '1.3rem' }}>
                      {task.task}
                    </p>
                    {editIndex === task.id && (
                      <input
                        type='text'
                        name='editText'
                        value={editText}
                        className='w-100 p-1 '
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    )}
                  </div>
                </Card>
                {editIndex === task.id ? (
                  <button
                    className='btn btn-secondary px-4 mt-3'
                    onClick={() => {
                      handleSaveTask(task.id);
                    }}
                  >
                    save
                  </button>
                ) : (
                  <button
                    className='btn btn-secondary px-4 mt-3 '
                    onClick={() => {
                      setEditIndex(editIndex !== task.id ? task.id : null);
                    }}
                  >
                    edit
                  </button>
                )}
                <button
                  className='mt-3 px-3'
                  style={{
                    backgroundColor: 'red',
                    border: 'none',
                    borderRadius: '5px',
                  }}
                  onClick={() => {
                    handleTaskDelete(task.id);
                  }}
                >
                  <MdDelete className='fs-5' style={{ color: 'white' }} />
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default LocalStorage;
