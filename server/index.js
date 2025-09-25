// Basic Express server setup for authentication
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const users = [];
const SECRET = 'your_jwt_secret';
const { createQuiz, getAllQuizzes, getQuizById } = require('./quizModel');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://kuruvamunirangadu.github.io'
  ]
}));
app.use(bodyParser.json());

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, password });
  res.json({ message: 'Registration successful' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Create a quiz (protected)
app.post('/api/quizzes', authenticateToken, (req, res) => {
  const { title, questions } = req.body;
  console.log('Received quiz data:', { title, questions, questionsLength: questions?.length });
  
  if (!title || !questions || !Array.isArray(questions)) {
    console.log('Invalid quiz data:', { title: !!title, questions: !!questions, isArray: Array.isArray(questions) });
    return res.status(400).json({ message: 'Invalid quiz data' });
  }
  
  // Validate each question has required fields
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    console.log(`Question ${i}:`, q);
    if (!q.question || !q.options || !Array.isArray(q.options) || q.options.length !== 4 || q.answer === undefined) {
      console.log('Invalid question structure:', q);
      return res.status(400).json({ message: `Invalid question structure at index ${i}` });
    }
  }
  
  const quiz = createQuiz({ title, questions, createdBy: req.user.username });
  console.log('Created quiz:', quiz);
  res.json(quiz);
});

// Get all quizzes (public)
app.get('/api/quizzes', (req, res) => {
  try {
    res.json(getAllQuizzes());
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quiz by ID (public)
app.get('/api/quizzes/:id', (req, res) => {
  try {
    const quiz = getQuizById(Number(req.params.id));
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
