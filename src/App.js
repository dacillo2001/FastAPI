import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import './App.css';

const API_URL = 'http://127.0.0.1:8000'; 
function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  const fetchTasks = useCallback(async () => {
    const url = filter === 'all' ? '/todos/' : `/filter/?status=${filter}`;
    const response = await fetch(`${API_URL}${url}`);
    const data = await response.json();
    setTasks(data);
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title) => {
    await fetch(`${API_URL}/todos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    fetchTasks();
  };

  const updateTask = async (id, title, completed) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  const editTask = async (id, newTitle) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    });
    fetchTasks();
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <header className="app-header">
        <h1>React TODO App</h1>
      </header>
      <div className={`todo-container ${darkMode ? 'dark' : ''}`}>
        <h2>To-Do List</h2>
        <div className="task-form-wrapper">
          <button
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
          <TaskForm addTask={addTask} darkMode={darkMode} />
        </div>
        <Filter setFilter={setFilter} darkMode={darkMode} />
        <TaskList
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
          editTask={editTask}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;