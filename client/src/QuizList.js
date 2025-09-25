import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes } from './api';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizzes().then(setQuizzes);
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Available Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>Loading quizzes...</p>
      ) : (
        <div>
          {quizzes.map(q => (
            <div key={q.id} style={{ 
              border: '1px solid #ddd', 
              margin: '10px 0', 
              padding: 15, 
              borderRadius: 5,
              backgroundColor: '#f9f9f9'
            }}>
              <h3>
                <Link 
                  to={`/quiz/${q.id}`} 
                  style={{ 
                    textDecoration: 'none', 
                    color: '#007bff',
                    ':hover': { textDecoration: 'underline' }
                  }}
                >
                  {q.title}
                </Link>
              </h3>
              <p style={{ color: '#666', margin: '5px 0' }}>
                {q.questions.length} question{q.questions.length !== 1 ? 's' : ''}
              </p>
              <p style={{ color: '#888', fontSize: '0.9em' }}>
                Created by: {q.createdBy}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
