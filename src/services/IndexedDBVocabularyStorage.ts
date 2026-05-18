/**
 * IndexedDB Vocabulary Storage
 * Implements IVocabularyStorage using IndexedDB
 */

import { IVocabularyStorage } from './IVocabularyStorage';
import { VocabularyItem, CreateVocabularyDto, UpdateVocabularyDto, VocabularyCategory } from '../types/vocabulary';
import { dbService, VocabularyDBItem, CustomList, ListItem, IndexedDBService } from './IndexedDBService';

const INITIALIZED_KEY = 'nihongo_indexeddb_initialized';
const VERSION_KEY = 'nihongo_indexeddb_version';
const CURRENT_VERSION = '1.0.0';

/**
 * Convert VocabularyDBItem to VocabularyItem
 */
function dbItemToVocabularyItem(item: VocabularyDBItem): VocabularyItem {
  return {
    id: item.id,
    hiragana: item.hiragana,
    kanji: item.kanji,
    vietnamese: item.vietnamese,
    category: item.category as VocabularyCategory | undefined,
    tags: item.tags,
    exampleSentence: item.exampleSentence,
    exampleSentenceHiragana: item.exampleSentenceHiragana,
    exampleTranslationVi: item.exampleTranslationVi,
    unit: item.unit,
    difficulty: item.difficulty as 1 | 2 | 3 | 4 | 5 | undefined,
    romaji: item.romaji,
    audioUrl: item.audioUrl,
    isFavorite: item.isFavorite,
    note: item.note,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}



/**
 * IndexedDB implementation of vocabulary storage
 * Uses the IndexedDBService for database operations
 */
export class IndexedDBVocabularyStorage implements IVocabularyStorage {
  /**
   * Initialize storage with built-in vocabulary if empty or outdated
   */
  private async initializeIfEmpty(): Promise<void> {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    const isInitialized = localStorage.getItem(INITIALIZED_KEY);

    // Re-initialize if storage is empty or version is outdated
    const needsInitialization = !isInitialized || storedVersion !== CURRENT_VERSION;

    if (needsInitialization) {
      try {
        // Just mark as initialized - data will be empty
        // Users should use API (PostgreSQL) for full vocabulary
        localStorage.setItem(INITIALIZED_KEY, 'true');
        localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
      } catch (error) {
        console.error('Error initializing IndexedDB:', error);
      }
    }
  }

  async getAll(): Promise<VocabularyItem[]> {
    await this.initializeIfEmpty();
    const items = await dbService.getAllVocabulary();
    return items.map(dbItemToVocabularyItem);
  }

  async getById(id: string): Promise<VocabularyItem | null> {
    await this.initializeIfEmpty();
    const item = await dbService.getVocabularyById(id);
    return item ? dbItemToVocabularyItem(item) : null;
  }

  async create(data: CreateVocabularyDto): Promise<VocabularyItem> {
    await this.initializeIfEmpty();

    const newItem: Omit<VocabularyDBItem, 'id' | 'createdAt' | 'updatedAt'> = {
      hiragana: data.hiragana.trim(),
      kanji: data.kanji?.trim() || null,
      vietnamese: data.vietnamese.trim(),
      romaji: data.romaji?.trim(),
      category: data.category,
      tags: data.tags,
      exampleSentence: data.exampleSentence?.trim(),
      exampleSentenceHiragana: data.exampleSentenceHiragana?.trim(),
      exampleTranslationVi: data.exampleTranslationVi?.trim(),
      unit: data.unit,
      difficulty: data.difficulty,
      audioUrl: data.audioUrl?.trim(),
      isFavorite: data.isFavorite || false,
      note: data.note?.trim(),
      isBuiltIn: false,
    };

    const id = await dbService.addVocabulary(newItem);
    const createdItem = await dbService.getVocabularyById(id);
    
    if (!createdItem) {
      throw new Error('Failed to retrieve created vocabulary item');
    }

    return dbItemToVocabularyItem(createdItem);
  }

  async update(id: string, data: UpdateVocabularyDto): Promise<VocabularyItem> {
    await this.initializeIfEmpty();

    const updates: Partial<VocabularyDBItem> = {
      ...(data.hiragana !== undefined && { hiragana: data.hiragana.trim() }),
      ...(data.kanji !== undefined && { kanji: data.kanji?.trim() || null }),
      ...(data.vietnamese !== undefined && { vietnamese: data.vietnamese.trim() }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.tags !== undefined && { tags: data.tags }),
      ...(data.isFavorite !== undefined && { isFavorite: data.isFavorite }),
      ...(data.note !== undefined && { note: data.note }),
      updatedAt: Date.now(),
    };

    await dbService.updateVocabulary(id, updates);

    const updatedItem = await dbService.getVocabularyById(id);
    if (!updatedItem) {
      throw new Error(`Vocabulary item with id ${id} not found after update`);
    }

    return dbItemToVocabularyItem(updatedItem);
  }

  async delete(id: string): Promise<void> {
    await this.initializeIfEmpty();
    await dbService.deleteVocabulary(id);
  }

  async clear(): Promise<void> {
    await this.initializeIfEmpty();
    await dbService.clearAllVocabulary();
  }

  // ============ CUSTOM LIST OPERATIONS ============

  /**
   * Get all custom lists
   */
  async getAllCustomLists(): Promise<CustomList[]> {
    await this.initializeIfEmpty();
    return dbService.getAllCustomLists();
  }

  /**
   * Create a new custom list
   */
  async createCustomList(name: string, description?: string, color?: string, icon?: string): Promise<string> {
    await this.initializeIfEmpty();
    return dbService.createCustomList(name, description, color, icon);
  }

  /**
   * Delete a custom list
   */
  async deleteCustomList(id: string): Promise<void> {
    await this.initializeIfEmpty();
    await dbService.deleteCustomList(id);
  }

  /**
   * Update a custom list
   */
  async updateCustomList(id: string, updates: Partial<CustomList>): Promise<void> {
    await this.initializeIfEmpty();
    await dbService.updateCustomList(id, updates);
  }

  /**
   * Add vocabulary to a custom list
   */
  async addToCustomList(listId: string, vocabularyId: string, note?: string): Promise<string> {
    await this.initializeIfEmpty();
    return dbService.addItemToList(listId, vocabularyId, note);
  }

  /**
   * Remove vocabulary from a custom list
   */
  async removeFromCustomList(itemId: string): Promise<void> {
    await this.initializeIfEmpty();
    await dbService.removeItemFromList(itemId);
  }

  /**
   * Get all vocabulary items in a custom list
   */
  async getVocabularyInList(listId: string): Promise<VocabularyItem[]> {
    await this.initializeIfEmpty();
    const items = await dbService.getVocabularyForList(listId);
    return items.map(dbItemToVocabularyItem);
  }

  /**
   * Get all list items (references) for a list
   */
  async getListItems(listId: string): Promise<ListItem[]> {
    await this.initializeIfEmpty();
    return dbService.getListItemsByListId(listId);
  }

  /**
   * Check if vocabulary is in a list
   */
  async isInList(listId: string, vocabularyId: string): Promise<boolean> {
    await this.initializeIfEmpty();
    return dbService.isVocabularyInList(listId, vocabularyId);
  }

  /**
   * Search vocabulary
   */
  async search(query: string): Promise<VocabularyItem[]> {
    await this.initializeIfEmpty();
    const items = await dbService.searchVocabulary(query);
    return items.map(dbItemToVocabularyItem);
  }

  /**
   * Get vocabulary by unit
   */
  async getByUnit(unit: number): Promise<VocabularyItem[]> {
    await this.initializeIfEmpty();
    const items = await dbService.getVocabularyByUnit(unit);
    return items.map(dbItemToVocabularyItem);
  }

  /**
   * Get all built-in vocabulary (from units)
   */
  async getBuiltInVocabulary(): Promise<VocabularyItem[]> {
    await this.initializeIfEmpty();
    const allItems = await dbService.getAllVocabulary();
    return allItems
      .filter(item => item.isBuiltIn)
      .map(dbItemToVocabularyItem);
  }

  /**
   * Get user-created vocabulary
   */
  async getUserVocabulary(): Promise<VocabularyItem[]> {
    await this.initializeIfEmpty();
    const allItems = await dbService.getAllVocabulary();
    return allItems
      .filter(item => !item.isBuiltIn)
      .map(dbItemToVocabularyItem);
  }

  /**
   * Reinitialize with fresh data (for updates)
   */
  async reinitialize(): Promise<void> {
    localStorage.removeItem(INITIALIZED_KEY);
    localStorage.removeItem(VERSION_KEY);
    await dbService.clearAllVocabulary();
    await this.initializeIfEmpty();
  }

  /**
   * Check if IndexedDB is available
   */
  static isSupported(): boolean {
    return IndexedDBService.isSupported();
  }
}

// Export a singleton instance
export const indexedDBStorage = new IndexedDBVocabularyStorage();
