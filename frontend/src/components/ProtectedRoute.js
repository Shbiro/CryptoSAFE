import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    alert('You must log in to access this page'); // התראה למשתמש
    return <Navigate to="/bo" />; // ניתוב לעמוד ההתחברות
  }

  return children; // הצגת התוכן אם המשתמש מחובר
}

export default ProtectedRoute;
