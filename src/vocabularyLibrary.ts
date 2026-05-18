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
} from './types/vocabulary';

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
} from './utils/vocabularyHelpers';

// Hooks
export { useVocabulary } from './hooks/useVocabulary';
export { useFlashcardManager } from './hooks/useFlashcardManager';

// Services
export type { IVocabularyStorage } from './services/IVocabularyStorage';
export { LocalStorageVocabularyStorage } from './services/LocalStorageVocabularyStorage';
export { ApiVocabularyStorage } from './services/ApiVocabularyStorage';

// Services - IndexedDB
export { IndexedDBVocabularyStorage, indexedDBStorage } from './services/IndexedDBVocabularyStorage';
// CustomList and ListItem are now in types/vocabulary.ts

// Components
export { VocabularyForm } from './components/VocabularyForm';
