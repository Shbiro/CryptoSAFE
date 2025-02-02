import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import BackOffice from './components/BackOffice/BackOffice';
import Tasks from './components/Tasks/Tasks';
import PrivateTasks from './components/Tasks/PrivateTasks';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Blogs from './components/Blogs/Blogs.js';
import BlogsBo from './components/Blogs/BlogsBo.js';
import WhatisBitcoin from './components/Blogs/Pages/WhatisBitcoin.js';
import ETHCONTARCTS from './components/Blogs/Pages/ETHCONTARCTS.js';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs/whatisbitcoin" element={<WhatisBitcoin />} />
            <Route path="/blogs/ethcontarcts" element={<ETHCONTARCTS />} />
<Route path="/blogs" element={<Blogs />} />
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
                        <Route
              path="/bo/Blogs"
              element={
                <ProtectedRoute>
                  <BlogsBo />
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
