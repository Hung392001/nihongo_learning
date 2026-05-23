/**
 * Core data model for vocabulary items
 * Extensible design allows future additions (romaji, examples, audio, etc.)
 */
export interface VocabularyItem {
  /** Unique identifier */
  id: string;
  
  /** Vietnamese meaning/translation */
  vietnamese: string;
  
  /** Hiragana representation (always required) */
  hiragana: string;
  
  /** Kanji representation (optional - not all words have kanji) */
  kanji: string | null;
  
  /** Romanized pronunciation (romaji) */
  romaji?: string;
  
  /** Category for organization (pronoun, occupation, country, greeting, grammar) */
  category?: VocabularyCategory;
  
  /** Tags for flexible filtering and grouping */
  tags?: string[];
  
  /** Example sentence in Japanese (with kanji) */
  exampleSentence?: string;
  
  /** Example sentence in hiragana only */
  exampleSentenceHiragana?: string;
  
  /** Vietnamese translation of example sentence */
  exampleTranslationVi?: string;
  
  /** Unit/lesson number or ID for curriculum organization */
  unit?: number | string;
  
  /** Difficulty level (N5 = 1, N4 = 2, N3 = 3, N2 = 4, N1 = 5) */
  difficulty?: 1 | 2 | 3 | 4 | 5;
  
  /** Audio pronunciation URL (for future enhancement) */
  audioUrl?: string;
  
  /** Creation timestamp */
  createdAt: number;
  
  /** Last update timestamp */
  updatedAt: number;
  
  /** Favorite/starred for priority review */
  isFavorite?: boolean;
  
  /** Personal note or memory hint */
  note?: string;

  /** Whether this item is built-in (from initial data) vs user-created */
  isBuiltIn?: boolean;
}

export type VocabularyCategory = 
  | 'pronoun'
  | 'people'
  | 'occupation'
  | 'country'
  | 'place'
  | 'greeting'
  | 'grammar'
  | 'question'
  | 'number'
  | 'honorific'
  | 'phrase'
  | 'verb'
  | 'interjection'
  | 'transportation'
  | 'time'

/**
 * Filter criteria for vocabulary search
 */
export interface VocabularyFilter {
  category?: VocabularyCategory;
  unit?: number;
  tags?: string[];
  searchTerm?: string;
  difficulty?: number;
  isFavorite?: boolean;
}

/**
 * DTO for creating new vocabulary items
 */
export interface CreateVocabularyDto {
  vietnamese: string;
  hiragana: string;
  kanji?: string | null;
  romaji?: string;
  category?: VocabularyCategory;
  tags?: string[];
  exampleSentence?: string;
  exampleSentenceHiragana?: string;
  exampleTranslationVi?: string;
  unit?: number;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  audioUrl?: string;
  isFavorite?: boolean;
  note?: string;
}

/**
 * DTO for updating existing vocabulary items
 */
export interface UpdateVocabularyDto {
  vietnamese?: string;
  hiragana?: string;
  kanji?: string | null;
  isFavorite?: boolean;
  note?: string;
  category?: VocabularyCategory;
  tags?: string[];
}

/**
 * Learning modes for flashcards
 */
export enum FlashcardMode {
  /** Vietnamese → Hiragana */
  VI_TO_HIRA = 'VI_TO_HIRA',
  
  /** Hiragana → Kanji */
  HIRA_TO_KANJI = 'HIRA_TO_KANJI',
  
  /** Kanji → Hiragana */
  KANJI_TO_HIRA = 'KANJI_TO_HIRA',
}

/**
 * Flashcard content based on current mode
 */
export interface FlashcardContent {
  /** Front side of the card */
  front: string;
  
  /** Back side of the card */
  back: string;
  
  /** Original vocabulary item */
  item: VocabularyItem;
}

/**
 * Flashcard state management
 */
export interface FlashcardState {
  /** Current flashcard content */
  content: FlashcardContent | null;
  
  /** Is the card currently flipped? */
  isFlipped: boolean;
  
  /** Current learning mode */
  mode: FlashcardMode;
  
  /** Current card index in the deck */
  currentIndex: number;
  
  /** Total cards in current deck */
  totalCards: number;
}

/**
 * Statistics for learning progress (future enhancement)
 */
export interface LearningStats {
  totalWords: number;
  studiedToday: number;
  accuracy: number;
  streak: number;
}

/**
 * Sort options for vocabulary list
 */
export type SortOption = 
  | 'newest'        // Newest first
  | 'oldest'        // Oldest first
  | 'az'            // Alphabetical A-Z (Vietnamese)
  | 'za'            // Alphabetical Z-A
  | 'kanji-first'   // Words with kanji first
  | 'favorite-first'; // Favorite words first

/**
 * Vocabulary statistics
 */
export interface VocabularyStatistics {
  totalWords: number;
  wordsWithKanji: number;
  wordsWithoutKanji: number;
  favoriteWords: number;
  recentlyAdded: number; // Last 7 days
  categories: { name: string; count: number }[];
  oldestWord?: VocabularyItem;
  newestWord?: VocabularyItem;
}

/**
 * User preferences
 */
export interface UserPreferences {
  theme: 'light' | 'dark';
  autoPlayEnabled: boolean;
  autoPlaySpeed: number; // milliseconds
  defaultSort: SortOption;
}

/**
 * Custom list for organizing vocabulary
 */
export interface CustomList {
  id: string;
  name: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
  createdAt: number;
  updatedAt: number;
}

/**
 * Item in a custom list, linking vocabulary to a list
 */
export interface ListItem {
  id: string;
  listId: string;
  vocabularyId: string;
  addedAt: number;
  note?: string | null;
}

// ============ Dynamic Vocabulary Unit Types ============

/**
 * Vocabulary Unit - a user-created group of vocabulary items
 */
export interface VocabularyUnit {
  /** Unique identifier */
  id: string;
  
  /** Unit name (user-defined, e.g., "JLPT N5 Lesson 1", "Travel Vocabulary") */
  name: string;
  
  /** Optional description of the unit */
  description?: string;
  
  /** Display order for sorting */
  displayOrder: number;
  
  /** Creation timestamp */
  createdAt: number;
  
  /** Last update timestamp */
  updatedAt: number;
}

/**
 * Individual vocabulary item within a unit
 */
export interface VocabularyUnitItem {
  /** Unique identifier */
  id: string;
  
  /** Reference to the parent unit */
  unitId: string;
  
  /** Hiragana representation (required) */
  hiragana: string;
  
  /** Kanji representation (optional) */
  kanji?: string;
  
  /** Vietnamese meaning/translation (required) */
  vietnamese: string;
  
  /** Example sentence in hiragana (optional) */
  hiraganaSentence?: string;
  
  /** Display order within the unit */
  displayOrder: number;
  
  /** Creation timestamp */
  createdAt: number;
  
  /** Last update timestamp */
  updatedAt: number;
}

/**
 * DTO for creating a new vocabulary unit
 */
export interface CreateVocabularyUnitDto {
  name: string;
  description?: string;
  displayOrder?: number;
}

/**
 * DTO for updating a vocabulary unit
 */
export interface UpdateVocabularyUnitDto {
  name?: string;
  description?: string;
  displayOrder?: number;
}

/**
 * DTO for creating a new vocabulary item in a unit
 */
export interface CreateVocabularyUnitItemDto {
  unitId: string;
  hiragana: string;
  kanji?: string;
  vietnamese: string;
  hiraganaSentence?: string;
  displayOrder?: number;
}

/**
 * DTO for updating a vocabulary item in a unit
 */
export interface UpdateVocabularyUnitItemDto {
  hiragana?: string;
  kanji?: string;
  vietnamese?: string;
  hiraganaSentence?: string;
  displayOrder?: number;
}

/**
 * Response type for unit with its vocabulary items
 */
export interface VocabularyUnitWithItems extends VocabularyUnit {
  items: VocabularyUnitItem[];
}
