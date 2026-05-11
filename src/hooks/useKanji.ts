/**
 * useKanji Hook
 * Manages kanji data fetching and state management
 */

import { useState, useEffect } from 'react';
import { KanjiData } from '../data/kanjiDatabase';
import * as KanjiService from '../services/KanjiService';

export interface UseKanjiResult {
  kanji: KanjiData[];
  loading: boolean;
  error: string | null;
  currentIndex: number;
  currentKanji: KanjiData | null;
  goToKanji: (index: number) => void;
  nextKanji: () => void;
  previousKanji: () => void;
  searchKanji: (query: string) => Promise<KanjiData[]>;
  getKanjiByStroke: (stroke: number) => Promise<KanjiData[]>;
}

export const useKanji = (): UseKanjiResult => {
  const [kanji, setKanji] = useState<KanjiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load all kanji on mount
  useEffect(() => {
    const loadKanji = async () => {
      try {
        setLoading(true);
        const data = await KanjiService.getAllKanji();
        setKanji(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load kanji');
        console.error('Error loading kanji:', err);
      } finally {
        setLoading(false);
      }
    };

    loadKanji();
  }, []);

  const currentKanji = kanji[currentIndex] || null;

  const goToKanji = (index: number) => {
    if (index >= 0 && index < kanji.length) {
      setCurrentIndex(index);
    }
  };

  const nextKanji = () => {
    if (currentIndex < kanji.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousKanji = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return {
    kanji,
    loading,
    error,
    currentIndex,
    currentKanji,
    goToKanji,
    nextKanji,
    previousKanji,
    searchKanji: KanjiService.searchKanji,
    getKanjiByStroke: KanjiService.getKanjiByStroke,
  };
};
