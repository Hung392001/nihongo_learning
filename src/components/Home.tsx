import React from 'react';
import './Home.css';

interface HomeProps {
  onNavigate: (page: string) => void;
  vocabularyCount: number;
}

/**
 * Home page component with navigation to different learning features
 */
export const Home: React.FC<HomeProps> = ({ onNavigate, vocabularyCount }) => {
  return (
    <div className="home-container">
      <section className="home-hero">
        <h2>Welcome to Nihongo Learning! 🇯🇵</h2>
        <p>Choose your learning path below</p>
      </section>

      <div className="home-grid">
        {/* Flashcards Section */}
        <div className="home-card flashcards-card" onClick={() => onNavigate('flashcards')}>
          <div className="card-icon">📇</div>
          <h3>Flashcards</h3>
          <p className="card-description">Practice vocabulary with interactive flashcards</p>
          <div className="card-stats">
            <span className="stat-badge">{vocabularyCount} words</span>
          </div>
          <div className="card-cta">Start Practice →</div>
        </div>

        {/* Vocabulary Library Section */}
        <div className="home-card vocabulary-card" onClick={() => onNavigate('vocabulary')}>
          <div className="card-icon">📚</div>
          <h3>Vocabulary Library</h3>
          <p className="card-description">Browse vocabulary organized by units</p>
          <div className="card-features">
            <span className="feature-tag">Unit 1</span>
            <span className="feature-tag">Unit 2</span>
            <span className="feature-tag">More...</span>
          </div>
          <div className="card-cta">Browse Library →</div>
        </div>

        {/* Alphabets Section */}
        <div className="home-card alphabet-card" onClick={() => onNavigate('alphabet')}>
          <div className="card-icon">🔤</div>
          <h3>Hiragana & Katakana</h3>
          <p className="card-description">Learn and practice Japanese alphabets</p>
          <div className="card-features">
            <span className="feature-tag">ひらがな</span>
            <span className="feature-tag">カタカナ</span>
          </div>
          <div className="card-cta">Learn Alphabets →</div>
        </div>

        {/* Grammar Section */}
        <div className="home-card grammar-card" onClick={() => onNavigate('grammar')}>
          <div className="card-icon">📖</div>
          <h3>Grammar</h3>
          <p className="card-description">Master essential Japanese grammar patterns</p>
          <div className="card-features">
            <span className="feature-tag">Basics</span>
            <span className="feature-tag">Patterns</span>
            <span className="feature-tag">Exercises</span>
          </div>
          <div className="card-cta">Study Grammar →</div>
        </div>
      </div>

      <section className="home-quick-stats">
        <h3>Your Learning Stats</h3>
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-number">{vocabularyCount}</div>
            <div className="stat-label">Words Added</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3</div>
            <div className="stat-label">Learning Modes</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">∞</div>
            <div className="stat-label">Practice Sessions</div>
          </div>
        </div>
      </section>
    </div>
  );
};
