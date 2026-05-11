import { VocabularyItem, CreateVocabularyDto, UpdateVocabularyDto } from '../types/vocabulary';
import { IVocabularyStorage } from './IVocabularyStorage';
import { generateId, getCurrentTimestamp } from '../utils/flashcardHelpers';
import { unit1Vocabulary } from '../data/unit1Vocabulary';
import { unit2Vocabulary } from '../data/unit2Vocabulary';
import { unit3Vocabulary } from '../data/unit3Vocabulary';
import { unit4Vocabulary } from '../data/unit4Vocabulary';
import { unit5Vocabulary } from '../data/unit5Vocabulary';

const STORAGE_KEY = 'nihongo_vocabulary';
const INITIALIZED_KEY = 'nihongo_vocabulary_initialized';
const VERSION_KEY = 'nihongo_vocabulary_version';
const CURRENT_VERSION = '1.1.3'; // Updated to include Unit 2 and Unit 3

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

  /**
   * Initialize storage with Unit 1 & Unit 2 vocabulary if empty or outdated
   */
  private initializeIfEmpty(): void {
    const items = this.loadFromStorage();
    const storedVersion = localStorage.getItem(VERSION_KEY);
    
    // Re-initialize if storage is empty OR version is outdated
    const needsInitialization = items.length === 0 || storedVersion !== CURRENT_VERSION;
    
    if (needsInitialization) {
      const timestamp = getCurrentTimestamp();
      
      // Combine Unit 1, Unit 2, Unit 3, Unit 4, and Unit 5 vocabulary
      const allVocabulary = [...unit1Vocabulary, ...unit2Vocabulary, ...unit3Vocabulary, ...unit4Vocabulary, ...unit5Vocabulary];
      
      const initializedVocabulary: VocabularyItem[] = allVocabulary.map(item => ({
        ...item,
        createdAt: timestamp,
        updatedAt: timestamp,
      }));
      
      this.saveToStorage(initializedVocabulary);
      localStorage.setItem(INITIALIZED_KEY, 'true');
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
      console.log(`✅ Initialized with ${initializedVocabulary.length} vocabulary items (Unit 1: ${unit1Vocabulary.length}, Unit 2: ${unit2Vocabulary.length}, Unit 3: ${unit3Vocabulary.length}, Unit 4: ${unit4Vocabulary.length}, Unit 5: ${unit5Vocabulary.length})`);
    }
  }

  async getAll(): Promise<VocabularyItem[]> {
    this.initializeIfEmpty();
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
      ...(data.isFavorite !== undefined && { isFavorite: data.isFavorite }),
      ...(data.note !== undefined && { note: data.note }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.tags !== undefined && { tags: data.tags }),
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
