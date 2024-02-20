import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([{ id: Date.now(), text: 'Take a Bath', completed: false }]);
  const [inputValue, setInputValue] = useState('');

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const [taskStatus, setTaskStatus] = useState({});

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = { id: Date.now(), text: inputValue, completed: false };
      setTasks([...tasks, newTask]);
      setTaskStatus({ ...taskStatus, [newTask.id]: 'Not Done' });
      setInputValue('');
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditTask = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const toggleTask = (id) => {
    if (editId === id) {
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return { ...task, text: editText };
        }
        return task;
      }));
      setEditId(null);
      setEditText('');
    } else {
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }));
      setTaskStatus({ ...taskStatus, [id]: taskStatus[id] === 'Done' ? 'Not Done' : 'Done' });
    }
  };

  return (
    <div className="App">
      <h1>Todo List Waizly!</h1>
      <div className="container">
        {/* SEARCH FORM */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Search Tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* INPUT FORM */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter a task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul>
          {tasks
            .filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(task => (
              <li key={task.id}>
                {editId === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => toggleTask(task.id)}
                    autoFocus
                  />
                ) : (
                  <span
                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                    onClick={() => startEditTask(task.id, task.text)}
                  >
                    {task.text}
                  </span>
                )}
                <span>{taskStatus[task.id]}</span>
                <button onClick={() => toggleTask(task.id)} className="button-status">Update Status</button>
                <button onClick={() => removeTask(task.id)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>

    </div>
  );
}

export default App;
