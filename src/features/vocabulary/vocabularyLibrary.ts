/**
 * Vocabulary Library - Central Export
 * 
 * This file provides a unified interface for all vocabulary-related
 * functionality, data, and utilities.
 */

// Types
export type {
  VocabularyItem,
  VocabularyCategory,
  VocabularyFilter,
  CreateVocabularyDto,
  UpdateVocabularyDto,
} from './vocabulary';

// Utilities
export {
  // Flashcard
  generateFlashcard,
  type FlashcardMode,
  type FlashcardDisplay,
  FLASHCARD_MODE_LABELS,
  
  // Filtering & Searching
  filterVocabulary,
  sortVocabulary,
  type SortOption,
  
  // Grouping
  groupByCategory,
  groupByTags,
  type VocabularyGroup,
  type TagGroup,
  
  // Statistics
  getVocabularyStats,
  type VocabularyStats,
  
  // Import/Export
  exportToJSON,
  importFromJSON,
  
  // Helpers
  shuffleArray,
  CATEGORY_LABELS,
} from './vocabularyHelpers';

// Hooks
export { useVocabulary } from './useVocabulary';
export { useFlashcardManager } from '../flashcards/useFlashcardManager';

// Services
export type { IVocabularyStorage } from './IVocabularyStorage';
export { LocalStorageVocabularyStorage } from './LocalStorageVocabularyStorage';
export { ApiVocabularyStorage } from './ApiVocabularyStorage';

// CustomList and ListItem are now in vocabulary.ts

// Components
export { VocabularyForm } from './VocabularyForm';
