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
  selectKanjiByCharacter: (character: string) => void;
  showAnimationForKanji: (kanji: KanjiData) => string | null;
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

  /**
   * Select kanji by its character and update current index
   */
  const selectKanjiByCharacter = (character: string) => {
    const index = kanji.findIndex(k => k.ka_utf === character);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  /**
   * Get animation file path for a kanji
   * Returns the path to a GIF animation if it exists in kanji_data folder
   */
  const showAnimationForKanji = (kanjiItem: KanjiData): string | null => {
    // Try multiple naming conventions for the GIF file
    const kanjiId = kanjiItem.ka_id; // e.g., "kanji_001"
    const kanjiChar = kanjiItem.ka_utf; // e.g., "一"
    const kanjiName = kanjiItem.kname; // e.g., "ichi"
    
    // Possible GIF file paths (in order of preference)
    const possiblePaths = [
      `/kanji_data/${kanjiId}.gif`,
      `/kanji_data/${kanjiChar}.gif`,
      `/kanji_data/${kanjiName}.gif`,
      `/kanji_data/${kanjiId}.webm`,
      `/kanji_data/${kanjiChar}.webm`,
      `/kanji_data/${kanjiName}.webm`,
    ];
    
    // Return the first possible path (UI will handle checking if it exists)
    return possiblePaths[0];
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
    searchKanji: (query: string) => KanjiService.searchKanjiByQuery(query),
    getKanjiByStroke: KanjiService.getKanjiByStroke,
    selectKanjiByCharacter,
    showAnimationForKanji,
  };
};
