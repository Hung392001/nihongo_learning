import {
  FlashcardItem,
  FlashcardDeck,
  DeckItem,
  CreateFlashcardDto,
  UpdateFlashcardDto,
  CreateDeckDto,
  UpdateDeckDto,
  FlashcardExport,
} from './flashcard';

/**
 * Abstract storage interface for flashcard persistence
 * Allows swapping implementations (localStorage, API, IndexedDB, etc.)
 * 
 * This is independent from the Vocabulary storage to ensure separation of concerns.
 */
export interface IFlashcardStorage {
  // ============ Flashcard Item Operations ============
  
  /**
   * Get all flashcard items
   */
  getAllFlashcards(): Promise<FlashcardItem[]>;
  
  /**
   * Get a single flashcard item by ID
   */
  getFlashcardById(id: string): Promise<FlashcardItem | null>;
  
  /**
   * Create a new flashcard item
   */
  createFlashcard(data: CreateFlashcardDto): Promise<FlashcardItem>;
  
  /**
   * Update an existing flashcard item
   */
  updateFlashcard(id: string, data: UpdateFlashcardDto): Promise<FlashcardItem>;
  
  /**
   * Delete a flashcard item
   */
  deleteFlashcard(id: string): Promise<void>;
  
  /**
   * Delete multiple flashcard items
   */
  deleteMultipleFlashcards(ids: string[]): Promise<void>;
  
  // ============ Deck Operations ============
  
  /**
   * Get all flashcard decks
   */
  getAllDecks(): Promise<FlashcardDeck[]>;
  
  /**
   * Get a single deck by ID
   */
  getDeckById(id: string): Promise<FlashcardDeck | null>;
  
  /**
   * Create a new deck
   */
  createDeck(data: CreateDeckDto): Promise<FlashcardDeck>;
  
  /**
   * Update a deck
   */
  updateDeck(id: string, data: UpdateDeckDto): Promise<FlashcardDeck>;
  
  /**
   * Delete a deck (and optionally its items)
   */
  deleteDeck(id: string, deleteCards?: boolean): Promise<void>;
  
  // ============ Deck Item Operations ============
  
  /**
   * Add a flashcard to a deck
   */
  addToDeck(deckId: string, flashcardId: string, note?: string, order?: number): Promise<DeckItem>;
  
  /**
   * Remove a flashcard from a deck
   */
  removeFromDeck(deckItemId: string): Promise<void>;
  
  /**
   * Get all flashcards in a deck
   */
  getFlashcardsInDeck(deckId: string): Promise<FlashcardItem[]>;
  
  /**
   * Get all deck items for a deck (with order)
   */
  getDeckItems(deckId: string): Promise<DeckItem[]>;
  
  /**
   * Check if a flashcard is in a deck
   */
  isInDeck(deckId: string, flashcardId: string): Promise<boolean>;
  
  /**
   * Update deck item order
   */
  updateDeckItemOrder(deckItemId: string, newOrder: number): Promise<void>;
  
  /**
   * Reorder all items in a deck
   */
  reorderDeckItems(deckId: string, itemIds: string[]): Promise<void>;
  
  // ============ Search & Filter Operations ============
  
  /**
   * Search flashcards by text
   */
  searchFlashcards(query: string): Promise<FlashcardItem[]>;
  
  /**
   * Get flashcards by tag
   */
  getFlashcardsByTag(tag: string): Promise<FlashcardItem[]>;
  
  /**
   * Get flashcards by difficulty
   */
  getFlashcardsByDifficulty(difficulty: number): Promise<FlashcardItem[]>;
  
  /**
   * Get favorite flashcards
   */
  getFavoriteFlashcards(): Promise<FlashcardItem[]>;
  
  // ============ Import/Export Operations ============
  
  /**
   * Export all decks and cards
   */
  exportAll(): Promise<FlashcardExport>;
  
  /**
   * Export a single deck
   */
  exportDeck(deckId: string): Promise<FlashcardExport>;
  
  /**
   * Import decks and cards from export format
   */
  import(data: FlashcardExport): Promise<void>;
  
  /**
   * Import a single deck
   */
  importDeck(data: FlashcardExport): Promise<string>; // Returns deck ID
  
  // ============ Utility Operations ============
  
  /**
   * Get statistics
   */
  getStats(): Promise<{
    totalCards: number;
    totalDecks: number;
    favoriteCards: number;
  }>;
  
  /**
   * Clear all flashcard data
   */
  clear(): Promise<void>;
}
