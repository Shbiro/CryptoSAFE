// components/Tasks/Tasks.js
import React from 'react';
import TasksForm from './TasksForm'; // ייבוא הקומפוננטה CryptoSection
import TasksTable from './TasksTable';

function Tasks() {
  return (
    <div>
      <h1>Tasks</h1>
      <p>Manage your tasks here.</p>
      <TasksForm />
      <TasksTable />
    </div>
  );
}

export default Tasks;
