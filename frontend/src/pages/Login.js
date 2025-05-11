// src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', credentials);

      // Log the response to check if the token is returned correctly
      console.log('Login response:', res.data);

      // Check if token is available in the response
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);

        // Log to confirm the token is stored correctly
        console.log('Token stored in localStorage:', localStorage.getItem('token'));

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('No token received from the server.');
      }
    } catch (err) {
      // Log the error details for debugging purposes
      console.error('Login error:', err.response ? err.response.data : err.message);

      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>School Vaccination Portal</h2>
        <p className="login-subtext">Please login to access the vaccination portal</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>
            <span className="forgot-password">Forgot password?</span>
          </div>
          <button type="submit">Sign In</button>
          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

