import React, { useEffect, useState } from 'react';

function PrivateTasksTable() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://cryptosafe.co.il/api/privatetasks');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
          setError(''); // אם אין שגיאה, ננקה את ההודעה
        } else {
          setError('Failed to fetch private tasks.');
        }
      } catch (error) {
        console.error('Error fetching private tasks:', error);
        setError('An error occurred while fetching private tasks.');
      }
    };

    // קריאה ראשונית ל-API
    fetchTasks();

    // עדכון כל 5 שניות
    const intervalId = setInterval(() => {
      fetchTasks();
    }, 5000);

    // ניקוי ה-interval כאשר הקומפוננטה מוסרת מה-DOM
    return () => clearInterval(intervalId);
  }, []);

  if (loading && tasks.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="private-tasks-table">
      <h1>Private Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.taskName}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No private tasks available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PrivateTasksTable;
