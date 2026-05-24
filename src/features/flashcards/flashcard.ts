/**
 * Flashcard Types
 * Independent from Vocabulary types
 */

/**
 * A single flashcard item
 */
export interface FlashcardItem {
  /** Unique identifier */
  id: string;
  
  /** Front side text (e.g., Japanese word/kanji) */
  front: string;
  
  /** Back side text (e.g., Vietnamese meaning) */
  back: string;
  
  /** Kana/reading (optional, for pronunciation help) */
  kana?: string;
  
  /** Notes or example sentence (optional) */
  note?: string;
  
  /** Tags for categorization (optional) */
  tags?: string[];
  
  /** Creation timestamp */
  createdAt: number;
  
  /** Last update timestamp */
  updatedAt: number;
  
  /** Difficulty level (1-5, similar to JLPT N5-N1) */
  difficulty?: 1 | 2 | 3 | 4 | 5;
  
  /** Whether this card is marked as favorite */
  isFavorite?: boolean;
  
  /** Audio URL for pronunciation (optional) */
  audioUrl?: string;
}

/**
 * DTO for creating a new flashcard item
 */
export interface CreateFlashcardDto {
  front: string;
  back: string;
  kana?: string;
  note?: string;
  tags?: string[];
  difficulty?: 1 | 2 | 3 | 4 | 5;
  isFavorite?: boolean;
  audioUrl?: string;
}

/**
 * DTO for updating an existing flashcard item
 */
export interface UpdateFlashcardDto {
  front?: string;
  back?: string;
  kana?: string;
  note?: string;
  tags?: string[];
  difficulty?: 1 | 2 | 3 | 4 | 5;
  isFavorite?: boolean;
  audioUrl?: string;
}

/**
 * A flashcard deck/list
 */
export interface FlashcardDeck {
  /** Unique identifier */
  id: string;
  
  /** Deck name/title */
  name: string;
  
  /** Description (optional) */
  description?: string;
  
  /** Color for visual distinction (optional) */
  color?: string;
  
  /** Icon/emoji for the deck (optional) */
  icon?: string;
  
  /** Creation timestamp */
  createdAt: number;
  
  /** Last update timestamp */
  updatedAt: number;
  
  /** Whether this is a built-in/system deck */
  isBuiltIn?: boolean;
}

/**
 * DTO for creating a new flashcard deck
 */
export interface CreateDeckDto {
  name: string;
  userId?: string;
  description?: string;
  color?: string;
  icon?: string;
  sourceType?: string;
  sourceId?: string;
  vocabularyListId?: string;
}

/**
 * DTO for updating a flashcard deck
 */
export interface UpdateDeckDto {
  name?: string;
  description?: string;
  color?: string;
  icon?: string;
}

/**
 * Reference to a flashcard item in a deck
 */
export interface DeckItem {
  /** Unique identifier */
  id: string;
  
  /** The deck this item belongs to */
  deckId: string;
  
  /** The flashcard item ID */
  flashcardId?: string | null;
  
  /** When it was added to the deck */
  addedAt?: number;
  createdAt?: number;
  updatedAt?: number;
  
  /** Custom note for this item in the deck (optional) */
  note?: string;
  
  /** Order within the deck (optional) */
  order?: number;
  displayOrder?: number;
  
  // Flashcard data (denormalized for performance)
  front?: string;
  back?: string;
  furigana?: string;
  kana?: string;
  
  // Additional fields from database
  level?: number;
  type?: string;
  tags?: string[];
  unitId?: string;
}

/**
 * Import/Export format for flashcard decks
 */
export interface FlashcardDeckExport {
  deck: {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
  };
  cards: {
    front: string;
    back: string;
    kana?: string;
    note?: string;
    tags?: string[];
    difficulty?: 1 | 2 | 3 | 4 | 5;
  }[];
}

/**
 * Import/Export format for multiple decks
 */
export interface FlashcardExport {
  version: string;
  decks: FlashcardDeckExport[];
}

/**
 * Statistics for flashcard practice
 */
export interface FlashcardStats {
  totalCards: number;
  totalDecks: number;
  studiedToday: number;
  masteryScore: number; // 0-100
}

/**
 * Sort options for flashcard lists
 */
export type FlashcardSortOption = 
  | 'newest'
  | 'oldest'
  | 'az'
  | 'za'
  | 'difficulty-asc'
  | 'difficulty-desc'
  | 'favorite-first';

/**
 * Filter options for flashcards
 */
export interface FlashcardFilter {
  deckId?: string;
  tags?: string[];
  difficulty?: number;
  isFavorite?: boolean;
  searchTerm?: string;
}
