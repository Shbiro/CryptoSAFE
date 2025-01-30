import React, { useEffect, useState } from 'react';

function PrivateTasksTable() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://cryptosafe.co.il/api/privatetasks');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
          setError('');
        } else {
          setError('Failed to fetch private tasks.');
        }
      } catch (error) {
        console.error('Error fetching private tasks:', error);
        setError('An error occurred while fetching private tasks.');
      }
    };

    fetchTasks();
    const intervalId = setInterval(fetchTasks, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // עדכון השדות כאשר משתמש עורך את התוכן
  const handleEdit = (taskId, field, value) => {
    setEditedTask((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], [field]: value },
    }));
  };

  // שמירה ועדכון המשימה
  const handleSave = async (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    const updatedTask = { ...taskToUpdate, ...editedTask[taskId] };

    try {
      const response = await fetch('https://cryptosafe.co.il/api/privatetasks/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTasks(prevTasks =>
          prevTasks.map(task => (task.id === taskId ? updatedTask : task))
        );
        setEditingTaskId(null);
      } else {
        setError('Failed to update task.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      setError('An error occurred while updating task.');
    }
  };

  // מחיקת משימה
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`https://cryptosafe.co.il/api/privatetasks/delete/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      } else {
        setError('Failed to delete task.');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('An error occurred while deleting task.');
    }
  };

  // מיון המשימות לפי סדר מוגדר מראש
  const sortedTasks = [...tasks].sort((a, b) => {
    const order = { "Not Started": 1, "In Progress": 2, "Completed": 3 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="private-tasks-table">
      <h1>Private Tasks</h1>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>סטטוס</th>
            <th>תיאור</th>
            <th>שם המשימה</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <tr key={task.id}>
                <td>
                  {editingTaskId === task.id ? (
                    <select
                      value={editedTask[task.id]?.status || task.status}
                      onChange={(e) => handleEdit(task.id, 'status', e.target.value)}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    task.status
                  )}
                </td>
                <td>
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editedTask[task.id]?.description || task.description}
                      onChange={(e) => handleEdit(task.id, 'description', e.target.value)}
                    />
                  ) : (
                    task.description
                  )}
                </td>
                <td>
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editedTask[task.id]?.taskName || task.taskName}
                      onChange={(e) => handleEdit(task.id, 'taskName', e.target.value)}
                    />
                  ) : (
                    task.taskName
                  )}
                </td>
                <td>
                  {editingTaskId === task.id ? (
                    <button className="btn btn-edit" onClick={() => handleSave(task.id)}>
                      ✅ שמור
                    </button>
                  ) : (
                    <button className="btn btn-edit" onClick={() => setEditingTaskId(task.id)}>
                      ✏️ ערוך
                    </button>
                  )}
                  <button className="btn btn-delete" onClick={() => handleDelete(task.id)}>
                    🗑 מחק
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No private tasks available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PrivateTasksTable;
