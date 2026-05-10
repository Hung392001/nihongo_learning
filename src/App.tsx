import React, { useEffect, useMemo, useState } from 'react';
import { FlashcardMode } from './types/vocabulary';
import { LocalStorageVocabularyStorage } from './services/LocalStorageVocabularyStorage';
import { useVocabulary } from './hooks/useVocabulary';
import { useFlashcardManager } from './hooks/useFlashcardManager';
import { getAvailableModes, calculateStatistics } from './utils/flashcardHelpers';
import { Flashcard } from './components/Flashcard';
import { FlashcardControls } from './components/FlashcardControls';
import { ModeSelector } from './components/ModeSelector';
import { VocabularyManager } from './components/VocabularyManager';
import { StatisticsPanel } from './components/StatisticsPanel';
import { Home } from './components/Home';
import { Navigation } from './components/Navigation';
import { Grammar } from './components/Grammar';
import './App.css';

// Initialize storage (can be swapped with ApiVocabularyStorage)
const storage = new LocalStorageVocabularyStorage();

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'flashcards' | 'vocabulary' | 'alphabet' | 'grammar'>('home');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlaySpeed] = useState(3000); // 3 seconds
  const [showStats, setShowStats] = useState(false);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);
  // Vocabulary management
  const { vocabulary, loading, error, create, update, remove, refresh } = useVocabulary(storage);

  // Flashcard management
  const {
    state,
    flip,
    next,
    previous,
    changeMode,
    shuffle,
  } = useFlashcardManager({
    vocabulary,
    initialMode: FlashcardMode.VI_TO_HIRA,
  });

  // Available modes based on vocabulary
  const availableModes = useMemo(() => getAvailableModes(vocabulary), [vocabulary]);

  // Calculate statistics
  const statistics = useMemo(() => calculateStatistics(vocabulary), [vocabulary]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !state.content) return;
    
    const timer = setTimeout(() => {
      if (!state.isFlipped) {
        flip();
      } else {
        if (state.currentIndex < state.totalCards - 1) {
          next();
        } else {
          setAutoPlay(false); // Stop at end
        }
      }
    }, autoPlaySpeed);
    
    return () => clearTimeout(timer);
  }, [autoPlay, state.isFlipped, state.currentIndex, state.totalCards, autoPlaySpeed, flip, next, state.content]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          flip();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          previous();
          break;
        case 'ArrowRight':
          e.preventDefault();
          next();
          break;
        case 's':
        case 'S':
          e.preventDefault();
          shuffle();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [flip, next, previous, shuffle]);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading vocabulary...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Navigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode(!darkMode)}
        />
        <div className="error-container">
          <div className="error">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={refresh}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode(!darkMode)}
      />

      {currentPage === 'home' ? (
        <Home onNavigate={setCurrentPage} vocabularyCount={vocabulary.length} />
      ) : currentPage === 'flashcards' ? (
        <main className="app-main">
          {showStats && vocabulary.length > 0 && (
            <StatisticsPanel statistics={statistics} />
          )}

          {vocabulary.length === 0 ? (
            <div className="empty-vocabulary">
              <div className="empty-icon">📚</div>
              <h2>No vocabulary yet!</h2>
              <p>Add your first Japanese word to start learning</p>
              <button onClick={() => setCurrentPage('home')} className="back-to-home-btn">
                ← Back to Home
              </button>
            </div>
          ) : (
            <>
              <ModeSelector
                currentMode={state.mode}
                availableModes={availableModes}
                onModeChange={changeMode}
              />

              {state.content && (
                <>
                  <Flashcard
                    front={state.content.front}
                    back={state.content.back}
                    isFlipped={state.isFlipped}
                    onFlip={flip}
                  />

                  <FlashcardControls
                    currentIndex={state.currentIndex}
                    totalCards={state.totalCards}
                    onPrevious={previous}
                    onNext={next}
                    onShuffle={shuffle}
                    canGoPrevious={state.currentIndex > 0}
                    canGoNext={state.currentIndex < state.totalCards - 1}
                  />

                  <div className="extra-controls">
                    <button
                      onClick={() => setAutoPlay(!autoPlay)}
                      className={`auto-play-button ${autoPlay ? 'active' : ''}`}
                      title={autoPlay ? 'Stop autoplay' : 'Start autoplay'}
                    >
                      {autoPlay ? '⏸️ Stop' : '▶️ Autoplay'}
                    </button>
                  </div>

                  <div className="keyboard-hints">
                    <span>💡 Keyboard shortcuts:</span>
                    <kbd>Space</kbd> Flip
                    <kbd>←</kbd> Previous
                    <kbd>→</kbd> Next
                    <kbd>S</kbd> Shuffle
                  </div>
                </>
              )}
            </>
          )}

          <VocabularyManager
            vocabulary={vocabulary}
            onCreate={create}
            onUpdate={update}
            onDelete={remove}
          />
        </main>
      ) : currentPage === 'vocabulary' ? (
        <main className="app-main">
          <div className="feature-placeholder">
            <div className="placeholder-icon">📚</div>
            <h2>Vocabulary Library</h2>
            <p>Browse and organize vocabulary by units</p>
            <p className="coming-soon">Coming soon...</p>
          </div>
        </main>
      ) : currentPage === 'alphabet' ? (
        <main className="app-main">
          <div className="feature-placeholder">
            <div className="placeholder-icon">🔤</div>
            <h2>Hiragana & Katakana</h2>
            <p>Learn and practice Japanese alphabets</p>
            <p className="coming-soon">Coming soon...</p>
          </div>
        </main>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Grammar onNavigate={setCurrentPage} />
        </div>
      )}

      <footer className="app-footer">
        <p>Built with React + TypeScript | Data persisted in localStorage</p>
      </footer>
    </div>
  );
}

export default App;
