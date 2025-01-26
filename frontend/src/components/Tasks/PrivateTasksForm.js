import React, { useState } from 'react';

function PrivateTasksForm() {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('https://cryptosafe.co.il/api/privatetasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskName, description, status }),
      });

      if (response.ok) {
        setMessage('Private task successfully added!');
        setTaskName('');
        setDescription('');
        setStatus('Not Started');
      } else {
        setMessage('Failed to add private task. Please try again.');
      }
    } catch (error) {
      console.error('Error adding private task:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="private-tasks-form">
      <form onSubmit={handleSubmit}>
      <h2>הוסף משימה חדשה</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default PrivateTasksForm;
