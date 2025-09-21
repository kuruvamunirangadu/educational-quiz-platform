// API utility for authentication and quizzes
const API_URL = 'https://educational-quiz-platform--.onrender.com/api';

export async function register(username, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function getQuizzes() {
  const res = await fetch(`${API_URL}/quizzes`);
  return res.json();
}

export async function getQuiz(id) {
  const res = await fetch(`${API_URL}/quizzes/${id}`);
  return res.json();
}

export async function createQuiz(title, questions, token) {
  const res = await fetch(`${API_URL}/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, questions })
  });
  return res.json();
}
