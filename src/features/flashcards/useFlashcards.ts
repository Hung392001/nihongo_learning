import { useState, useEffect, useCallback } from 'react';
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
} from './flashcard';

interface UseFlashcardsReturn {
  // Flashcard items
  flashcards: FlashcardItem[];
  
  // Decks
  decks: FlashcardDeck[];
  
  // Deck items (for managing card order in decks)
  deckItems: Map<string, DeckItem[]>;
  
  // State
  loading: boolean;
  error: string | null;
  
  // Flashcard CRUD
  createFlashcard: (data: CreateFlashcardDto) => Promise<FlashcardItem>;
  updateFlashcard: (id: string, data: UpdateFlashcardDto) => Promise<FlashcardItem>;
  deleteFlashcard: (id: string) => Promise<void>;
  
  // Deck CRUD
  createDeck: (data: CreateDeckDto) => Promise<FlashcardDeck>;
  updateDeck: (id: string, data: UpdateDeckDto) => Promise<FlashcardDeck>;
  deleteDeck: (id: string, deleteCards?: boolean) => Promise<void>;
  
  // Deck item operations
  addToDeck: (deckId: string, flashcardId: string, note?: string, order?: number) => Promise<DeckItem>;
  removeFromDeck: (deckItemId: string) => Promise<void>;
  reorderDeck: (deckId: string, itemIds: string[]) => Promise<void>;
  
  // Get deck contents
  getDeckContents: (deckId: string) => FlashcardItem[];
  
  // Import/Export
  exportDeck: (deckId: string) => Promise<FlashcardExport>;
  exportAll: () => Promise<FlashcardExport>;
  importDeck: (data: FlashcardExport) => Promise<string>;
  importAll: (data: FlashcardExport) => Promise<void>;
  
  // Refresh
  refresh: () => Promise<void>;
}

/**
 * Custom hook for managing flashcard operations
 * Provides complete CRUD operations for flashcards, decks, and deck items
 */
export function useFlashcards(storage: IFlashcardStorage | null): UseFlashcardsReturn {
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>([]);
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [deckItems, setDeckItems] = useState<Map<string, DeckItem[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all data
  const loadData = useCallback(async () => {
    if (!storage) {
      setFlashcards([]);
      setDecks([]);
      setDeckItems(new Map());
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Load in parallel
      const [flashcardsData, decksData] = await Promise.all([
        storage.getAllFlashcards(),
        storage.getAllDecks(),
      ]);
      
      setFlashcards(flashcardsData);
      setDecks(decksData);
      
      // Load deck items for each deck
      const itemsMap = new Map<string, DeckItem[]>();
      for (const deck of decksData) {
        const items = await storage.getDeckItems(deck.id);
        itemsMap.set(deck.id, items);
      }
      setDeckItems(itemsMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load flashcard data');
      console.error('Error loading flashcards:', err);
    } finally {
      setLoading(false);
    }
  }, [storage]);

  // Flashcard CRUD
  const createFlashcard = useCallback(async (data: CreateFlashcardDto) => {
    if (!storage) throw new Error('Storage not initialized');
    
    try {
      setError(null);
      const newItem = await storage.createFlashcard(data);
      setFlashcards(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create flashcard';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage]);

  const updateFlashcard = useCallback(async (id: string, data: UpdateFlashcardDto) => {
    if (!storage) throw new Error('Storage not initialized');
    
    try {
      setError(null);
      const updatedItem = await storage.updateFlashcard(id, data);
      setFlashcards(prev => 
        prev.map(item => item.id === id ? updatedItem : item)
      );
      return updatedItem;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update flashcard';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage]);

  const deleteFlashcard = useCallback(async (id: string) => {
    if (!storage) throw new Error('Storage not initialized');
    
    try {
      setError(null);
      await storage.deleteFlashcard(id);
      setFlashcards(prev => prev.filter(item => item.id !== id));
      
      // Remove from deck items maps
      setDeckItems(prev => {
        const newMap = new Map(prev);
        for (const [deckId, items] of newMap) {
          newMap.set(deckId, items.filter(item => item.flashcardId !== id));
        }
        return newMap;
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete flashcard';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage]);

  // Deck CRUD
  const createDeck = useCallback(async (data: CreateDeckDto) => {
    if (!storage) throw new Error('Storage not initialized');
    
    try {
      setError(null);
      const newDeck = await storage.createDeck(data);
      setDecks(prev => [...prev, newDeck]);
      setDeckItems(prev => new Map(prev).set(newDeck.id, []));
      return newDeck;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create deck';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage]);

  const updateDeck = useCallback(async (id: string, data: UpdateDeckDto) => {
    if (!storage) throw new Error('Storage not initialized');
    
    try {
      setError(null);
      const updatedDeck = await storage.updateDeck(id, data);
      setDecks(prev => 
        prev.map(deck => deck.id === id ? updatedDeck : deck)
      );
      return updatedDeck;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update deck';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage]);

  const deleteDeck = useCallback(async (id: string, deleteCards: boolean = false) => {
    if (!storage) throw new Error('Storage not initialized');
    
    try {
      setError(null);
      await storage.deleteDeck(id, deleteCards);
      
      setDecks(prev => prev.filter(deck => deck.id !== id));
      setDeckItems(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      
      if (deleteCards) {
        // Remove all flashcards that were only in this deck
        const deckItemsList = deckItems.get(id) || [];
        const flashcardIdsToRemove = deckItemsList.map(item => item.flashcardId);
        setFlashcards(prev => 
          prev.filter(f => !flashcardIdsToRemove.includes(f.id))
        );
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete deck';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage, deckItems]);

  // Deck item operations
  const addToDeck = useCallback(async (deckId: string, flashcardId: string, note?: string, order?: number) => {
    if (!storage) throw new Error('Storage not initialized');
    
    try {
      setError(null);
      const newItem = await storage.addToDeck(deckId, flashcardId, note, order);
      
      setDeckItems(prev => {
        const newMap = new Map(prev);
        const currentItems = newMap.get(deckId) || [];
        newMap.set(deckId, [...currentItems, newItem].sort((a, b) => (a.displayOrder ?? a.order ?? 0) - (b.displayOrder ?? b.order ?? 0)));
        return newMap;
      });
      
      return newItem;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add to deck';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage]);

  const removeFromDeck = useCallback(async (deckItemId: string) => {
    if (!storage) throw new Error('Storage not initialized');
    
    try {
      setError(null);
      await storage.removeFromDeck(deckItemId);
      
      setDeckItems(prev => {
        const newMap = new Map(prev);
        for (const [deckId, items] of newMap) {
          newMap.set(deckId, items.filter(item => item.id !== deckItemId));
        }
        return newMap;
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to remove from deck';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage]);

  const reorderDeck = useCallback(async (deckId: string, itemIds: string[]) => {
    if (!storage) throw new Error('Storage not initialized');
    
    try {
      setError(null);
      await storage.reorderDeckItems(deckId, itemIds);
      
      setDeckItems(prev => {
        const newMap = new Map(prev);
        const currentItems = newMap.get(deckId) || [];
        const sortedItems = [...currentItems].sort((a, b) => {
          const aIndex = itemIds.indexOf(a.id);
          const bIndex = itemIds.indexOf(b.id);
          return aIndex - bIndex;
        });
        newMap.set(deckId, sortedItems);
        return newMap;
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to reorder deck';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage]);

  // Get deck contents
  const getDeckContents = useCallback((deckId: string): FlashcardItem[] => {
    const items = deckItems.get(deckId) || [];
    return items
      .sort((a, b) => (a.displayOrder ?? a.order ?? 0) - (b.displayOrder ?? b.order ?? 0))
      .map(item => {
        // Try to find the flashcard by ID first
        if (item.flashcardId) {
          const found = flashcards.find(f => f.id === item.flashcardId);
          if (found) return found;
        }
        // If flashcard not found or no flashcardId, use denormalized data from deckItem
        if (item.front && item.back) {
          return {
            id: item.id,
            front: item.front,
            back: item.back,
            kana: item.furigana || item.kana,
            note: item.note,
            tags: [],
            createdAt: item.createdAt || Date.now(),
            updatedAt: item.updatedAt || Date.now(),
          };
        }
        return null;
      })
      .filter((f): f is FlashcardItem => f !== null);
  }, [deckItems, flashcards]);

  // Import/Export
  const exportDeck = useCallback(async (deckId: string): Promise<FlashcardExport> => {
    if (!storage) throw new Error('Storage not initialized');
    return storage.exportDeck(deckId);
  }, [storage]);

  const exportAll = useCallback(async (): Promise<FlashcardExport> => {
    if (!storage) throw new Error('Storage not initialized');
    return storage.exportAll();
  }, [storage]);

  const importDeck = useCallback(async (data: FlashcardExport): Promise<string> => {
    if (!storage) throw new Error('Storage not initialized');
    
    try {
      setError(null);
      const deckId = await storage.importDeck(data);
      await loadData(); // Reload all data
      return deckId;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to import deck';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage, loadData]);

  const importAll = useCallback(async (data: FlashcardExport): Promise<void> => {
    if (!storage) throw new Error('Storage not initialized');
    
    try {
      setError(null);
      await storage.import(data);
      await loadData(); // Reload all data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to import data';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage, loadData]);

  // Refresh
  const refresh = useCallback(async () => {
    await loadData();
  }, [loadData]);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    flashcards,
    decks,
    deckItems,
    loading,
    error,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
    createDeck,
    updateDeck,
    deleteDeck,
    addToDeck,
    removeFromDeck,
    reorderDeck,
    getDeckContents,
    exportDeck,
    exportAll,
    importDeck,
    importAll,
    refresh,
  };
}
