import React, { useState } from 'react';

function TaskList({ tasks, updateTask, deleteTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title);
  };

  const handleSaveClick = (id) => {
    updateTask(id, newTitle, false); // Update the task with the new title
    setEditingTaskId(null);
    setNewTitle('');
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? 'dark' : ''}>
          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div className="task-buttons">
                <button className="save" onClick={() => handleSaveClick(task.id)}>
                  Save
                </button>
                <button className="cancel" onClick={() => setEditingTaskId(null)}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => updateTask(task.id, task.title, !task.completed)}
              />
              <span className="task-name">{task.title}</span>
              <div className="task-buttons">
                <button className="edit" onClick={() => handleEditClick(task)}>
                  Edit
                </button>
                <button className="delete" onClick={() => deleteTask(task.id)}>
                  ❌
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;