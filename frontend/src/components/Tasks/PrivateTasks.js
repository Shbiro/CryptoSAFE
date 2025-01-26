import React from 'react';
import PrivateTasksForm from './PrivateTasksForm';
import PrivateTasksTable from './PrivateTasksTable';

function PrivateTasks() {
  return (
    <div className="private-tasks">
      <h1>משימות אישיות</h1>
      <p>תמלא פה את כל המשימות האישיות שלך ותעקוב אחריהם</p>
      <PrivateTasksForm />
      <PrivateTasksTable />
    </div>
  );
}

export default PrivateTasks;
