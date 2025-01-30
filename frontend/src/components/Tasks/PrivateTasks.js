import React from 'react';
import PrivateTasksForm from './PrivateTasksForm';
import PrivateTasksTable from './PrivateTasksTable';

function PrivateTasks() {
  const goToCryptoSafe = () => {
    window.open('https://cryptosafe.co.il', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="private-tasks">
      <h1>משימות אישיות</h1>
      <p>תמלא פה את כל המשימות האישיות שלך ותעקוב אחריהם</p>
      <button className='cryptosafebutton' onClick={goToCryptoSafe}>
        🌐 Visit CryptoSafe
      </button>
      <PrivateTasksForm />
      <PrivateTasksTable />
    </div>
  );
}

export default PrivateTasks;
