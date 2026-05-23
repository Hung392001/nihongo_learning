// Flashcards Feature Index
// Export all flashcard-related components, hooks, services, types, and utilities

// Components
export { Flashcard } from './Flashcard';
export { FlashcardControls } from './FlashcardControls';
export { FlashcardDeckModal } from './FlashcardDeckModal';
export { FlashcardForm } from './FlashcardForm';
export { FlashcardManager } from './FlashcardManager';
export { ModeSelector } from './ModeSelector';

// Hooks
export { useFlashcardManager } from './useFlashcardManager';
export { useFlashcards } from './useFlashcards';

// Services
export type { IFlashcardStorage } from './IFlashcardStorage';

// Types
export type {
  FlashcardItem,
  FlashcardDeck,
  CreateFlashcardDto,
  UpdateFlashcardDto,
  DeckItem,
  FlashcardStats,
} from './flashcard';

// Utilities
export {
  getAvailableModes,
  calculateStatistics,
} from './flashcardHelpers';

// Re-export FlashcardMode from vocabulary types
export type { FlashcardMode } from '../vocabulary/vocabulary';
