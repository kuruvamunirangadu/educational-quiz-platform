import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './Home';
import QuizList from './QuizList';
import QuizCreate from './QuizCreate';
import QuizTake from './QuizTake';
import AuthForm from './AuthForm';
import RequireAuth from './RequireAuth';
import Navigation from './Navigation';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/" element={<RequireAuth><><Navigation /><Home /></></RequireAuth>} />
        <Route path="/quizzes" element={<RequireAuth><><Navigation /><QuizList /></></RequireAuth>} />
        <Route path="/create" element={<RequireAuth><><Navigation /><QuizCreate /></></RequireAuth>} />
        <Route path="/quiz/:id" element={<RequireAuth><><Navigation /><QuizTake /></></RequireAuth>} />
      </Routes>
    </Router>
  );
}
