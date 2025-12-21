import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Gameplay from './pages/Gameplay';
import Results from './pages/Results';
import Leaderboard from './pages/Leaderboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route - redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />

          {/* Main App Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/gameplay" element={<Gameplay />} />
          <Route path="/results" element={<Results />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* Catch-all route - redirect to login if route doesn't exist */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
