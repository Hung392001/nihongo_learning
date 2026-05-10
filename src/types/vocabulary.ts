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
  
  /** Creation timestamp */
  createdAt: number;
  
  /** Last update timestamp */
  updatedAt: number;
  
  /** Favorite/starred for priority review */
  isFavorite?: boolean;
  
  /** Personal note or memory hint */
  note?: string;
  
  /** Category for organization */
  category?: string;
  
  // Future extensibility fields (commented for v2):
  // romaji?: string;
  // exampleSentence?: string;
  // audioUrl?: string;
  // difficulty?: 1 | 2 | 3 | 4 | 5;
  // tags?: string[];
}

/**
 * DTO for creating new vocabulary items
 */
export interface CreateVocabularyDto {
  vietnamese: string;
  hiragana: string;
  kanji?: string | null;
}

/**
 * DTO for updating existing vocabulary items
 */
export interface UpdateVocabularyDto {
  vietnamese?: string;
  hiragana?: string;
  kanji?: string | null;
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
