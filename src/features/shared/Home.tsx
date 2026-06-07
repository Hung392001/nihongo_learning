import React from "react";
import "./Home.css";

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
      <div className="home-grid">
        {/* Flashcards Section */}
        <div
          className="home-card flashcards-card"
          onClick={() => onNavigate("flashcards")}
        >
          <div className="card-icon">📇</div>
          <h3>Flashcards Practice</h3>
          <p className="card-description">
            Practice vocabulary with interactive flashcards with 3 display modes
          </p>
          <div className="card-features">
            <span className="feature-tag">Hiragana → Vietnamese</span>
            <span className="feature-tag">Hiragana → Kanji</span>
            <span className="feature-tag">Kanji → Hiragana</span>
          </div>
          <div className="card-stats">
            <span className="stat-badge">{vocabularyCount} words</span>
          </div>
          <div className="card-cta">Start Practice →</div>
        </div>

        {/* Old Vocabulary Library Section */}
        <div
          className="home-card vocabulary-card"
          onClick={() => onNavigate("vocabulary")}
        >
          <div className="card-icon">📚</div>
          <h3>Vocabulary (Legacy)</h3>
          <p className="card-description">
            Browse vocabulary in a table format, can switch to flashcard
            practice
          </p>
          <div className="card-features">
            <span className="feature-tag">Unit 1-21</span>
            <span className="feature-tag">466+ words</span>
            <span className="feature-tag">Table + Flashcard</span>
          </div>
          <div className="card-cta">View Vocabulary →</div>
        </div>

        {/* Alphabets Section */}
        <div
          className="home-card alphabet-card"
          onClick={() => onNavigate("alphabet")}
        >
          <div className="card-icon">🔤</div>
          <h3>Hiragana & Katakana</h3>
          <p className="card-description">
            Learn and practice Japanese alphabets
          </p>
          <div className="card-features">
            <span className="feature-tag">Hiragana</span>
            <span className="feature-tag">Katakana</span>
          </div>
          <div className="card-cta">Learn Alphabets →</div>
        </div>

        {/* Grammar Section */}
        <div
          className="home-card grammar-card"
          onClick={() => onNavigate("grammar")}
        >
          <div className="card-icon">📖</div>
          <h3>Grammar</h3>
          <p className="card-description">
            Master essential Japanese grammar patterns
          </p>
          <div className="card-features">
            <span className="feature-tag">Basics</span>
            <span className="feature-tag">Patterns</span>
            <span className="feature-tag">Exercises</span>
          </div>
          <div className="card-cta">Study Grammar →</div>
        </div>

        {/* Kanji Section */}
        <div
          className="home-card kanji-card"
          onClick={() => onNavigate("kanji")}
        >
          <div className="card-icon">🎌</div>
          <h3>Kanji</h3>
          <p className="card-description">
            Learn kanji characters and their stroke orders
          </p>
          <div className="card-features">
            <span className="feature-tag">Numbers 1-10</span>
            <span className="feature-tag">Stroke Guide</span>
            <span className="feature-tag">Visual Learning</span>
          </div>
          <div className="card-cta">Learn Kanji →</div>
        </div>
      </div>
    </div>
  );
};
