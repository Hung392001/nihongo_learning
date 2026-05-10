import { VocabularyItem, CreateVocabularyDto, UpdateVocabularyDto } from '../types/vocabulary';
import { IVocabularyStorage } from './IVocabularyStorage';
import { generateId, getCurrentTimestamp } from '../utils/flashcardHelpers';

const STORAGE_KEY = 'nihongo_vocabulary';

/**
 * localStorage implementation of vocabulary storage
 * Simple, synchronous, client-side persistence
 * 
 * Pros:
 * - No backend required
 * - Fast synchronous access
 * - Simple implementation
 * - Good for MVP/prototype
 * 
 * Cons:
 * - Limited to ~5-10MB storage
 * - No cross-device sync
 * - Data lost if user clears browser data
 * - No concurrent user support
 */
export class LocalStorageVocabularyStorage implements IVocabularyStorage {
  
  /**
   * Load all items from localStorage
   */
  private loadFromStorage(): VocabularyItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as VocabularyItem[];
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return [];
    }
  }

  /**
   * Save all items to localStorage
   */
  private saveToStorage(items: VocabularyItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw new Error('Failed to save vocabulary data');
    }
  }

  async getAll(): Promise<VocabularyItem[]> {
    return this.loadFromStorage();
  }

  async getById(id: string): Promise<VocabularyItem | null> {
    const items = this.loadFromStorage();
    return items.find(item => item.id === id) || null;
  }

  async create(data: CreateVocabularyDto): Promise<VocabularyItem> {
    const items = this.loadFromStorage();
    
    const newItem: VocabularyItem = {
      id: generateId(),
      vietnamese: data.vietnamese.trim(),
      hiragana: data.hiragana.trim(),
      kanji: data.kanji?.trim() || null,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };

    items.push(newItem);
    this.saveToStorage(items);
    
    return newItem;
  }

  async update(id: string, data: UpdateVocabularyDto): Promise<VocabularyItem> {
    const items = this.loadFromStorage();
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error(`Vocabulary item with id ${id} not found`);
    }

    const updatedItem: VocabularyItem = {
      ...items[index],
      ...(data.vietnamese !== undefined && { vietnamese: data.vietnamese.trim() }),
      ...(data.hiragana !== undefined && { hiragana: data.hiragana.trim() }),
      ...(data.kanji !== undefined && { kanji: data.kanji?.trim() || null }),
      updatedAt: getCurrentTimestamp(),
    };

    items[index] = updatedItem;
    this.saveToStorage(items);
    
    return updatedItem;
  }

  async delete(id: string): Promise<void> {
    const items = this.loadFromStorage();
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) {
      throw new Error(`Vocabulary item with id ${id} not found`);
    }

    this.saveToStorage(filteredItems);
  }

  async clear(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  }
}
