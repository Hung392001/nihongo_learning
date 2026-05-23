// Vocabulary Feature Index
// Export all vocabulary-related components, hooks, services, types, and utilities

// Components
export { VocabularyTable } from './VocabularyTable';
export { VocabularyForm } from './VocabularyForm';
export { UnitSelector } from './UnitSelector';
export { CustomListModal } from './CustomListModal';
export { QuickAddWordModal } from './QuickAddWordModal';

// Dynamic Vocabulary Components
export * from './DynamicVocabulary';

// Hooks
export { useVocabulary } from './useVocabulary';

// Services
export type { IVocabularyStorage } from './IVocabularyStorage';
export { ApiVocabularyStorage } from './ApiVocabularyStorage';
export { LocalStorageVocabularyStorage } from './LocalStorageVocabularyStorage';
export { DynamicVocabularyStorage, dynamicVocabularyStorage } from './DynamicVocabularyStorage';

// Types
export * from './vocabulary';

// Utilities (excluding types that are already exported from vocabulary.ts)
export {
  filterVocabulary,
  sortVocabulary,
  getVocabularyStats,
  groupByCategory,
  groupByTags,
  exportToJSON,
  importFromJSON,
  shuffleArray,
  CATEGORY_LABELS,
  generateFlashcard,
  FLASHCARD_MODE_LABELS,
} from './vocabularyHelpers';

// Re-export flashcard utilities from flashcards feature
export {
  createFlashcardContent,
  getModeName,
  getSortOptionName,
} from '../flashcards/flashcardHelpers';
