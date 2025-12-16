import React from 'react';
import './App.css';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🏆 QuizMaster</h1>
        <p>Test your knowledge across multiple topics!</p>
        <div style={{ marginTop: '20px' }}>
          <Button variant="primary">Start Quiz</Button>
        </div>
        <div style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>
          <p>✅ Week 1: Design & Setup Complete</p>
          <p>🚧 Week 2: Development In Progress</p>
        </div>
      </header>
    </div>
  );
}

export default App;
