import React from 'react';
import './Flashcard.css';

interface FlashcardProps {
  front: string;
  back: string;
  isFlipped: boolean;
  onFlip: () => void;
}

/**
 * Flashcard component with flip animation
 * Displays front/back content and handles flip interaction
 */
export const Flashcard: React.FC<FlashcardProps> = ({
  front,
  back,
  isFlipped,
  onFlip,
}) => {
  return (
    <div className="flashcard-container">
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
        onClick={onFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onFlip();
          }
        }}
        aria-label={isFlipped ? `Back: ${back}` : `Front: ${front}`}
      >
        <div className="flashcard-face flashcard-front">
          <div className="flashcard-content">
            {front}
          </div>
          <div className="flashcard-hint">
            Click to reveal
          </div>
        </div>
        <div className="flashcard-face flashcard-back">
          <div className="flashcard-content">
            {back}
          </div>
        </div>
      </div>
    </div>
  );
};
