import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Results.css';

const Results = () => {
  const navigate = useNavigate();
  const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const {
    totalQuestions = 10,
    correctAnswers = 0,
    wrongAnswers = 0,
    category = 'Quiz',
  } = results;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const pointsEarned = correctAnswers * 50;

  // Update user score
  useEffect(() => {
    const updatedUser = {
      ...user,
      score: (user.score || 0) + pointsEarned,
      gamesPlayed: (user.gamesPlayed || 0) + 1,
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  }, []);

  return (
    <div className="results-container">
      <div className="results-content">
        <div className="trophy-section">
          <div className="trophy-circle">
            <span className="trophy-icon">🏆</span>
          </div>
          <h1>Congratulations!</h1>
          <p>You've completed the {category} quiz</p>
        </div>

        <div className="score-card">
          <div className="score-display">
            <div className="score-percentage">{percentage}%</div>
            <div className="score-label">Your Score</div>
          </div>

          <div className="stats-grid">
            <div className="stat-card stat-correct">
              <span className="stat-icon">✅</span>
              <div className="stat-number">{correctAnswers}</div>
              <div className="stat-label">Correct</div>
            </div>
            <div className="stat-card stat-wrong">
              <span className="stat-icon">❌</span>
              <div className="stat-number">{wrongAnswers}</div>
              <div className="stat-label">Wrong</div>
            </div>
            <div className="stat-card stat-points">
              <span className="stat-icon">⭐</span>
              <div className="stat-number">+{pointsEarned}</div>
              <div className="stat-label">Points</div>
            </div>
          </div>

          <div className="result-actions">
            <button
              className="btn-primary"
              onClick={() => navigate('/categories')}
            >
              Try Another Quiz
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/leaderboard')}
            >
              View Leaderboard
            </button>
            <button className="btn-text" onClick={() => navigate('/home')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
