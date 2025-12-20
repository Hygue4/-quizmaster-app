import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Gameplay.css';

const Gameplay = () => {
  const navigate = useNavigate();
  const fetchedRef = useRef(false); // Use ref instead of state to prevent re-renders

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fallback questions - Categorized
  const fallbackQuestions = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
    },
    {
      id: 3,
      question: 'What is the chemical formula for water?',
      options: ['H2O', 'CO2', 'O2', 'NaCl'],
      correctAnswer: 'H2O',
    },
    {
      id: 4,
      question: 'In which year did World War II end?',
      options: ['1943', '1944', '1945', '1946'],
      correctAnswer: '1945',
    },
    {
      id: 5,
      question: 'What is the largest ocean on Earth?',
      options: [
        'Atlantic Ocean',
        'Indian Ocean',
        'Arctic Ocean',
        'Pacific Ocean',
      ],
      correctAnswer: 'Pacific Ocean',
    },
    {
      id: 6,
      question: 'How many continents are there?',
      options: ['5', '6', '7', '8'],
      correctAnswer: '7',
    },
    {
      id: 7,
      question: 'Who painted the Mona Lisa?',
      options: [
        'Vincent van Gogh',
        'Pablo Picasso',
        'Leonardo da Vinci',
        'Michelangelo',
      ],
      correctAnswer: 'Leonardo da Vinci',
    },
    {
      id: 8,
      question: 'What is the speed of light?',
      options: [
        '299,792 km/s',
        '150,000 km/s',
        '500,000 km/s',
        '1,000,000 km/s',
      ],
      correctAnswer: '299,792 km/s',
    },
    {
      id: 9,
      question: "Who wrote 'Romeo and Juliet'?",
      options: [
        'Charles Dickens',
        'Jane Austen',
        'William Shakespeare',
        'Mark Twain',
      ],
      correctAnswer: 'William Shakespeare',
    },
    {
      id: 10,
      question: 'What is the square root of 64?',
      options: ['6', '7', '8', '9'],
      correctAnswer: '8',
    },
  ];

  // Fetch questions from Open Trivia DB API
  useEffect(() => {
    // Prevent duplicate fetches in React Strict Mode
    if (fetchedRef.current) {
      console.log('⛔ Fetch already in progress, skipping duplicate');
      return;
    }

    fetchedRef.current = true;

    const fetchQuestions = async () => {
      try {
        console.log('🚀 Starting question fetch...');
        setLoading(true);

        // Get quiz settings
        const settingsStr = localStorage.getItem('quizSettings');
        console.log('📋 Settings string:', settingsStr);

        if (!settingsStr) {
          console.error('❌ No settings found in localStorage');
          throw new Error('No quiz settings');
        }

        const settings = JSON.parse(settingsStr);
        console.log('✅ Parsed settings:', settings);

        const categoryId = settings.category?.id;
        const categoryName = settings.category?.name;
        const difficulty = settings.difficulty || 'medium';
        const amount = settings.amount || 10;

        if (!categoryId) {
          console.error('❌ No category ID found');
          throw new Error('Invalid category');
        }

        console.log('🎯 Category ID:', categoryId);
        console.log('🎯 Category Name:', categoryName);
        console.log('🎯 Difficulty:', difficulty);
        console.log('🎯 Amount:', amount);

        // Build API URL
        const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
        console.log('🌐 API URL:', apiUrl);

        // Wait a bit to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Fetch from API
        console.log('📡 Making API request...');
        const response = await fetch(apiUrl);
        console.log('📡 Response status:', response.status);

        if (response.status === 429) {
          console.warn('⚠️ Rate limited (429)');
          setQuestions(fallbackQuestions.slice(0, amount));
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('📦 Response code:', data.response_code);
        console.log('📦 Number of results:', data.results?.length);

        if (
          data.response_code !== 0 ||
          !data.results ||
          data.results.length === 0
        ) {
          console.warn('⚠️ No results from API');
          throw new Error('No questions returned');
        }

        // Decode and format questions
        const formattedQuestions = data.results.map((q, i) => {
          const decode = (str) => {
            const el = document.createElement('textarea');
            el.innerHTML = str;
            return el.value;
          };

          const allAnswers = [...q.incorrect_answers, q.correct_answer];
          const shuffled = allAnswers.sort(() => Math.random() - 0.5);

          return {
            id: i + 1,
            question: decode(q.question),
            options: shuffled.map(decode),
            correctAnswer: decode(q.correct_answer),
            apiCategory: q.category,
          };
        });

        console.log(
          '✅ ✅ ✅ SUCCESS! Formatted questions:',
          formattedQuestions.length
        );
        console.log(
          '✅ First question API category:',
          formattedQuestions[0]?.apiCategory
        );
        console.log('✅ First question:', formattedQuestions[0]?.question);

        // Set questions and stop loading
        setQuestions(formattedQuestions);
        setLoading(false);
      } catch (error) {
        console.error('❌ Fetch error:', error.message);
        console.log('⚠️ Loading fallback questions');

        const settingsStr = localStorage.getItem('quizSettings');
        const settings = settingsStr ? JSON.parse(settingsStr) : {};
        const amount = settings.amount || 10;

        setQuestions(fallbackQuestions.slice(0, amount));
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []); // Empty dependency array - runs once

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !isAnswered && !loading && questions.length > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && !isAnswered && questions.length > 0) {
      handleNext();
    }
  }, [timer, isAnswered, loading, questions.length]);

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimer(30);
    } else {
      const finalScore =
        score +
        (selectedAnswer === questions[currentQuestion]?.correctAnswer ? 1 : 0);
      const settingsStr = localStorage.getItem('quizSettings');
      const settings = settingsStr ? JSON.parse(settingsStr) : {};

      const results = {
        totalQuestions: questions.length,
        correctAnswers: finalScore,
        wrongAnswers: questions.length - finalScore,
        category: settings.category?.name || 'Quiz',
        difficulty: settings.difficulty || 'medium',
      };
      localStorage.setItem('quizResults', JSON.stringify(results));
      navigate('/results');
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  // Loading state
  if (loading) {
    return (
      <div className="gameplay-container loading-container">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <h2>Loading Questions...</h2>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  // No questions loaded
  if (questions.length === 0) {
    return (
      <div className="gameplay-container error-container">
        <div className="error-screen">
          <div className="error-icon">⚠️</div>
          <h2>No Questions Available</h2>
          <p>Unable to load quiz questions</p>
          <button
            className="retry-button"
            onClick={() => navigate('/categories')}
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const settingsStr = localStorage.getItem('quizSettings');
  const settings = settingsStr ? JSON.parse(settingsStr) : {};

  return (
    <div className="gameplay-container">
      <header className="gameplay-header">
        <div className="header-top">
          <div className="header-left">
            <button
              onClick={() => navigate('/categories')}
              className="back-btn"
            >
              ←
            </button>
            <div className="quiz-info">
              <div className="quiz-category">
                {settings.category?.name || 'Quiz'}
              </div>
              <div className="question-counter">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
          </div>

          <div className="timer-container">
            <span className="timer-icon">⏱️</span>
            <span className="timer-value">{timer}s</span>
          </div>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </header>

      <main className="question-area">
        <div className="question-wrapper">
          <div className="question-card">
            <h1 className="question-text">{currentQ.question}</h1>

            <div className="options-grid">
              {currentQ.options.map((option, index) => {
                const letter = String.fromCharCode(65 + index);
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQ.correctAnswer;

                let optionClass = 'option-button';
                if (isAnswered) {
                  if (isCorrect) {
                    optionClass += ' option-correct';
                  } else if (isSelected && !isCorrect) {
                    optionClass += ' option-wrong';
                  }
                } else if (isSelected) {
                  optionClass += ' option-selected';
                }

                return (
                  <button
                    key={index}
                    className={optionClass}
                    onClick={() => handleAnswerClick(option)}
                    disabled={isAnswered}
                  >
                    <span className="option-badge">{letter}</span>
                    <span className="option-label">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="actions-row">
            <button className="skip-btn" onClick={handleSkip}>
              Skip Question
            </button>
            <button
              className={`next-btn ${!isAnswered ? 'next-btn-disabled' : ''}`}
              onClick={handleNext}
              disabled={!isAnswered}
            >
              {currentQuestion === questions.length - 1
                ? 'Finish Quiz'
                : 'Next Question'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gameplay;
