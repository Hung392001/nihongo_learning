/**
 * IndexedDB Service for Nihongo Learning
 * Provides database operations for vocabulary and custom lists
 */

import { CustomList, ListItem } from '../types/vocabulary';

const DB_NAME = 'NihongoLearningDB';
const DB_VERSION = 1;

// Store names
const VOCABULARY_STORE = 'vocabulary';
const CUSTOM_LISTS_STORE = 'customLists';
const LIST_ITEMS_STORE = 'listItems';

// Re-export types for backward compatibility
export type { CustomList, ListItem };

export interface VocabularyDBItem {
  id: string;
  hiragana: string;
  kanji: string | null;
  vietnamese: string;
  category?: string;
  tags?: string[];
  exampleSentence?: string;
  exampleSentenceHiragana?: string;
  exampleTranslationVi?: string;
  unit?: number;
  difficulty?: number;
  romaji?: string;
  audioUrl?: string;
  isFavorite?: boolean;
  note?: string;
  createdAt: number;
  updatedAt: number;
  // For built-in vocabulary
  isBuiltIn?: boolean;
}

/**
 * IndexedDB Service class
 * Manages all database operations for the application
 */
export class IndexedDBService {
  private db: IDBDatabase | null = null;
  private openPromise: Promise<void> | null = null;

  /**
   * Open the database
   */
  async open(): Promise<void> {
    if (this.db) {
      return;
    }

    if (this.openPromise) {
      return this.openPromise;
    }

    this.openPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Error opening IndexedDB');
        this.openPromise = null;
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.openPromise = null;
        resolve();
      };

      request.onupgradeneeded = () => {
        const db = request.result;

        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains(VOCABULARY_STORE)) {
          const vocabStore = db.createObjectStore(VOCABULARY_STORE, { keyPath: 'id' });
          vocabStore.createIndex('unit', 'unit', { unique: false });
          vocabStore.createIndex('category', 'category', { unique: false });
          vocabStore.createIndex('isFavorite', 'isFavorite', { unique: false });
          vocabStore.createIndex('isBuiltIn', 'isBuiltIn', { unique: false });
          vocabStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        if (!db.objectStoreNames.contains(CUSTOM_LISTS_STORE)) {
          const listsStore = db.createObjectStore(CUSTOM_LISTS_STORE, { keyPath: 'id' });
          listsStore.createIndex('name', 'name', { unique: false });
          listsStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        if (!db.objectStoreNames.contains(LIST_ITEMS_STORE)) {
          const itemsStore = db.createObjectStore(LIST_ITEMS_STORE, { keyPath: 'id' });
          itemsStore.createIndex('listId', 'listId', { unique: false });
          itemsStore.createIndex('vocabularyId', 'vocabularyId', { unique: false });
          itemsStore.createIndex('addedAt', 'addedAt', { unique: false });
        }
      };
    });

    return this.openPromise;
  }

  /**
   * Ensure database is open
   */
  private async ensureOpen(): Promise<void> {
    if (!this.db) {
      await this.open();
    }
  }

  /**
   * Close the database
   */
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  /**
   * Delete the entire database
   */
  async deleteDatabase(): Promise<void> {
    this.close();
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(DB_NAME);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to delete database'));
    });
  }

  // ============ VOCABULARY OPERATIONS ============

  /**
   * Get all vocabulary items
   */
  async getAllVocabulary(): Promise<VocabularyDBItem[]> {
    await this.ensureOpen();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(VOCABULARY_STORE, 'readonly');
      const store = transaction.objectStore(VOCABULARY_STORE);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Failed to get all vocabulary'));
    });
  }

  /**
   * Get vocabulary by ID
   */
  async getVocabularyById(id: string): Promise<VocabularyDBItem | null> {
    await this.ensureOpen();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(VOCABULARY_STORE, 'readonly');
      const store = transaction.objectStore(VOCABULARY_STORE);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(new Error(`Failed to get vocabulary with id ${id}`));
    });
  }

  /**
   * Get vocabulary by unit
   */
  async getVocabularyByUnit(unit: number): Promise<VocabularyDBItem[]> {
    await this.ensureOpen();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(VOCABULARY_STORE, 'readonly');
      const store = transaction.objectStore(VOCABULARY_STORE);
      const index = store.index('unit');
      const request = index.getAll(unit);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error(`Failed to get vocabulary for unit ${unit}`));
    });
  }

  /**
   * Add a new vocabulary item
   */
  async addVocabulary(item: Omit<VocabularyDBItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    await this.ensureOpen();
    
    const id = this.generateId();
    const now = Date.now();
    const newItem: VocabularyDBItem = {
      ...item,
      id,
      createdAt: now,
      updatedAt: now,
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(VOCABULARY_STORE, 'readwrite');
      const store = transaction.objectStore(VOCABULARY_STORE);
      const request = store.add(newItem);

      request.onsuccess = () => resolve(id);
      request.onerror = () => reject(new Error('Failed to add vocabulary'));
    });
  }

  /**
   * Update a vocabulary item
   */
  async updateVocabulary(id: string, updates: Partial<VocabularyDBItem>): Promise<void> {
    await this.ensureOpen();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(VOCABULARY_STORE, 'readwrite');
      const store = transaction.objectStore(VOCABULARY_STORE);
      
      store.get(id).onsuccess = (event) => {
        const target = event.target as IDBRequest;
        const existing = target.result as VocabularyDBItem;
        if (!existing) {
          reject(new Error(`Vocabulary item with id ${id} not found`));
          return;
        }

        const updatedItem = {
          ...existing,
          ...updates,
          updatedAt: Date.now(),
        };

        const updateRequest = store.put(updatedItem);
        updateRequest.onsuccess = () => resolve();
        updateRequest.onerror = () => reject(new Error('Failed to update vocabulary'));
      };

      store.get(id).onerror = () => reject(new Error('Failed to get vocabulary for update'));
    });
  }

  /**
   * Delete a vocabulary item
   */
  async deleteVocabulary(id: string): Promise<void> {
    await this.ensureOpen();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(VOCABULARY_STORE, 'readwrite');
      const store = transaction.objectStore(VOCABULARY_STORE);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error(`Failed to delete vocabulary with id ${id}`));
    });
  }

  /**
   * Bulk insert vocabulary items
   */
  async bulkInsertVocabulary(items: Omit<VocabularyDBItem, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<string[]> {
    await this.ensureOpen();
    
    const now = Date.now();
    const ids: string[] = [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(VOCABULARY_STORE, 'readwrite');
      const store = transaction.objectStore(VOCABULARY_STORE);

      items.forEach(item => {
        const id = this.generateId();
        const newItem: VocabularyDBItem = {
          ...item,
          id,
          createdAt: now,
          updatedAt: now,
        };
        store.add(newItem);
        ids.push(id);
      });

      transaction.oncomplete = () => resolve(ids);
      transaction.onerror = () => reject(new Error('Failed to bulk insert vocabulary'));
    });
  }

  /**
   * Clear all vocabulary
   */
  async clearAllVocabulary(): Promise<void> {
    await this.ensureOpen();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(VOCABULARY_STORE, 'readwrite');
      const store = transaction.objectStore(VOCABULARY_STORE);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to clear vocabulary'));
    });
  }

  // ============ CUSTOM LISTS OPERATIONS ============

  /**
   * Get all custom lists
   */
  async getAllCustomLists(): Promise<CustomList[]> {
    await this.ensureOpen();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(CUSTOM_LISTS_STORE, 'readonly');
      const store = transaction.objectStore(CUSTOM_LISTS_STORE);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Failed to get custom lists'));
    });
  }

  /**
   * Get a custom list by ID
   */
  async getCustomListById(id: string): Promise<CustomList | null> {
    await this.ensureOpen();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(CUSTOM_LISTS_STORE, 'readonly');
      const store = transaction.objectStore(CUSTOM_LISTS_STORE);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(new Error(`Failed to get custom list with id ${id}`));
    });
  }

  /**
   * Create a new custom list
   */
  async createCustomList(name: string, description?: string, color?: string, icon?: string): Promise<string> {
    await this.ensureOpen();
    
    const id = this.generateId();
    const now = Date.now();
    const newList: CustomList = {
      id,
      name,
      description,
      createdAt: now,
      updatedAt: now,
      color: color || this.getRandomColor(),
      icon: icon || '📝',
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(CUSTOM_LISTS_STORE, 'readwrite');
      const store = transaction.objectStore(CUSTOM_LISTS_STORE);
      const request = store.add(newList);

      request.onsuccess = () => resolve(id);
      request.onerror = () => reject(new Error('Failed to create custom list'));
    });
  }

  /**
   * Update a custom list
   */
  async updateCustomList(id: string, updates: Partial<CustomList>): Promise<void> {
    await this.ensureOpen();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(CUSTOM_LISTS_STORE, 'readwrite');
      const store = transaction.objectStore(CUSTOM_LISTS_STORE);
      
      store.get(id).onsuccess = (event) => {
        const target = event.target as IDBRequest;
        const existing = target.result as CustomList;
        if (!existing) {
          reject(new Error(`Custom list with id ${id} not found`));
          return;
        }

        const updatedList = {
          ...existing,
          ...updates,
          updatedAt: Date.now(),
        };

        const updateRequest = store.put(updatedList);
        updateRequest.onsuccess = () => resolve();
        updateRequest.onerror = () => reject(new Error('Failed to update custom list'));
      };

      store.get(id).onerror = () => reject(new Error('Failed to get custom list for update'));
    });
  }

  /**
   * Delete a custom list
   */
  async deleteCustomList(id: string): Promise<void> {
    await this.ensureOpen();
    
    // First, delete all items in the list
    await this.deleteListItemsByListId(id);

    // Then delete the list itself
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(CUSTOM_LISTS_STORE, 'readwrite');
      const store = transaction.objectStore(CUSTOM_LISTS_STORE);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error(`Failed to delete custom list with id ${id}`));
    });
  }

  // ============ LIST ITEMS OPERATIONS ============

  /**
   * Get all items in a custom list
   */
  async getListItemsByListId(listId: string): Promise<ListItem[]> {
    await this.ensureOpen();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(LIST_ITEMS_STORE, 'readonly');
      const store = transaction.objectStore(LIST_ITEMS_STORE);
      const index = store.index('listId');
      const request = index.getAll(listId);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error(`Failed to get items for list ${listId}`));
    });
  }

  /**
   * Add a vocabulary item to a custom list
   */
  async addItemToList(listId: string, vocabularyId: string, note?: string): Promise<string> {
    await this.ensureOpen();
    
    const id = this.generateId();
    const newItem: ListItem = {
      id,
      listId,
      vocabularyId,
      addedAt: Date.now(),
      note,
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(LIST_ITEMS_STORE, 'readwrite');
      const store = transaction.objectStore(LIST_ITEMS_STORE);
      const request = store.add(newItem);

      request.onsuccess = () => resolve(id);
      request.onerror = () => reject(new Error('Failed to add item to list'));
    });
  }

  /**
   * Remove an item from a custom list
   */
  async removeItemFromList(itemId: string): Promise<void> {
    await this.ensureOpen();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(LIST_ITEMS_STORE, 'readwrite');
      const store = transaction.objectStore(LIST_ITEMS_STORE);
      const request = store.delete(itemId);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error(`Failed to remove item with id ${itemId}`));
    });
  }

  /**
   * Delete all items in a list
   */
  async deleteListItemsByListId(listId: string): Promise<void> {
    await this.ensureOpen();
    
    const items = await this.getListItemsByListId(listId);
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(LIST_ITEMS_STORE, 'readwrite');
      const store = transaction.objectStore(LIST_ITEMS_STORE);
      
      items.forEach(item => {
        store.delete(item.id);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(new Error(`Failed to delete items for list ${listId}`));
    });
  }

  /**
   * Check if a vocabulary item is in a list
   */
  async isVocabularyInList(listId: string, vocabularyId: string): Promise<boolean> {
    const items = await this.getListItemsByListId(listId);
    return items.some(item => item.vocabularyId === vocabularyId);
  }

  /**
   * Get all vocabulary items for a custom list (with full vocabulary data)
   */
  async getVocabularyForList(listId: string): Promise<VocabularyDBItem[]> {
    const items = await this.getListItemsByListId(listId);
    const vocabularyIds = items.map(item => item.vocabularyId);
    
    const allVocabulary = await this.getAllVocabulary();
    return allVocabulary.filter(vocab => vocabularyIds.includes(vocab.id));
  }

  /**
   * Search vocabulary across all items
   */
  async searchVocabulary(query: string): Promise<VocabularyDBItem[]> {
    const allVocabulary = await this.getAllVocabulary();
    const lowerQuery = query.toLowerCase();
    
    return allVocabulary.filter(item =>
      item.hiragana.toLowerCase().includes(lowerQuery) ||
      (item.kanji || '').toLowerCase().includes(lowerQuery) ||
      item.vietnamese.toLowerCase().includes(lowerQuery) ||
      (item.romaji || '').toLowerCase().includes(lowerQuery)
    );
  }

  // ============ UTILITY METHODS ============

  /**
   * Generate a unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get a random color for custom lists
   */
  private getRandomColor(): string {
    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#eab308',
      '#84cc16', '#22c55e', '#10b981', '#14b8a6',
      '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
      '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Check if IndexedDB is supported
   */
  static isSupported(): boolean {
    return 'indexedDB' in window;
  }
}

// Export a singleton instance
export const dbService = new IndexedDBService();
