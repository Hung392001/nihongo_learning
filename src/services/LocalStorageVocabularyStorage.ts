import type { VocabularyItem, CreateVocabularyDto, UpdateVocabularyDto, CustomList, ListItem } from '../types/vocabulary';
import type { IVocabularyStorage } from './IVocabularyStorage';
import { generateId, getCurrentTimestamp } from '../utils/flashcardHelpers';

const STORAGE_KEY = 'nihongo_vocabulary';
const LISTS_KEY = 'nihongo_custom_lists';
const LIST_ITEMS_KEY = 'nihongo_list_items';

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

  // ============ Custom List Methods ============

  /**
   * Load all custom lists from localStorage
   */
  private loadListsFromStorage(): CustomList[] {
    try {
      const data = localStorage.getItem(LISTS_KEY);
      if (!data) return [];
      return JSON.parse(data) as CustomList[];
    } catch (error) {
      console.error('Error loading lists from localStorage:', error);
      return [];
    }
  }

  /**
   * Save all custom lists to localStorage
   */
  private saveListsToStorage(lists: CustomList[]): void {
    try {
      localStorage.setItem(LISTS_KEY, JSON.stringify(lists));
    } catch (error) {
      console.error('Error saving lists to localStorage:', error);
      throw new Error('Failed to save custom lists');
    }
  }

  /**
   * Load all list items from localStorage
   */
  private loadItemsFromStorage(): ListItem[] {
    try {
      const data = localStorage.getItem(LIST_ITEMS_KEY);
      if (!data) return [];
      return JSON.parse(data) as ListItem[];
    } catch (error) {
      console.error('Error loading items from localStorage:', error);
      return [];
    }
  }

  /**
   * Save all list items to localStorage
   */
  private saveItemsToStorage(items: ListItem[]): void {
    try {
      localStorage.setItem(LIST_ITEMS_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving items to localStorage:', error);
      throw new Error('Failed to save list items');
    }
  }

  async getAllCustomLists(): Promise<CustomList[]> {
    return this.loadListsFromStorage();
  }

  async getCustomListById(id: string): Promise<CustomList | null> {
    const lists = this.loadListsFromStorage();
    return lists.find(list => list.id === id) || null;
  }

  async createCustomList(name: string, description?: string, color?: string, icon?: string): Promise<string> {
    const lists = this.loadListsFromStorage();
    const timestamp = getCurrentTimestamp();

    const newList: CustomList = {
      id: generateId(),
      name: name.trim(),
      description: description?.trim(),
      createdAt: timestamp,
      updatedAt: timestamp,
      color: color || '#3b82f6',
      icon: icon || '📝',
    };

    lists.push(newList);
    this.saveListsToStorage(lists);
    return newList.id;
  }

  async updateCustomList(id: string, updates: Partial<CustomList>): Promise<void> {
    const lists = this.loadListsFromStorage();
    const index = lists.findIndex(list => list.id === id);

    if (index === -1) {
      throw new Error(`Custom list with id ${id} not found`);
    }

    const updatedList: CustomList = {
      ...lists[index],
      ...updates,
      name: updates.name ? updates.name.trim() : lists[index].name,
      description: updates.description ? updates.description?.trim() : lists[index].description,
      updatedAt: getCurrentTimestamp(),
    };

    lists[index] = updatedList;
    this.saveListsToStorage(lists);
  }

  async deleteCustomList(id: string): Promise<void> {
    let lists = this.loadListsFromStorage();
    lists = lists.filter(list => list.id !== id);
    this.saveListsToStorage(lists);

    // Also remove all items in this list
    let items = this.loadItemsFromStorage();
    items = items.filter(item => item.listId !== id);
    this.saveItemsToStorage(items);
  }

  async addToCustomList(listId: string, vocabularyId: string, note?: string): Promise<string> {
    const items = this.loadItemsFromStorage();
    const timestamp = getCurrentTimestamp();

    const newItem: ListItem = {
      id: generateId(),
      listId,
      vocabularyId,
      addedAt: timestamp,
      note: note?.trim(),
    };

    items.push(newItem);
    this.saveItemsToStorage(items);
    return newItem.id;
  }

  async removeFromCustomList(itemId: string): Promise<void> {
    let items = this.loadItemsFromStorage();
    items = items.filter(item => item.id !== itemId);
    this.saveItemsToStorage(items);
  }

  async getVocabularyInList(listId: string): Promise<VocabularyItem[]> {
    const items = this.loadItemsFromStorage().filter(item => item.listId === listId);
    const allVocabulary = this.loadFromStorage();
    return allVocabulary.filter(vocab => items.some(item => item.vocabularyId === vocab.id));
  }

  async getListItems(listId: string): Promise<ListItem[]> {
    return this.loadItemsFromStorage().filter(item => item.listId === listId);
  }

  async isInList(listId: string, vocabularyId: string): Promise<boolean> {
    const items = this.loadItemsFromStorage();
    return items.some(item => item.listId === listId && item.vocabularyId === vocabularyId);
  }
}
