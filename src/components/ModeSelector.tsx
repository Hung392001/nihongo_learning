import React from 'react';
import { FlashcardMode } from '../types/vocabulary';
import { getModeName } from '../utils/flashcardHelpers';
import './ModeSelector.css';

interface ModeSelectorProps {
  currentMode: FlashcardMode;
  availableModes: FlashcardMode[];
  onModeChange: (mode: FlashcardMode) => void;
}

/**
 * Mode selector component for switching between learning modes
 */
export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  availableModes,
  onModeChange,
}) => {
  return (
    <div className="mode-selector">
      <label className="mode-selector-label">Learning Mode:</label>
      <div className="mode-selector-tabs">
        {availableModes.map((mode) => (
          <button
            key={mode}
            className={`mode-tab ${currentMode === mode ? 'active' : ''}`}
            onClick={() => onModeChange(mode)}
            aria-pressed={currentMode === mode}
          >
            {getModeName(mode)}
          </button>
        ))}
      </div>
    </div>
  );
};
