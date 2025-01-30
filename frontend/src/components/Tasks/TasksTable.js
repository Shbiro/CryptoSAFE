import React, { useState, useEffect } from 'react';
import './TasksTable.css';

function TasksTable() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});

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

    fetchTasks();
    const interval = setInterval(fetchTasks, 5000);
    return () => clearInterval(interval);
  }, []);

  // פונקציה לעריכת ערך בטבלה
  const handleEdit = (taskId, field, value) => {
    setEditedTask((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], [field]: value },
    }));
  };

  // שמירת השינויים בעדכון השרת
  const handleSave = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...taskToUpdate, ...editedTask[taskId] };

    try {
      const response = await fetch('https://cryptosafe.co.il/api/tasks/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
        setEditingTaskId(null);
      } else {
        console.error('Failed to update task.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // מחיקת משימה
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`https://cryptosafe.co.il/api/tasks/delete/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        console.error('Failed to delete task.');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // פונקציה למיון המשימות לפי הסטטוס
  const sortedTasks = [...tasks].sort((a, b) => {
    const order = { "Not Started": 1, "In Progress": 2, "Completed": 3 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="tasks-table-container">
      <h1>Tasks List</h1>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task.id}>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TasksTable;
