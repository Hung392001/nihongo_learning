import { useState, useEffect, useCallback } from 'react';
import { VocabularyItem, CreateVocabularyDto, UpdateVocabularyDto } from '../types/vocabulary';
import { IVocabularyStorage } from '../services/IVocabularyStorage';

interface UseVocabularyReturn {
  vocabulary: VocabularyItem[];
  loading: boolean;
  error: string | null;
  create: (data: CreateVocabularyDto) => Promise<VocabularyItem>;
  update: (id: string, data: UpdateVocabularyDto) => Promise<VocabularyItem>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * Custom hook for managing vocabulary CRUD operations
 * Abstracts storage implementation details
 */
export function useVocabulary(storage: IVocabularyStorage | null): UseVocabularyReturn {
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load all vocabulary items
   */
  const loadVocabulary = useCallback(async () => {
    if (!storage) {
      setVocabulary([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const items = await storage.getAll();
      setVocabulary(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load vocabulary');
      console.error('Error loading vocabulary:', err);
    } finally {
      setLoading(false);
    }
  }, [storage]);

  /**
   * Create a new vocabulary item
   */
  const create = useCallback(async (data: CreateVocabularyDto) => {
    if (!storage) {
      throw new Error('Storage not initialized');
    }
    
    try {
      setError(null);
      const newItem = await storage.create(data);
      setVocabulary(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create vocabulary';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage]);

  /**
   * Update an existing vocabulary item
   */
  const update = useCallback(async (id: string, data: UpdateVocabularyDto) => {
    if (!storage) {
      throw new Error('Storage not initialized');
    }
    
    try {
      setError(null);
      const updatedItem = await storage.update(id, data);
      setVocabulary(prev => 
        prev.map(item => item.id === id ? updatedItem : item)
      );
      return updatedItem;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update vocabulary';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage]);

  /**
   * Delete a vocabulary item
   */
  const remove = useCallback(async (id: string) => {
    if (!storage) {
      throw new Error('Storage not initialized');
    }
    
    try {
      setError(null);
      await storage.delete(id);
      setVocabulary(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete vocabulary';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [storage]);

  /**
   * Refresh vocabulary list from storage
   */
  const refresh = useCallback(async () => {
    await loadVocabulary();
  }, [loadVocabulary]);

  // Load vocabulary on mount
  useEffect(() => {
    loadVocabulary();
  }, [loadVocabulary]);

  return {
    vocabulary,
    loading,
    error,
    create,
    update,
    remove,
    refresh,
  };
}
