// Quiz model (in-memory for now)
const quizzes = [
  {
    id: 1,
    title: 'Anti-Drug Awareness',
    questions: [
      {
        question: 'What is the main effect of most illegal drugs on the brain?',
        options: [
          'They improve memory',
          'They disrupt normal brain function',
          'They make you smarter',
          'They have no effect'
        ],
        answer: 1,
        feedback: 'Most illegal drugs disrupt normal brain function and can cause harm.'
      },
      {
        question: 'Which of these is a healthy way to deal with stress?',
        options: [
          'Using drugs',
          'Talking to friends or family',
          'Ignoring your feelings',
          'Skipping meals'
        ],
        answer: 1,
        feedback: 'Talking to friends or family is a healthy way to manage stress.'
      }
    ],
    createdBy: 'system'
  },
  {
    id: 2,
    title: 'Environmental Education',
    questions: [
      {
        question: 'Which of these helps reduce plastic pollution?',
        options: [
          'Using single-use plastic bags',
          'Recycling and using reusable bags',
          'Throwing plastic in the ocean',
          'Burning plastic waste'
        ],
        answer: 1,
        feedback: 'Recycling and using reusable bags helps reduce plastic pollution.'
      },
      {
        question: 'What is a renewable source of energy?',
        options: [
          'Coal',
          'Oil',
          'Solar',
          'Natural Gas'
        ],
        answer: 2,
        feedback: 'Solar energy is renewable and environmentally friendly.'
      }
    ],
    createdBy: 'system'
  }
];

function createQuiz({ title, questions, createdBy }) {
  const quiz = {
    id: quizzes.length + 1,
    title,
    questions, // [{ question, options, answer, feedback }]
    createdBy,
  };
  quizzes.push(quiz);
  return quiz;
}

function getAllQuizzes() {
  return quizzes;
}

function getQuizById(id) {
  return quizzes.find(q => q.id === id);
}

module.exports = { createQuiz, getAllQuizzes, getQuizById };
