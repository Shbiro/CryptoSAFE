import React, { useState, useEffect } from 'react';
import './TasksTable.css'; // ייבא קובץ עיצוב

function TasksTable() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://cryptosafe.co.il/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    // Fetch tasks initially
    fetchTasks();

    // Set up polling every 5 seconds
    const interval = setInterval(() => {
      fetchTasks();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tasks-table-container">
      <h1>Tasks List</h1>
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.taskName}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TasksTable;
