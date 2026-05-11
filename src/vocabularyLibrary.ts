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

// Unit Data
export {
  unit1Vocabulary,
  getVocabularyByCategory,
  getVocabularyByTag,
  searchVocabulary as searchUnit1Vocabulary,
  UNIT1_VOCAB_COUNT,
  UNIT1_CATEGORIES,
} from './data/unit1Vocabulary';

export {
  unit2Vocabulary,
  getUnit2VocabularyByCategory,
  getUnit2VocabularyByTag,
  searchUnit2Vocabulary,
  UNIT2_VOCAB_COUNT,
  UNIT2_CATEGORIES,
} from './data/unit2Vocabulary';

export {
  unit3Vocabulary,
  getUnit3VocabularyByCategory,
  getUnit3VocabularyByTag,
  searchUnit3Vocabulary,
  UNIT3_VOCAB_COUNT,
  UNIT3_CATEGORIES,   
} from './data/unit3Vocabulary';

export {
  unit4Vocabulary,
  getUnit4VocabularyByCategory,
  getUnit4VocabularyByTag,
  searchUnit4Vocabulary,
  UNIT4_VOCAB_COUNT,
  UNIT4_CATEGORIES,   
} from './data/unit4Vocabulary';

export {
  unit5Vocabulary,
  getUnit5VocabularyByCategory,
  getUnit5VocabularyByTag,
  searchUnit5Vocabulary,
  UNIT5_VOCAB_COUNT,
  UNIT5_CATEGORIES,   
} from './data/unit5Vocabulary';

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

/**
 * Default vocabulary initialization helper
 * Combines Unit 1 and Unit 2 for initial app setup
 */
import { unit1Vocabulary } from './data/unit1Vocabulary';
import { unit2Vocabulary } from './data/unit2Vocabulary';
import { unit3Vocabulary } from './data/unit3Vocabulary';
import { unit4Vocabulary } from './data/unit4Vocabulary';
import { unit5Vocabulary } from './data/unit5Vocabulary';
import { getCurrentTimestamp } from './utils/flashcardHelpers';
import type { VocabularyItem } from './types/vocabulary';

export function getInitialVocabulary(): VocabularyItem[] {
  const timestamp = getCurrentTimestamp();
  const allVocabulary = [...unit1Vocabulary, ...unit2Vocabulary, ...unit3Vocabulary, ...unit4Vocabulary, ...unit5Vocabulary];
  
  return allVocabulary.map(item => ({
    ...item,
    createdAt: timestamp,
    updatedAt: timestamp,
  }));
}

/**
 * Get vocabulary by unit number
 */
export function getVocabularyByUnit(unit: number): VocabularyItem[] {
  const timestamp = getCurrentTimestamp();
  
  if (unit === 1) {
    return unit1Vocabulary.map(item => ({
      ...item,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));
  }
  
  if (unit === 2) {
    return unit2Vocabulary.map(item => ({
      ...item,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));
  }

  if (unit === 3) { 
    return unit3Vocabulary.map(item => ({
      ...item,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));
  }

  if (unit === 4) {
    return unit4Vocabulary.map(item => ({
      ...item,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));
  }

  if (unit === 5) {
    return unit5Vocabulary.map(item => ({
      ...item,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));
  }

  return [];
}

/**
 * Get all available units
 */
export function getAvailableUnits(): number[] {
  return [1, 2, 3, 4, 5];
}

/**
 * Vocabulary Library Metadata
 */
export const VOCABULARY_METADATA = {
  version: '1.1.0',
  totalUnits: 5,
  totalVocabulary: unit1Vocabulary.length + unit2Vocabulary.length + unit3Vocabulary.length + unit4Vocabulary.length + unit5Vocabulary.length,
  lastUpdated: '2026-05-11',
  units: {
    1: { count: unit1Vocabulary.length, name: 'Tự giới thiệu & Chào hỏi' },
    2: { count: unit2Vocabulary.length, name: 'Đại từ chỉ định & Đồ vật' },
    3: { count: unit3Vocabulary.length, name: 'Động từ & Tính từ' },
    4: { count: unit4Vocabulary.length, name: 'Unit 4' },
    5: { count: unit5Vocabulary.length, name: 'Unit 5' },
  },
  supportedModes: [
    'vi-to-hiragana',
    'vi-to-kanji',
    'hiragana-to-vi',
    'kanji-to-hiragana',
    'kanji-to-vi',
    'mixed',
  ] as const,
  supportedCategories: [
    'pronoun',
    'people',
    'occupation',
    'country',
    'place',
    'greeting',
    'grammar',
    'question',
    'number',
    'honorific',
    'phrase',
  ] as const,
};
