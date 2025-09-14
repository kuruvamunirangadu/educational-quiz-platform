
import React, { useState } from 'react';
import { register, login } from './api';
import { useNavigate } from 'react-router-dom';


export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (isLogin) {
      const res = await login(username, password);
      if (res.token) {
        localStorage.setItem('token', res.token);
        navigate('/');
      } else {
        setMessage(res.message);
      }
    } else {
      const res = await register(username, password);
      if (res.message && res.message.toLowerCase().includes('success')) {
        setIsLogin(true);
        setMessage('Registration successful! Please log in.');
      } else {
        setMessage(res.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: 'auto' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: 10 }}>
        {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
