import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const [players] = useState([
    { rank: 1, name: 'Wesley R.', points: 5240, avatar: '👤' },
    { rank: 2, name: 'Noella I.', points: 4850, avatar: '👤' },
    { rank: 3, name: 'Adrian N.', points: 4620, avatar: '👤' },
    { rank: 4, name: 'Daudi R.', points: 4180, avatar: '👤' },
    { rank: 5, name: 'Junior T.', points: 3950, avatar: '👤' },
    { rank: 6, name: 'Respect T.', points: 3720, avatar: '👤' },
    { rank: 7, name: 'Bobo M.', points: 3580, avatar: '👤' },
    {
      rank: 8,
      name: currentUser.name || 'You',
      points: currentUser.score || 0,
      avatar: '👤',
      isCurrentUser: true,
    },
  ]);

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <div className="header-content">
          <div className="header-title">
            <span className="trophy-icon">🏆</span>
            <h2>Leaderboard</h2>
          </div>
          <div className="tabs">
            <button className="tab-active">All Time</button>
            <button>This Week</button>
            <button>Today</button>
          </div>
        </div>
      </header>

      <div className="podium-section">
        {/* 2nd Place - Left */}
        <div className="podium-item second">
          <div className="podium-avatar">👤</div>
          <div className="podium-card">
            <div className="medal">🥈</div>
            <div className="player-name">{players[1].name}</div>
            <div className="player-points">{players[1].points} pts</div>
          </div>
        </div>

        {/* 1st Place - Center (Taller) */}
        <div className="podium-item first">
          <div className="podium-avatar">👤</div>
          <div className="podium-card">
            <div className="medal">👑</div>
            <div className="player-name">{players[0].name}</div>
            <div className="player-points">{players[0].points} pts</div>
          </div>
        </div>

        {/* 3rd Place - Right */}
        <div className="podium-item third">
          <div className="podium-avatar">👤</div>
          <div className="podium-card">
            <div className="medal">🥉</div>
            <div className="player-name">{players[2].name}</div>
            <div className="player-points">{players[2].points} pts</div>
          </div>
        </div>
      </div>

      {/* Rankings List - Ranks 4-8 */}
      <div className="rankings-container">
        {players.slice(3).map((player, index) => (
          <div
            key={index}
            className={`ranking-row ${
              player.isCurrentUser ? 'current-user' : ''
            }`}
          >
            <div className="rank-badge">{player.rank}</div>
            <div className="player-avatar">{player.avatar}</div>
            <div className="player-info">
              <div className="player-name">{player.name}</div>
              <div className="player-points">{player.points} points</div>
            </div>
            {player.isCurrentUser && <span className="chart-icon">📊</span>}
          </div>
        ))}
      </div>

      <button className="back-home-button" onClick={() => navigate('/home')}>
        Back to Home
      </button>
    </div>
  );
};

export default Leaderboard;
