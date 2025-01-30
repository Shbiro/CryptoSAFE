// components/Tasks/Tasks.js
import React from 'react';
import TasksForm from './TasksForm'; // ייבוא הקומפוננטה CryptoSection
import TasksTable from './TasksTable';

function Tasks() {

  const goToCryptoSafe = () => {
    window.open('https://cryptosafe.co.il', '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div>
      <h1>Tasks</h1>
      <p>Manage your tasks here.</p>
      <button className='cryptosafebutton' onClick={goToCryptoSafe}>
        🌐 Visit CryptoSafe
      </button>
      <TasksForm />
      <TasksTable />
    </div>
  );
}

export default Tasks;
