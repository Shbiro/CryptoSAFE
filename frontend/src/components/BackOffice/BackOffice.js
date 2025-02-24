import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './BackOffice.css';

function BackOffice() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ✅ סטייט להצגת הסיסמה
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('https://cryptosafe.co.il/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    }
  };

  if (isLoggedIn) {
    const goToCryptoSafe = () => {
      window.open('https://cryptosafe.co.il', '_blank', 'noopener,noreferrer');
    };

    return (
      <div className="back-office">
        <h1>Welcome to Back Office</h1>
        <p>You are now logged in.</p>
        <button className="cryptosafebutton" onClick={goToCryptoSafe}>
          🌐 Visit CryptoSafe
        </button>
        <Link to="/bo/tasks">
          <button className="cryptosafebutton">Go to Tasks</button>
        </Link>
        <Link to="/bo/privatetasks">
          <button className="cryptosafebutton">Go to Private Tasks</button>
        </Link>
        <Link to="/bo/blogs">
          <button className="cryptosafebutton">Manage Blogs</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="back-office">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          id="username-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="password-input"
          type={showPassword ? "text" : "password"} // ✅ שינוי `type` בהתאם למצב
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
                  <button
            type="button"
            className="show-password-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈 Hide' : '👁 Show Password'}
          </button>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default BackOffice;
