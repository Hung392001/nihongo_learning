import type {
  IFlashcardStorage,
} from './IFlashcardStorage';
import type {
  FlashcardItem,
  FlashcardDeck,
  DeckItem,
  CreateFlashcardDto,
  UpdateFlashcardDto,
  CreateDeckDto,
  UpdateDeckDto,
  FlashcardExport,
} from '../types/flashcard';
import { generateId, getCurrentTimestamp } from '../utils/flashcardHelpers';

const FLASHCARDS_KEY = 'nihongo_flashcards';
const DECKS_KEY = 'nihongo_flashcard_decks';
const DECK_ITEMS_KEY = 'nihongo_flashcard_deck_items';

/**
 * LocalStorage implementation of flashcard storage
 * Simple, synchronous, client-side persistence
 * 
 * This is completely independent from the Vocabulary storage.
 */
export class LocalStorageFlashcardStorage implements IFlashcardStorage {
  
  /**
   * Load all flashcards from localStorage
   */
  private loadFlashcards(): FlashcardItem[] {
    try {
      const data = localStorage.getItem(FLASHCARDS_KEY);
      if (!data) return [];
      return JSON.parse(data) as FlashcardItem[];
    } catch (error) {
      console.error('Error loading flashcards from localStorage:', error);
      return [];
    }
  }
  
  /**
   * Save all flashcards to localStorage
   */
  private saveFlashcards(items: FlashcardItem[]): void {
    try {
      localStorage.setItem(FLASHCARDS_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving flashcards to localStorage:', error);
      throw new Error('Failed to save flashcard data');
    }
  }
  
  /**
   * Load all decks from localStorage
   */
  private loadDecks(): FlashcardDeck[] {
    try {
      const data = localStorage.getItem(DECKS_KEY);
      if (!data) return [];
      return JSON.parse(data) as FlashcardDeck[];
    } catch (error) {
      console.error('Error loading decks from localStorage:', error);
      return [];
    }
  }
  
  /**
   * Save all decks to localStorage
   */
  private saveDecks(decks: FlashcardDeck[]): void {
    try {
      localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
    } catch (error) {
      console.error('Error saving decks to localStorage:', error);
      throw new Error('Failed to save deck data');
    }
  }
  
  /**
   * Load all deck items from localStorage
   */
  private loadDeckItems(): DeckItem[] {
    try {
      const data = localStorage.getItem(DECK_ITEMS_KEY);
      if (!data) return [];
      return JSON.parse(data) as DeckItem[];
    } catch (error) {
      console.error('Error loading deck items from localStorage:', error);
      return [];
    }
  }
  
  /**
   * Save all deck items to localStorage
   */
  private saveDeckItems(items: DeckItem[]): void {
    try {
      localStorage.setItem(DECK_ITEMS_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving deck items to localStorage:', error);
      throw new Error('Failed to save deck item data');
    }
  }
  
  // ============ Flashcard Item Operations ============
  
  async getAllFlashcards(): Promise<FlashcardItem[]> {
    return this.loadFlashcards();
  }
  
  async getFlashcardById(id: string): Promise<FlashcardItem | null> {
    const flashcards = this.loadFlashcards();
    return flashcards.find(f => f.id === id) || null;
  }
  
  async createFlashcard(data: CreateFlashcardDto): Promise<FlashcardItem> {
    const flashcards = this.loadFlashcards();
    
    const newItem: FlashcardItem = {
      id: generateId(),
      front: data.front.trim(),
      back: data.back.trim(),
      kana: data.kana?.trim(),
      note: data.note?.trim(),
      tags: data.tags?.filter(t => t.trim()),
      difficulty: data.difficulty,
      isFavorite: data.isFavorite || false,
      audioUrl: data.audioUrl?.trim(),
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };
    
    flashcards.push(newItem);
    this.saveFlashcards(flashcards);
    
    return newItem;
  }
  
  async updateFlashcard(id: string, data: UpdateFlashcardDto): Promise<FlashcardItem> {
    const flashcards = this.loadFlashcards();
    const index = flashcards.findIndex(f => f.id === id);
    
    if (index === -1) {
      throw new Error(`Flashcard with id ${id} not found`);
    }
    
    const updatedItem: FlashcardItem = {
      ...flashcards[index],
      ...(data.front !== undefined && { front: data.front.trim() }),
      ...(data.back !== undefined && { back: data.back.trim() }),
      ...(data.kana !== undefined && { kana: data.kana?.trim() }),
      ...(data.note !== undefined && { note: data.note?.trim() }),
      ...(data.tags !== undefined && { tags: data.tags?.filter(t => t.trim()) }),
      ...(data.difficulty !== undefined && { difficulty: data.difficulty }),
      ...(data.isFavorite !== undefined && { isFavorite: data.isFavorite }),
      ...(data.audioUrl !== undefined && { audioUrl: data.audioUrl?.trim() }),
      updatedAt: getCurrentTimestamp(),
    };
    
    flashcards[index] = updatedItem;
    this.saveFlashcards(flashcards);
    
    return updatedItem;
  }
  
  async deleteFlashcard(id: string): Promise<void> {
    const flashcards = this.loadFlashcards();
    const filtered = flashcards.filter(f => f.id !== id);
    
    if (filtered.length === flashcards.length) {
      throw new Error(`Flashcard with id ${id} not found`);
    }
    
    this.saveFlashcards(filtered);
    
    // Also remove from deck items
    const deckItems = this.loadDeckItems();
    const updatedDeckItems = deckItems.filter(item => item.flashcardId !== id);
    this.saveDeckItems(updatedDeckItems);
  }
  
  async deleteMultipleFlashcards(ids: string[]): Promise<void> {
    const flashcards = this.loadFlashcards();
    const filtered = flashcards.filter(f => !ids.includes(f.id));
    this.saveFlashcards(filtered);
    
    // Remove from deck items
    const deckItems = this.loadDeckItems();
    const updatedDeckItems = deckItems.filter(item => !ids.includes(item.flashcardId));
    this.saveDeckItems(updatedDeckItems);
  }
  
  // ============ Deck Operations ============
  
  async getAllDecks(): Promise<FlashcardDeck[]> {
    return this.loadDecks();
  }
  
  async getDeckById(id: string): Promise<FlashcardDeck | null> {
    const decks = this.loadDecks();
    return decks.find(d => d.id === id) || null;
  }
  
  async createDeck(data: CreateDeckDto): Promise<FlashcardDeck> {
    const decks = this.loadDecks();
    
    const newDeck: FlashcardDeck = {
      id: generateId(),
      name: data.name.trim(),
      description: data.description?.trim(),
      color: data.color,
      icon: data.icon,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
      isBuiltIn: false,
    };
    
    decks.push(newDeck);
    this.saveDecks(decks);
    
    return newDeck;
  }
  
  async updateDeck(id: string, data: UpdateDeckDto): Promise<FlashcardDeck> {
    const decks = this.loadDecks();
    const index = decks.findIndex(d => d.id === id);
    
    if (index === -1) {
      throw new Error(`Deck with id ${id} not found`);
    }
    
    const updatedDeck: FlashcardDeck = {
      ...decks[index],
      ...(data.name !== undefined && { name: data.name.trim() }),
      ...(data.description !== undefined && { description: data.description?.trim() }),
      ...(data.color !== undefined && { color: data.color }),
      ...(data.icon !== undefined && { icon: data.icon }),
      updatedAt: getCurrentTimestamp(),
    };
    
    decks[index] = updatedDeck;
    this.saveDecks(decks);
    
    return updatedDeck;
  }
  
  async deleteDeck(id: string, deleteCards: boolean = false): Promise<void> {
    const decks = this.loadDecks();
    const deckIndex = decks.findIndex(d => d.id === id);
    
    if (deckIndex === -1) {
      throw new Error(`Deck with id ${id} not found`);
    }
    
    if (deleteCards) {
      // Get all flashcards in this deck
      const deckItems = this.loadDeckItems();
      const flashcardIds = deckItems
        .filter(item => item.deckId === id)
        .map(item => item.flashcardId);
      
      // Delete those flashcards
      const flashcards = this.loadFlashcards();
      const filteredFlashcards = flashcards.filter(f => !flashcardIds.includes(f.id));
      this.saveFlashcards(filteredFlashcards);
    }
    
    // Remove deck
    decks.splice(deckIndex, 1);
    this.saveDecks(decks);
    
    // Remove deck items
    const deckItems = this.loadDeckItems();
    const filteredDeckItems = deckItems.filter(item => item.deckId !== id);
    this.saveDeckItems(filteredDeckItems);
  }
  
  // ============ Deck Item Operations ============
  
  async addToDeck(deckId: string, flashcardId: string, note?: string, order?: number): Promise<DeckItem> {
    // Verify deck exists
    const decks = this.loadDecks();
    if (!decks.some(d => d.id === deckId)) {
      throw new Error(`Deck with id ${deckId} not found`);
    }
    
    // Verify flashcard exists
    const flashcards = this.loadFlashcards();
    if (!flashcards.some(f => f.id === flashcardId)) {
      throw new Error(`Flashcard with id ${flashcardId} not found`);
    }
    
    const deckItems = this.loadDeckItems();
    
    // Check if already in deck
    const existingItem = deckItems.find(item => item.deckId === deckId && item.flashcardId === flashcardId);
    if (existingItem) {
      throw new Error(`Flashcard ${flashcardId} already in deck ${deckId}`);
    }
    
    const newItem: DeckItem = {
      id: generateId(),
      deckId,
      flashcardId,
      addedAt: getCurrentTimestamp(),
      note: note?.trim(),
      order: order ?? deckItems.filter(item => item.deckId === deckId).length,
    };
    
    deckItems.push(newItem);
    this.saveDeckItems(deckItems);
    
    return newItem;
  }
  
  async removeFromDeck(deckItemId: string): Promise<void> {
    const deckItems = this.loadDeckItems();
    const filtered = deckItems.filter(item => item.id !== deckItemId);
    
    if (filtered.length === deckItems.length) {
      throw new Error(`Deck item with id ${deckItemId} not found`);
    }
    
    this.saveDeckItems(filtered);
  }
  
  async getFlashcardsInDeck(deckId: string): Promise<FlashcardItem[]> {
    const deckItems = this.loadDeckItems().filter(item => item.deckId === deckId);
    const flashcards = this.loadFlashcards();
    
    return deckItems
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map(item => flashcards.find(f => f.id === item.flashcardId))
      .filter((f): f is FlashcardItem => f !== undefined);
  }
  
  async getDeckItems(deckId: string): Promise<DeckItem[]> {
    const deckItems = this.loadDeckItems();
    return deckItems
      .filter(item => item.deckId === deckId)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  
  async isInDeck(deckId: string, flashcardId: string): Promise<boolean> {
    const deckItems = this.loadDeckItems();
    return deckItems.some(item => item.deckId === deckId && item.flashcardId === flashcardId);
  }
  
  async updateDeckItemOrder(deckItemId: string, newOrder: number): Promise<void> {
    const deckItems = this.loadDeckItems();
    const index = deckItems.findIndex(item => item.id === deckItemId);
    
    if (index === -1) {
      throw new Error(`Deck item with id ${deckItemId} not found`);
    }
    
    deckItems[index] = { ...deckItems[index], order: newOrder };
    this.saveDeckItems(deckItems);
  }
  
  async reorderDeckItems(deckId: string, itemIds: string[]): Promise<void> {
    const deckItems = this.loadDeckItems();
    const updatedItems = deckItems.map(item => {
      if (item.deckId === deckId) {
        const newIndex = itemIds.indexOf(item.id);
        if (newIndex !== -1) {
          return { ...item, order: newIndex };
        }
      }
      return item;
    });
    this.saveDeckItems(updatedItems);
  }
  
  // ============ Search & Filter Operations ============
  
  async searchFlashcards(query: string): Promise<FlashcardItem[]> {
    const flashcards = this.loadFlashcards();
    const lowerQuery = query.toLowerCase();
    
    return flashcards.filter(f =>
      f.front.toLowerCase().includes(lowerQuery) ||
      f.back.toLowerCase().includes(lowerQuery) ||
      (f.kana?.toLowerCase().includes(lowerQuery) ?? false) ||
      (f.note?.toLowerCase().includes(lowerQuery) ?? false) ||
      (f.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ?? false)
    );
  }
  
  async getFlashcardsByTag(tag: string): Promise<FlashcardItem[]> {
    const flashcards = this.loadFlashcards();
    return flashcards.filter(f => f.tags?.includes(tag) ?? false);
  }
  
  async getFlashcardsByDifficulty(difficulty: number): Promise<FlashcardItem[]> {
    const flashcards = this.loadFlashcards();
    return flashcards.filter(f => f.difficulty === difficulty);
  }
  
  async getFavoriteFlashcards(): Promise<FlashcardItem[]> {
    const flashcards = this.loadFlashcards();
    return flashcards.filter(f => f.isFavorite);
  }
  
  // ============ Import/Export Operations ============
  
  async exportAll(): Promise<FlashcardExport> {
    const decks = this.loadDecks();
    const flashcards = this.loadFlashcards();
    const deckItems = this.loadDeckItems();
    
    const exportData: FlashcardExport = {
      version: '1.0.0',
      decks: decks.map(deck => {
        const deckFlashcards = deckItems
          .filter(item => item.deckId === deck.id)
          .map(item => flashcards.find(f => f.id === item.flashcardId))
          .filter((f): f is FlashcardItem => f !== undefined);
        
        return {
          deck: {
            name: deck.name,
            description: deck.description,
            color: deck.color,
            icon: deck.icon,
          },
          cards: deckFlashcards.map(f => ({
            front: f.front,
            back: f.back,
            kana: f.kana,
            note: f.note,
            tags: f.tags,
            difficulty: f.difficulty,
          })),
        };
      }),
    };
    
    return exportData;
  }
  
  async exportDeck(deckId: string): Promise<FlashcardExport> {
    const decks = this.loadDecks();
    const deck = decks.find(d => d.id === deckId);
    
    if (!deck) {
      throw new Error(`Deck with id ${deckId} not found`);
    }
    
    const flashcards = this.loadFlashcards();
    const deckItems = this.loadDeckItems();
    const deckFlashcards = deckItems
      .filter(item => item.deckId === deckId)
      .map(item => flashcards.find(f => f.id === item.flashcardId))
      .filter((f): f is FlashcardItem => f !== undefined);
    
    return {
      version: '1.0.0',
      decks: [{
        deck: {
          name: deck.name,
          description: deck.description,
          color: deck.color,
          icon: deck.icon,
        },
        cards: deckFlashcards.map(f => ({
          front: f.front,
          back: f.back,
          kana: f.kana,
          note: f.note,
          tags: f.tags,
          difficulty: f.difficulty,
        })),
      }],
    };
  }
  
  async import(data: FlashcardExport): Promise<void> {
    const decks = this.loadDecks();
    const flashcards = this.loadFlashcards();
    const deckItems = this.loadDeckItems();
    
    for (const { deck: deckData, cards: cardDatas } of data.decks) {
      // Create deck
      const existingDeck = decks.find(d => d.name === deckData.name);
      const deck: FlashcardDeck = existingDeck || {
        id: generateId(),
        name: deckData.name,
        description: deckData.description,
        color: deckData.color,
        icon: deckData.icon,
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp(),
        isBuiltIn: false,
      };
      
      if (!existingDeck) {
        decks.push(deck);
      }
      
      // Create flashcards
      for (const cardData of cardDatas) {
        const existingCard = flashcards.find(f => 
          f.front === cardData.front && f.back === cardData.back
        );
        
        const flashcard: FlashcardItem = existingCard || {
          id: generateId(),
          front: cardData.front,
          back: cardData.back,
          kana: cardData.kana,
          note: cardData.note,
          tags: cardData.tags,
          difficulty: cardData.difficulty,
          isFavorite: false,
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
        };
        
        if (!existingCard) {
          flashcards.push(flashcard);
        }
        
        // Add to deck if this is a new import
        if (!existingDeck) {
          const existingItem = deckItems.find(item => 
            item.deckId === deck.id && item.flashcardId === flashcard.id
          );
          
          if (!existingItem) {
            const deckItem: DeckItem = {
              id: generateId(),
              deckId: deck.id,
              flashcardId: flashcard.id,
              addedAt: getCurrentTimestamp(),
              order: deckItems.filter(item => item.deckId === deck.id).length,
            };
            deckItems.push(deckItem);
          }
        }
      }
    }
    
    this.saveDecks(decks);
    this.saveFlashcards(flashcards);
    this.saveDeckItems(deckItems);
  }
  
  async importDeck(data: FlashcardExport): Promise<string> {
    // Import as a single deck
    if (data.decks.length === 0) {
      throw new Error('No decks to import');
    }
    
    const { deck: deckData, cards: cardDatas } = data.decks[0];
    const decks = this.loadDecks();
    const flashcards = this.loadFlashcards();
    const deckItems = this.loadDeckItems();
    
    // Create deck
    const deck: FlashcardDeck = {
      id: generateId(),
      name: deckData.name,
      description: deckData.description,
      color: deckData.color,
      icon: deckData.icon,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
      isBuiltIn: false,
    };
    
    decks.push(deck);
    
    // Create flashcards and add to deck
    for (const cardData of cardDatas) {
      const flashcard: FlashcardItem = {
        id: generateId(),
        front: cardData.front,
        back: cardData.back,
        kana: cardData.kana,
        note: cardData.note,
        tags: cardData.tags,
        difficulty: cardData.difficulty,
        isFavorite: false,
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp(),
      };
      
      flashcards.push(flashcard);
      
      const deckItem: DeckItem = {
        id: generateId(),
        deckId: deck.id,
        flashcardId: flashcard.id,
        addedAt: getCurrentTimestamp(),
        order: deckItems.filter(item => item.deckId === deck.id).length,
      };
      deckItems.push(deckItem);
    }
    
    this.saveDecks(decks);
    this.saveFlashcards(flashcards);
    this.saveDeckItems(deckItems);
    
    return deck.id;
  }
  
  // ============ Utility Operations ============
  
  async getStats(): Promise<{
    totalCards: number;
    totalDecks: number;
    favoriteCards: number;
  }> {
    const flashcards = this.loadFlashcards();
    const decks = this.loadDecks();
    
    return {
      totalCards: flashcards.length,
      totalDecks: decks.length,
      favoriteCards: flashcards.filter(f => f.isFavorite).length,
    };
  }
  
  async clear(): Promise<void> {
    localStorage.removeItem(FLASHCARDS_KEY);
    localStorage.removeItem(DECKS_KEY);
    localStorage.removeItem(DECK_ITEMS_KEY);
  }
}

export const localStorageFlashcardStorage = new LocalStorageFlashcardStorage();
