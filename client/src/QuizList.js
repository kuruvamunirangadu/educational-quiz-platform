import React, { useEffect, useState } from 'react';
import { getQuizzes } from './api';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizzes().then(setQuizzes);
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Available Quizzes</h2>
      <ul>
        {quizzes.map(q => (
          <li key={q.id}>
            <a href={`/quiz/${q.id}`}>{q.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
