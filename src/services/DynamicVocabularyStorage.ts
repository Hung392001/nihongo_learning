/**
 * Dynamic Vocabulary Storage
 * Implements IVocabularyStorage using the new dynamic unit-based API
 */

import { IVocabularyStorage } from './IVocabularyStorage';
import {
  VocabularyItem,
  CreateVocabularyDto,
  UpdateVocabularyDto,
  VocabularyUnit,
  VocabularyUnitItem,
  CreateVocabularyUnitDto,
  UpdateVocabularyUnitDto,
  CreateVocabularyUnitItemDto,
  UpdateVocabularyUnitItemDto,
  VocabularyUnitWithItems,
} from '../types/vocabulary';

// @ts-ignore - import.meta.env is a Vite feature
const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:3001/api';

/**
 * Convert API VocabularyUnit row to TypeScript type
 */
function rowToVocabularyUnit(row: any): VocabularyUnit {
  return {
    id: row.id,
    name: row.name,
    description: row.description || undefined,
    displayOrder: row.display_order || 0,
    createdAt: new Date(row.created_at).getTime(),
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

/**
 * Convert API VocabularyItem row to TypeScript type
 */
function rowToVocabularyUnitItem(row: any): VocabularyUnitItem {
  return {
    id: row.id,
    unitId: row.unit_id,
    hiragana: row.hiragana,
    kanji: row.kanji || undefined,
    vietnamese: row.vietnamese,
    hiraganaSentence: row.hiragana_sentence || undefined,
    displayOrder: row.display_order || 0,
    createdAt: new Date(row.created_at).getTime(),
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

/**
 * Convert VocabularyUnitItem to legacy VocabularyItem for compatibility
 */
function toLegacyVocabularyItem(item: VocabularyUnitItem, unitName?: string): VocabularyItem {
  return {
    id: item.id,
    hiragana: item.hiragana,
    kanji: item.kanji || null,
    vietnamese: item.vietnamese,
    romaji: undefined,
    category: undefined,
    tags: [],
    exampleSentence: undefined,
    exampleSentenceHiragana: item.hiraganaSentence,
    exampleTranslationVi: undefined,
    unit: unitName ? parseInt(unitName) : undefined,
    difficulty: undefined,
    audioUrl: undefined,
    isFavorite: false,
    note: undefined,
    isBuiltIn: false,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

/**
 * Dynamic Vocabulary Storage
 * Manages vocabulary units and items via REST API
 */
export class DynamicVocabularyStorage {
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

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // ============ Unit Operations ============

  /**
   * Get all vocabulary units
   */
  async getAllUnits(): Promise<VocabularyUnit[]> {
    const rows = await this.request<any[]>('GET', '/units');
    return rows.map(rowToVocabularyUnit);
  }

  /**
   * Get a single unit by ID
   */
  async getUnitById(id: string): Promise<VocabularyUnit | null> {
    try {
      const row = await this.request<any>('GET', `/units/${id}`);
      return rowToVocabularyUnit(row);
    } catch (error) {
      if ((error as Error).message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Get a unit with all its vocabulary items
   */
  async getUnitWithItems(unitId: string): Promise<VocabularyUnitWithItems | null> {
    try {
      const data = await this.request<any>('GET', `/units/${unitId}/with-items`);
      return {
        ...rowToVocabularyUnit(data),
        items: data.items.map(rowToVocabularyUnitItem),
      };
    } catch (error) {
      if ((error as Error).message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Create a new vocabulary unit
   */
  async createUnit(data: CreateVocabularyUnitDto): Promise<VocabularyUnit> {
    const row = await this.request<any>('POST', '/units', data);
    return rowToVocabularyUnit(row);
  }

  /**
   * Update a vocabulary unit
   */
  async updateUnit(id: string, data: UpdateVocabularyUnitDto): Promise<VocabularyUnit> {
    const row = await this.request<any>('PUT', `/units/${id}`, data);
    return rowToVocabularyUnit(row);
  }

  /**
   * Delete a vocabulary unit
   */
  async deleteUnit(id: string): Promise<void> {
    await this.request('DELETE', `/units/${id}`);
  }

  /**
   * Reorder vocabulary units
   */
  async reorderUnits(unitIds: string[]): Promise<void> {
    await this.request('POST', '/units/reorder', { unitIds });
  }

  // ============ Vocabulary Item Operations ============

  /**
   * Get all vocabulary items for a unit
   */
  async getItemsByUnit(unitId: string): Promise<VocabularyUnitItem[]> {
    const rows = await this.request<any[]>('GET', `/units/${unitId}/items`);
    return rows.map(rowToVocabularyUnitItem);
  }

  /**
   * Get a single vocabulary item by ID
   */
  async getItemById(id: string): Promise<VocabularyUnitItem | null> {
    try {
      const row = await this.request<any>('GET', `/items/${id}`);
      return rowToVocabularyUnitItem(row);
    } catch (error) {
      if ((error as Error).message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Create a new vocabulary item in a unit
   */
  async createItem(unitId: string, data: Omit<CreateVocabularyUnitItemDto, 'unitId'>): Promise<VocabularyUnitItem> {
    const row = await this.request<any>('POST', `/units/${unitId}/items`, data);
    return rowToVocabularyUnitItem(row);
  }

  /**
   * Update a vocabulary item
   */
  async updateItem(id: string, data: UpdateVocabularyUnitItemDto): Promise<VocabularyUnitItem> {
    const row = await this.request<any>('PUT', `/items/${id}`, data);
    return rowToVocabularyUnitItem(row);
  }

  /**
   * Delete a vocabulary item
   */
  async deleteItem(id: string): Promise<void> {
    await this.request('DELETE', `/items/${id}`);
  }

  /**
   * Reorder vocabulary items within a unit
   */
  async reorderItems(unitId: string, itemIds: string[]): Promise<void> {
    await this.request('POST', `/units/${unitId}/items/reorder`, { itemIds });
  }

  // ============ Legacy Compatibility Methods ============
  // These methods provide compatibility with the existing IVocabularyStorage interface

  async getAll(): Promise<VocabularyItem[]> {
    // Get all units with their items
    const units = await this.getAllUnits();
    const allItems: VocabularyUnitItem[] = [];
    
    for (const unit of units) {
      const items = await this.getItemsByUnit(unit.id);
      allItems.push(...items);
    }
    
    return allItems.map(item => toLegacyVocabularyItem(item));
  }

  async getById(id: string): Promise<VocabularyItem | null> {
    const item = await this.getItemById(id);
    if (!item) return null;
    return toLegacyVocabularyItem(item);
  }

  async create(data: CreateVocabularyDto): Promise<VocabularyItem> {
    // Create a default unit if no units exist
    const units = await this.getAllUnits();
    let unitId = units[0]?.id;
    
    if (!unitId) {
      const newUnit = await this.createUnit({ name: 'Unit 1' });
      unitId = newUnit.id;
    }
    
    const item = await this.createItem(unitId, {
      hiragana: data.hiragana,
      kanji: data.kanji,
      vietnamese: data.vietnamese,
      hiraganaSentence: data.exampleSentenceHiragana,
    });
    
    return toLegacyVocabularyItem(item, unitId);
  }

  async update(id: string, data: UpdateVocabularyDto): Promise<VocabularyItem> {
    const item = await this.getItemById(id);
    if (!item) {
      throw new Error('Item not found');
    }
    
    const updated = await this.updateItem(id, {
      hiragana: data.hiragana || item.hiragana,
      kanji: data.kanji !== undefined ? data.kanji : item.kanji,
      vietnamese: data.vietnamese || item.vietnamese,
      hiraganaSentence: data.note, // Using note field for hiraganaSentence in legacy
    });
    
    return toLegacyVocabularyItem(updated);
  }

  async delete(id: string): Promise<void> {
    await this.deleteItem(id);
  }

  async clear(): Promise<void> {
    // Delete all items and units
    const units = await this.getAllUnits();
    for (const unit of units) {
      await this.deleteUnit(unit.id);
    }
  }

  async getByUnit(unit: number | string): Promise<VocabularyItem[]> {
    const items = await this.getItemsByUnit(unit as string);
    return items.map(item => toLegacyVocabularyItem(item));
  }

  // Check if supported (always true for this storage)
  static async isSupported(): Promise<boolean> {
    return true;
  }
}

export const dynamicVocabularyStorage = new DynamicVocabularyStorage();
