import React, { useState } from 'react';
import { useKanji } from '../hooks/useKanji';
import './Kanji.css';

interface KanjiProps {
  onNavigate: (page: string) => void;
}

/**
 * Kanji learning component for numbers 1-10
 * Fetches data from kanji database
 */
export const Kanji: React.FC<KanjiProps> = ({ onNavigate }) => {
  const { kanji, loading, error, currentIndex, currentKanji, goToKanji, nextKanji, previousKanji } = useKanji();
  const [showStrokeGuide, setShowStrokeGuide] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <main className="kanji-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading kanji data...</p>
        </div>
      </main>
    );
  }

  if (error || kanji.length === 0) {
    return (
      <main className="kanji-container">
        <div className="error-state">
          <h2>Error loading kanji</h2>
          <p>{error || 'No kanji data available'}</p>
          <button onClick={() => onNavigate('home')} className="back-home-btn">
            ← Back to Home
          </button>
        </div>
      </main>
    );
  }

  if (!currentKanji) {
    return null;
  }

  const handleNext = () => {
    if (currentIndex < kanji.length - 1) {
      nextKanji();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      previousKanji();
    }
  };

  return (
    <main className="kanji-container">
      <div className="kanji-header">
        <h1>🎌 学ぶ漢字 - Kanji Learning</h1>
        <p>Numbers 1-10 from database (数字 1-10)</p>
      </div>

      {/* Main kanji display area */}
      <div className="kanji-main-display">
        <div className="kanji-card">
          <div className="kanji-number-badge">
            {currentKanji.kstroke}
          </div>

          {/* Kanji character */}
          <div className="kanji-visualization">
            <div className="kanji-large">
              {currentKanji.ka_utf}
            </div>
          </div>

          {/* Character details */}
          <div className="kanji-details">
            <div className="detail-row">
              <span className="label">Kanji:</span>
              <span className="kanji-char">{currentKanji.ka_utf}</span>
            </div>
            <div className="detail-row">
              <span className="label">Meaning:</span>
              <span className="value">{currentKanji.meaning}</span>
            </div>
            <div className="detail-row">
              <span className="label">On-yomi:</span>
              <span className="value">{currentKanji.onyomi_ja} ({currentKanji.onyomi})</span>
            </div>
            <div className="detail-row">
              <span className="label">Kun-yomi:</span>
              <span className="value">{currentKanji.kunyomi_ja} ({currentKanji.kunyomi})</span>
            </div>
            <div className="detail-row">
              <span className="label">Strokes:</span>
              <span className="value">{currentKanji.kstroke}</span>
            </div>
            <div className="detail-row">
              <span className="label">Radical:</span>
              <span className="value">{currentKanji.rad_name} ({currentKanji.rad_utf})</span>
            </div>
          </div>

          {/* Examples section */}
          {currentKanji.examples && currentKanji.examples.length > 0 && (
            <div className="examples-section">
              <h3>例 - Examples:</h3>
              <div className="examples-list">
                {currentKanji.examples.map((example, idx) => (
                  <div key={idx} className="example-item">
                    <span className="example-text">{example[0]}</span>
                    <span className="example-meaning">{example[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stroke guide toggle */}
          <button
            className={`stroke-guide-btn ${showStrokeGuide ? 'active' : ''}`}
            onClick={() => setShowStrokeGuide(!showStrokeGuide)}
          >
            {showStrokeGuide ? '✓ Stroke Guide Shown' : 'Show Stroke Guide'}
          </button>
        </div>

        {/* Writing practice hint */}
        {showStrokeGuide && (
          <div className="stroke-guide">
            <h3>✏️ How to Write</h3>
            <p>This character has {currentKanji.kstroke} stroke(s).</p>
            <p className="hint">Practice writing the character following proper stroke order:</p>
            <div className="stroke-info">
              <p>Stroke count: <strong>{currentKanji.kstroke}</strong></p>
              <p>Radical: <strong>{currentKanji.rad_name}</strong> ({currentKanji.rad_utf})</p>
            </div>
          </div>
        )}
      </div>

      {/* Kanji grid selector */}
      <div className="kanji-grid">
        <p className="grid-title">Numbers 1-10 Kanji:</p>
        <div className="number-grid">
          {kanji.map((k, idx) => (
            <button
              key={k.ka_id}
              className={`grid-item ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => {
                goToKanji(idx);
                setShowStrokeGuide(false);
              }}
              title={k.meaning}
            >
              <div className="grid-number">{k.meaning}</div>
              <div className="grid-kanji">{k.ka_utf}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="kanji-controls">
        <button
          className="control-btn prev"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          title="Previous kanji"
        >
          ← Previous
        </button>

        <div className="progress-indicator">
          <span className="current">{currentIndex + 1}</span>
          <span className="separator">/</span>
          <span className="total">{kanji.length}</span>
        </div>

        <button
          className="control-btn next"
          onClick={handleNext}
          disabled={currentIndex === kanji.length - 1}
          title="Next kanji"
        >
          Next →
        </button>
      </div>

      {/* Back button */}
      <div className="kanji-footer">
        <button
          className="back-home-btn"
          onClick={() => onNavigate('home')}
        >
          ← Back to Home
        </button>
      </div>

      {/* Learning tips */}
      <section className="learning-tips">
        <h3>💡 Learning Tips</h3>
        <ul>
          <li><strong>On-yomi (音読み):</strong> Chinese reading, used in most modern words</li>
          <li><strong>Kun-yomi (訓読み):</strong> Japanese reading, often used in native words</li>
          <li><strong>Radical (部首):</strong> The key component that groups kanji by meaning</li>
          <li><strong>Numbers:</strong> These are among the most important kanji to master</li>
          <li><strong>Practice:</strong> Write each kanji repeatedly to improve retention</li>
        </ul>
      </section>
    </main>
  );
};
