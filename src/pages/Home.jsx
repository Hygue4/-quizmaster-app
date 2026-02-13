import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  // Removed unused 'user' variable - it was never used in the component

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="logo-section">
          <div className="logo-box">
            <span className="logo-icon">🏆</span>
          </div>
          <h1>QuizMaster</h1>
          <p className="subtitle">
            Test your knowledge across multiple topics and compete with others!
          </p>
        </div>

        <div className="actions">
          <button
            className="btn-primary"
            onClick={() => navigate('/categories')}
          >
            <span>▶️</span> Start Quiz
          </button>

          <button
            className="btn-secondary"
            onClick={() => navigate('/leaderboard')}
          >
            <span>🏆</span> View Leaderboard
          </button>
        </div>

        <div className="stats">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Questions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Players</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
