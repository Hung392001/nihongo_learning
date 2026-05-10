import React from 'react';
import './FlashcardControls.css';

interface FlashcardControlsProps {
  currentIndex: number;
  totalCards: number;
  onPrevious: () => void;
  onNext: () => void;
  onShuffle: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

/**
 * Flashcard navigation controls
 * Provides previous, next, and shuffle functionality
 */
export const FlashcardControls: React.FC<FlashcardControlsProps> = ({
  currentIndex,
  totalCards,
  onPrevious,
  onNext,
  onShuffle,
  canGoPrevious,
  canGoNext,
}) => {
  return (
    <div className="flashcard-controls">
      <div className="controls-progress">
        <span className="progress-text">
          Card {currentIndex + 1} of {totalCards}
        </span>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>
      </div>

      <div className="controls-buttons">
        <button
          className="control-button"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          aria-label="Previous card"
          title="Previous (←)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Previous
        </button>

        <button
          className="control-button control-button-shuffle"
          onClick={onShuffle}
          aria-label="Shuffle cards"
          title="Shuffle deck"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 3 21 3 21 8"></polyline>
            <line x1="4" y1="20" x2="21" y2="3"></line>
            <polyline points="21 16 21 21 16 21"></polyline>
            <line x1="15" y1="15" x2="21" y2="21"></line>
            <line x1="4" y1="4" x2="9" y2="9"></line>
          </svg>
          Shuffle
        </button>

        <button
          className="control-button"
          onClick={onNext}
          disabled={!canGoNext}
          aria-label="Next card"
          title="Next (→)"
        >
          Next
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};
