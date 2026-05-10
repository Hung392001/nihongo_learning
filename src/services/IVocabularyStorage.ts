import { VocabularyItem, CreateVocabularyDto, UpdateVocabularyDto } from '../types/vocabulary';

/**
 * Abstract storage interface for vocabulary persistence
 * Allows swapping implementations (localStorage, API, IndexedDB, etc.)
 */
export interface IVocabularyStorage {
  /**
   * Get all vocabulary items
   */
  getAll(): Promise<VocabularyItem[]>;

  /**
   * Get a single vocabulary item by ID
   */
  getById(id: string): Promise<VocabularyItem | null>;

  /**
   * Create a new vocabulary item
   */
  create(data: CreateVocabularyDto): Promise<VocabularyItem>;

  /**
   * Update an existing vocabulary item
   */
  update(id: string, data: UpdateVocabularyDto): Promise<VocabularyItem>;

  /**
   * Delete a vocabulary item
   */
  delete(id: string): Promise<void>;

  /**
   * Clear all vocabulary items
   */
  clear(): Promise<void>;
}
