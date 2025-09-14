
import React, { useState } from 'react';
import { createQuiz } from './api';
import { useNavigate } from 'react-router-dom';


export default function QuizCreate() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: 0, feedback: '' }]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleQuestionChange = (idx, field, value) => {
    const updated = [...questions];
    if (field === 'options') {
      updated[idx].options = value;
    } else {
      updated[idx][field] = value;
    }
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: 0, feedback: '' }]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = await createQuiz(title, questions, token);
    setMessage(data.message || 'Quiz created!');
  };

  const deleteQuestion = idx => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Create a Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Quiz Title" required />
        {questions.map((q, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
            <input value={q.question} onChange={e => handleQuestionChange(idx, 'question', e.target.value)} placeholder="Question" required />
            {q.options.map((opt, oidx) => (
              <input key={oidx} value={opt} onChange={e => {
                const opts = [...q.options]; opts[oidx] = e.target.value;
                handleQuestionChange(idx, 'options', opts);
              }} placeholder={`Option ${oidx + 1}`} required />
            ))}
            <input type="number" min="0" max="3" value={q.answer} onChange={e => handleQuestionChange(idx, 'answer', Number(e.target.value))} placeholder="Correct Option (0-3)" required />
            <input value={q.feedback} onChange={e => handleQuestionChange(idx, 'feedback', e.target.value)} placeholder="Feedback" required />
            <button type="button" onClick={() => deleteQuestion(idx)} style={{ marginTop: 5, background: '#f44336', color: 'white' }}>Delete Question</button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Create Quiz</button>
      </form>
      {message && <>
        <p>{message}</p>
        <button style={{marginTop: 10}} onClick={() => navigate('/')}>Go Back Home</button>
      </>}
    </div>
  );
}
