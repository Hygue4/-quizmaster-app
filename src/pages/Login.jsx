import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: name || email.split('@')[0],
      email: email,
      score: 0,
      gamesPlayed: 0,
    };

    localStorage.setItem('currentUser', JSON.stringify(userData));
    navigate('/home');
  };

  const handleGuestMode = () => {
    const guestData = {
      name: 'Guest',
      email: 'guest@quizmaster.com',
      score: 0,
      gamesPlayed: 0,
    };
    localStorage.setItem('currentUser', JSON.stringify(guestData));
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <div className="logo-container">
            <span className="logo-icon">🏆</span>
          </div>
          <h1>QuizMaster</h1>
          <p>Test your knowledge, compete globally</p>
        </div>

        <div className="login-form-container">
          <div className="tab-buttons">
            <button
              className={!isSignUp ? 'tab-active' : ''}
              onClick={() => setIsSignUp(false)}
            >
              Login
            </button>
            <button
              className={isSignUp ? 'tab-active' : ''}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              {isSignUp ? 'Create Account' : 'Login'}
            </button>
          </form>

          <div className="divider">OR</div>

          <button className="guest-button" onClick={handleGuestMode}>
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
