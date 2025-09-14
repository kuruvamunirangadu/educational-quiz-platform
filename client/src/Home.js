import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h1>Welcome to the Educational Quiz Platform</h1>
      <p>Choose an option below:</p>
      <div style={{ margin: 20 }}>
        <Link to="/quizzes"><button>Take a Quiz</button></Link>
        <Link to="/create"><button style={{ marginLeft: 10 }}>Create a Quiz</button></Link>
      </div>
    </div>
  );
}
