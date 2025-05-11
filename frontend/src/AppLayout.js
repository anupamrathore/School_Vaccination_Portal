import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Students from './pages/Student';
import Drives from './pages/Drives';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Register from './pages/Register';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

function AppLayout() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <>
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
        {token ? (
          <>
            <Link to="/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
            <Link to="/students" style={{ marginRight: '15px' }}>Students</Link>
            <Link to="/drives" style={{ marginRight: '15px' }}>Drives</Link>
            <Link to="/reports" style={{ marginRight: '15px' }}>Reports</Link>
            <button onClick={handleLogout} style={{ marginLeft: '15px' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
            <Link to="/register" style={{ marginRight: '15px' }}>Register</Link>
          </>
        )}
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/students" element={<PrivateRoute element={<Students />} />} />
          <Route path="/drives" element={<PrivateRoute element={<Drives />} />} />
          <Route path="/reports" element={<PrivateRoute element={<Reports />} />} />
        </Routes>
      </div>
    </>
  );
}

export default AppLayout;
