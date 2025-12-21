import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Categories.css';

const Categories = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  // Open Trivia DB Categories with CORRECT IDs
  const categories = [
    { id: 9, name: 'General Knowledge', icon: '🧠', color: 'blue' },
    { id: 17, name: 'Science & Nature', icon: '🔬', color: 'green' },
    { id: 23, name: 'History', icon: '📚', color: 'amber' },
    { id: 22, name: 'Geography', icon: '🌍', color: 'teal' },
    { id: 21, name: 'Sports', icon: '⚽', color: 'red' },
    { id: 11, name: 'Movies', icon: '🎬', color: 'purple' },
    { id: 12, name: 'Music', icon: '🎵', color: 'pink' },
    { id: 18, name: 'Computers', icon: '💻', color: 'indigo' },
  ];

  const handleCategoryClick = (category) => {
    const quizSettings = {
      category: category,
      difficulty: selectedDifficulty,
      amount: numberOfQuestions,
    };

    console.log('Saving quiz settings:', quizSettings);
    console.log('Category ID:', category.id);
    console.log('Category Name:', category.name);

    localStorage.setItem('quizSettings', JSON.stringify(quizSettings));
    navigate('/gameplay');
  };

  return (
    <div className="categories-container">
      {/* Header */}
      <header className="categories-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => navigate('/home')} className="back-button">
              ←
            </button>
            <h2>Choose Category</h2>
          </div>
          <div className="user-score">
            <span>🏆</span>
            <span>{user.score || 0} pts</span>
          </div>
        </div>
      </header>

      {/* Quiz Settings */}
      <div className="quiz-settings">
        <div className="settings-container">
          <div className="setting-group">
            <label>Number of Questions:</label>
            <select
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
              className="setting-select"
            >
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
              <option value={20}>20 Questions</option>
            </select>
          </div>

          <div className="setting-group">
            <label>Difficulty Level:</label>
            <div className="difficulty-buttons">
              <button
                className={`difficulty-btn ${
                  selectedDifficulty === 'easy' ? 'active easy' : 'easy'
                }`}
                onClick={() => setSelectedDifficulty('easy')}
              >
                Easy
              </button>
              <button
                className={`difficulty-btn ${
                  selectedDifficulty === 'medium' ? 'active medium' : 'medium'
                }`}
                onClick={() => setSelectedDifficulty('medium')}
              >
                Medium
              </button>
              <button
                className={`difficulty-btn ${
                  selectedDifficulty === 'hard' ? 'active hard' : 'hard'
                }`}
                onClick={() => setSelectedDifficulty('hard')}
              >
                Hard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${category.color}`}
            onClick={() => handleCategoryClick(category)}
          >
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-name">{category.name}</h3>
            <div className="category-info">
              <span>{numberOfQuestions} questions</span>
              <span className="play-icon">▶️</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
