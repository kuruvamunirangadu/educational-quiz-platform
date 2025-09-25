
// API utility for authentication and quizzes
const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : 'https://educational-quiz-platform-5.onrender.com/api';

console.log('API_URL:', API_URL, 'NODE_ENV:', process.env.NODE_ENV);

export async function register(username, password) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Registration error:', error);
    return { message: 'Network error: Unable to connect to server' };
  }
}

export async function login(username, password) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Login error:', error);
    return { message: 'Network error: Unable to connect to server' };
  }
}

export async function getQuizzes() {
  try {
    const res = await fetch(`${API_URL}/quizzes`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Get quizzes error:', error);
    return [];
  }
}

export async function getQuiz(id) {
  try {
    const res = await fetch(`${API_URL}/quizzes/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Get quiz error:', error);
    return null;
  }
}

export async function createQuiz(title, questions, token) {
  try {
    console.log('Creating quiz with data:', { title, questions, questionsLength: questions?.length });
    
    // Validate questions data before sending
    questions.forEach((q, i) => {
      console.log(`Question ${i}:`, q);
    });
    
    const res = await fetch(`${API_URL}/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, questions })
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Server error response:', errorText);
      if (res.status === 403 || res.status === 401) {
        // Token expired, clear storage and redirect to auth
        localStorage.removeItem('token');
        window.location.href = '/auth';
        return { message: 'Session expired. Please log in again.' };
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result = await res.json();
    console.log('Quiz creation result:', result);
    return result;
  } catch (error) {
    console.error('Create quiz error:', error);
    return { message: 'Network error: Unable to connect to server' };
  }
}
