/**
 * Kanji API Service
 * Fetches kanji data from local database or remote API
 */

import { KanjiData, kanjiDatabase } from '../data/kanjiDatabase';

export interface KanjiSearchParams {
  q?: string;
  grade?: number;
  stroke?: number;
  limit?: number;
}

/**
 * Get all kanji
 */
export const getAllKanji = async (): Promise<KanjiData[]> => {
  try {
    // In production, this could fetch from an API endpoint
    // return fetch('/api/kanji').then(r => r.json());
    return kanjiDatabase;
  } catch (error) {
    console.error('Error fetching kanji:', error);
    return [];
  }
};

/**
 * Get kanji by ID
 */
export const getKanjiById = async (id: string): Promise<KanjiData | null> => {
  try {
    const kanji = kanjiDatabase.find(k => k.ka_id === id);
    return kanji || null;
  } catch (error) {
    console.error('Error fetching kanji by ID:', error);
    return null;
  }
};

/**
 * Get kanji by character
 */
export const getKanjiByCharacter = async (character: string): Promise<KanjiData | null> => {
  try {
    const kanji = kanjiDatabase.find(k => k.ka_utf === character);
    return kanji || null;
  } catch (error) {
    console.error('Error fetching kanji by character:', error);
    return null;
  }
};

/**
 * Search kanji by various criteria
 * Supports searching by: kanji character, meaning, romaji (kname), hiragana (onyomi_ja, kunyomi_ja)
 */
export const searchKanji = async (params: KanjiSearchParams): Promise<KanjiData[]> => {
  try {
    let results = [...kanjiDatabase];

    if (params.q) {
      const query = params.q.toLowerCase().trim();
      results = results.filter(
        k =>
          // Search by kanji character (exact or partial)
          k.ka_utf.includes(query) ||
          // Search by meaning
          k.meaning.toLowerCase().includes(query) ||
          // Search by romaji (kname like "ichi", "ni", etc.)
          k.kname.toLowerCase().includes(query) ||
          // Search by on-yomi (hiragana)
          k.onyomi_ja.toLowerCase().includes(query) ||
          // Search by kun-yomi (both katakana and hiragana)
          k.kunyomi.toLowerCase().includes(query) ||
          k.kunyomi_ja.toLowerCase().includes(query)
      );
    }

    if (params.grade !== undefined) {
      results = results.filter(k => k.grade === params.grade);
    }

    if (params.stroke !== undefined) {
      results = results.filter(k => k.kstroke === params.stroke);
    }

    if (params.limit) {
      results = results.slice(0, params.limit);
    }

    return results;
  } catch (error) {
    console.error('Error searching kanji:', error);
    return [];
  }
};

/**
 * Get kanji by stroke count
 */
export const getKanjiByStroke = async (stroke: number): Promise<KanjiData[]> => {
  try {
    return kanjiDatabase.filter(k => k.kstroke === stroke);
  } catch (error) {
    console.error('Error fetching kanji by stroke:', error);
    return [];
  }
};

/**
 * Get random kanji
 */
export const getRandomKanji = async (): Promise<KanjiData | null> => {
  try {
    const randomIndex = Math.floor(Math.random() * kanjiDatabase.length);
    return kanjiDatabase[randomIndex];
  } catch (error) {
    console.error('Error fetching random kanji:', error);
    return null;
  }
};

/**
 * Search kanji by simple query string
 * Used for search box autocomplete
 */
export const searchKanjiByQuery = async (query: string): Promise<KanjiData[]> => {
  if (!query.trim()) {
    return [];
  }
  return searchKanji({ q: query, limit: 10 });
};
