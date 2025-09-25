import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <nav style={{ 
      background: '#f0f0f0', 
      padding: '10px 20px', 
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/" style={{ marginRight: 20, textDecoration: 'none', fontWeight: 'bold', color: '#333' }}>
          Educational Quiz Platform
        </Link>
      </div>
      <div>
        <Link to="/" style={{ marginRight: 15, textDecoration: 'none', color: '#007bff' }}>Home</Link>
        <Link to="/quizzes" style={{ marginRight: 15, textDecoration: 'none', color: '#007bff' }}>Quizzes</Link>
        <Link to="/create" style={{ marginRight: 15, textDecoration: 'none', color: '#007bff' }}>Create Quiz</Link>
        <button 
          onClick={handleLogout}
          style={{ 
            background: '#dc3545', 
            color: 'white', 
            border: 'none', 
            padding: '5px 10px', 
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}