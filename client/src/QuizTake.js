
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuiz } from './api';


export default function QuizTake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getQuiz(id).then(setQuiz);
  }, [id]);

  if (!quiz) return <div>Loading...</div>;

  const handleAnswer = idx => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    
    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
    } else {
      // Calculate score (include the current answer)
      let s = 0;
      quiz.questions.forEach((q, i) => {
        if (newAnswers[i] === q.answer) s++;
      });
      setScore(s);
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div style={{ maxWidth: 600, margin: 'auto' }}>
        <h2>Quiz Results</h2>
        <p>Score: {score} / {quiz.questions.length}</p>
        <ul>
          {quiz.questions.map((q, i) => (
            <li key={i}>
              <strong>{q.question}</strong><br />
              Your answer: {q.options[answers[i]] || 'N/A'}<br />
              Correct answer: {q.options[q.answer]}<br />
              <div style={{background:'#e3f2fd',borderLeft:'5px solid #1976d2',padding:'8px',margin:'8px 0',borderRadius:'4px'}}>
                <strong>Feedback:</strong> {q.feedback}
              </div>
            </li>
          ))}
        </ul>
        <button style={{marginTop: 20}} onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  const q = quiz.questions[current];
  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>{quiz.title}</h2>
      <div>
        <p><strong>Q{current + 1}:</strong> {q.question}</p>
        {q.options.map((opt, idx) => (
          <button key={idx} onClick={() => handleAnswer(idx)} style={{ display: 'block', margin: '8px 0' }}>{opt}</button>
        ))}
      </div>
    </div>
  );
}
