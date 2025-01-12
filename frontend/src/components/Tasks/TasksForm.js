import React, { useState } from 'react';
import './TasksForm.css'; // Import the CSS file

function TasksForm() {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://cryptosafe.co.il/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskName, description, status }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Task added successfully!');
        setTaskName('');
        setDescription('');
        setStatus('Not Started');
      } else {
        setMessage('Failed to add task. Please try again.');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
<div class="contact-form-container">
  <div class="contact-form">
    <form onSubmit={handleSubmit}>
      <h2>Tasks</h2>
      <input
        type="text"
        name="taskName"
        placeholder="שם המשימה"
        aria-label="שם המשימה"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <textarea
        name="description"
        placeholder="תיאור"
        aria-label="תיאור"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <select
        name="status"
        aria-label="סטטוס"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button id="submit-button-taskform" type="submit" class="send-button">
        Add Task
      </button>
    </form>
    {message && <p>{message}</p>}
  </div>
</div>
  );
}

export default TasksForm;
