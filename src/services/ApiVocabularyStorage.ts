/**
 * API Vocabulary Storage
 * Implements IVocabularyStorage using REST API calls to the server
 * Connects to the Express server which uses PostgreSQL
 */

import { IVocabularyStorage } from './IVocabularyStorage';
import { VocabularyItem, CreateVocabularyDto, UpdateVocabularyDto, CustomList, ListItem } from '../types/vocabulary';

// @ts-ignore - import.meta.env is a Vite feature
const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:3001/api';

/**
 * Convert API response row to VocabularyItem
 */
function rowToVocabularyItem(row: any): VocabularyItem {
  return {
    id: row.id,
    hiragana: row.hiragana,
    kanji: row.kanji,
    vietnamese: row.vietnamese,
    category: row.category || undefined,
    tags: row.tags || undefined,
    exampleSentence: row.example_sentence || undefined,
    exampleSentenceHiragana: row.example_sentence_hiragana || undefined,
    exampleTranslationVi: row.example_translation_vi || undefined,
    unit: row.unit || undefined,
    difficulty: row.difficulty as 1 | 2 | 3 | 4 | 5 | undefined,
    romaji: row.romaji || undefined,
    audioUrl: row.audio_url || undefined,
    isFavorite: row.is_favorite || false,
    note: row.note || undefined,
    isBuiltIn: row.is_built_in || false,
    createdAt: new Date(row.created_at).getTime(),
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

/**
 * Convert API CustomList to unified type
 */
function apiListToCustomList(apiList: any): CustomList {
  return {
    id: apiList.id,
    name: apiList.name,
    description: apiList.description,
    color: apiList.color,
    icon: apiList.icon,
    createdAt: new Date(apiList.created_at).getTime(),
    updatedAt: new Date(apiList.updated_at).getTime(),
  };
}

/**
 * Convert API ListItem to unified type
 */
function apiItemToListItem(apiItem: any): ListItem {
  return {
    id: apiItem.id,
    listId: apiItem.list_id,
    vocabularyId: apiItem.vocabulary_id,
    addedAt: new Date(apiItem.added_at).getTime(),
    note: apiItem.note,
  };
}

/**
 * API implementation of vocabulary storage
 * Uses fetch to communicate with the Express server
 */
export class ApiVocabularyStorage implements IVocabularyStorage {
  /**
   * Helper to make API requests with timeout
   */
  private async request<T>(method: string, path: string, body?: any, timeoutMs: number = 5000): Promise<T> {
    const url = `${API_BASE}${path}`;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
      options.signal = controller.signal;
      const response = await fetch(url, options);
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Check if API is available
   * Uses a timeout to avoid hanging when server is not running
   */
  static async isSupported(timeoutMs: number = 2000): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      
      const response = await fetch(`${API_BASE}/health`, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  }

  // ============ IVocabularyStorage Methods ============

  async getAll(): Promise<VocabularyItem[]> {
    const rows = await this.request<any[]>('GET', '/vocabulary');
    return rows.map(rowToVocabularyItem);
  }

  async getById(id: string): Promise<VocabularyItem | null> {
    try {
      const row = await this.request<any>('GET', `/vocabulary/${id}`);
      return rowToVocabularyItem(row);
    } catch (error) {
      if ((error as Error).message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  async create(data: CreateVocabularyDto): Promise<VocabularyItem> {
    const row = await this.request<any>('POST', '/vocabulary', {
      hiragana: data.hiragana,
      kanji: data.kanji,
      vietnamese: data.vietnamese,
      romaji: data.romaji,
      category: data.category,
      tags: data.tags,
      example_sentence: data.exampleSentence,
      example_sentence_hiragana: data.exampleSentenceHiragana,
      example_translation_vi: data.exampleTranslationVi,
      unit: data.unit,
      difficulty: data.difficulty,
      audio_url: data.audioUrl,
      is_favorite: data.isFavorite,
      note: data.note,
    });
    return rowToVocabularyItem(row);
  }

  async update(id: string, data: UpdateVocabularyDto): Promise<VocabularyItem> {
    const row = await this.request<any>('PUT', `/vocabulary/${id}`, {
      hiragana: data.hiragana,
      kanji: data.kanji,
      vietnamese: data.vietnamese,
      category: data.category,
      tags: data.tags,
      isFavorite: data.isFavorite,
      note: data.note,
    });
    return rowToVocabularyItem(row);
  }

  async delete(id: string): Promise<void> {
    await this.request('DELETE', `/vocabulary/${id}`);
  }

  async clear(): Promise<void> {
    // Clear all non-built-in vocabulary
    const all = await this.getAll();
    for (const item of all.filter(v => !v.id.startsWith('unit'))) {
      await this.delete(item.id);
    }
  }

  // ============ Custom List Methods ============

  async getAllCustomLists(): Promise<CustomList[]> {
    const apiLists = await this.request<any[]>('GET', '/lists');
    return apiLists.map(apiListToCustomList);
  }

  async getCustomListById(id: string): Promise<CustomList | null> {
    try {
      const apiList = await this.request<any>('GET', `/lists/${id}`);
      return apiListToCustomList(apiList);
    } catch {
      return null;
    }
  }

  async createCustomList(name: string, description?: string, color?: string, icon?: string): Promise<string> {
    const apiList = await this.request<any>('POST', '/lists', {
      name,
      description,
      color,
      icon,
    });
    return apiList.id;
  }

  async updateCustomList(id: string, updates: Partial<CustomList>): Promise<void> {
    // Convert unified type to API format
    const apiUpdates: any = {};
    if (updates.name !== undefined) apiUpdates.name = updates.name;
    if (updates.description !== undefined) apiUpdates.description = updates.description;
    if (updates.color !== undefined) apiUpdates.color = updates.color;
    if (updates.icon !== undefined) apiUpdates.icon = updates.icon;
    await this.request('PUT', `/lists/${id}`, apiUpdates);
  }

  async deleteCustomList(id: string): Promise<void> {
    await this.request('DELETE', `/lists/${id}`);
  }

  async addToCustomList(listId: string, vocabularyId: string, note?: string): Promise<string> {
    const apiItem = await this.request<any>('POST', `/lists/${listId}/items`, {
      vocabularyId,
      note,
    });
    return apiItem.id;
  }

  async removeFromCustomList(itemId: string): Promise<void> {
    await this.request('DELETE', `/lists/items/${itemId}`);
  }

  async getVocabularyInList(listId: string): Promise<VocabularyItem[]> {
    const rows = await this.request<any[]>('GET', `/lists/${listId}/vocabulary`);
    return rows.map(rowToVocabularyItem);
  }

  async getListItems(listId: string): Promise<ListItem[]> {
    const apiItems = await this.request<any[]>('GET', `/lists/${listId}/items`);
    return apiItems.map(apiItemToListItem);
  }

  async isInList(listId: string, vocabularyId: string): Promise<boolean> {
    const result = await this.request<{ isInList: boolean }>('GET', `/lists/${listId}/contains/${vocabularyId}`);
    return result.isInList;
  }

  async search(query: string): Promise<VocabularyItem[]> {
    const rows = await this.request<any[]>('GET', `/vocabulary/search?q=${encodeURIComponent(query)}`);
    return rows.map(rowToVocabularyItem);
  }

  async getByUnit(unit: number): Promise<VocabularyItem[]> {
    const rows = await this.request<any[]>('GET', `/vocabulary/unit/${unit}`);
    return rows.map(rowToVocabularyItem);
  }

  async initializeBuiltInVocabulary(): Promise<void> {
    await this.request('POST', '/init');
  }
}

export const apiStorage = new ApiVocabularyStorage();
