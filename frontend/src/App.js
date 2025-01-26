import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import BackOffice from './components/BackOffice/BackOffice';
import Tasks from './components/Tasks/Tasks';
import PrivateTasks from './components/Tasks/PrivateTasks';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bo" element={<BackOffice />} />
            <Route
              path="/bo/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />
                        <Route
              path="/bo/privatetasks"
              element={
                <ProtectedRoute>
                  <PrivateTasks />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
