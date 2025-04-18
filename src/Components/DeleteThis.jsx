import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function DeleteThis() {
  const [userTask, setUserTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const data = { id: Date.now(), task: userTask };
    setTasks((prevData) => [...prevData, data]);
    setUserTask('');
  };

  const [taskId, setTaskId] = useState(null);
  const [editTask, setEditTask] = useState('');

  const handleEditSave = (id) => {
    if (editTask.trim()) {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === id ? { ...task, task: editTask } : task
        )
      );
    }
    setTaskId(null);
    setEditTask('');
  };
  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{
        height: '100vh',
      }}
    >
      <Card className='p-3'>
        <div className='d-flex'>
          <input
            type='text'
            name='userTask'
            value={userTask}
            onChange={(e) => setUserTask(e.target.value)}
          />
          <button onClick={addTask}>add</button>
        </div>
        <div>
          {tasks.map((task) => {
            return (
              <Card key={task.id} className='p-2 mt-3 '>
                <div className='d-flex '>
                  <p className='flex-grow-1'>{task.task}</p>
                  <button onClick={() => setTaskId(task.id)}>edit</button>
                  {taskId === task.id && (
                    <div>
                      <input
                        type='text'
                        onChange={(e) => setEditTask(e.target.value)}
                      />
                      <button onClick={() => handleEditSave(task.id)}>
                        save
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default DeleteThis;
