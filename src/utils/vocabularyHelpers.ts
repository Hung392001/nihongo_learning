import { VocabularyItem, VocabularyFilter, VocabularyCategory } from '../types/vocabulary';

/**
 * Flashcard Modes for Vocabulary Practice
 */
export type FlashcardMode =
  | 'vi-to-hiragana'    // Vietnamese → Hiragana
  | 'vi-to-kanji'       // Vietnamese → Kanji
  | 'hiragana-to-vi'    // Hiragana → Vietnamese
  | 'kanji-to-hiragana' // Kanji → Hiragana
  | 'kanji-to-vi'       // Kanji → Vietnamese
  | 'mixed';            // Random mix of all modes

/**
 * Flashcard Display Configuration
 */
export interface FlashcardDisplay {
  front: string;
  back: string;
  hint?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
}

/**
 * Generate flashcard display based on mode
 */
export function generateFlashcard(
  item: VocabularyItem,
  mode: FlashcardMode
): FlashcardDisplay {
  switch (mode) {
    case 'vi-to-hiragana':
      return {
        front: item.vietnamese,
        back: item.hiragana,
        hint: item.romaji,
        exampleSentence: item.exampleSentenceHiragana,
        exampleTranslation: item.exampleTranslationVi,
      };
    
    case 'vi-to-kanji':
      return {
        front: item.vietnamese,
        back: item.kanji || item.hiragana,
        hint: item.hiragana,
        exampleSentence: item.exampleSentence,
        exampleTranslation: item.exampleTranslationVi,
      };
    
    case 'hiragana-to-vi':
      return {
        front: item.hiragana,
        back: item.vietnamese,
        hint: item.romaji,
        exampleSentence: item.exampleSentenceHiragana,
        exampleTranslation: item.exampleTranslationVi,
      };
    
    case 'kanji-to-hiragana':
      return {
        front: item.kanji || item.hiragana,
        back: item.hiragana,
        hint: item.vietnamese,
        exampleSentence: item.exampleSentence,
        exampleTranslation: item.exampleTranslationVi,
      };
    
    case 'kanji-to-vi':
      return {
        front: item.kanji || item.hiragana,
        back: item.vietnamese,
        hint: item.hiragana,
        exampleSentence: item.exampleSentence,
        exampleTranslation: item.exampleTranslationVi,
      };
    
    case 'mixed':
      // Randomly select a mode
      const modes: FlashcardMode[] = [
        'vi-to-hiragana',
        'hiragana-to-vi',
        'vi-to-kanji',
        'kanji-to-hiragana',
        'kanji-to-vi',
      ];
      const randomMode = modes[Math.floor(Math.random() * modes.length)];
      return generateFlashcard(item, randomMode);
    
    default:
      return generateFlashcard(item, 'vi-to-hiragana');
  }
}

/**
 * Filter vocabulary items based on criteria
 */
export function filterVocabulary(
  items: VocabularyItem[],
  filter: VocabularyFilter
): VocabularyItem[] {
  let filtered = [...items];

  // Filter by category
  if (filter.category) {
    filtered = filtered.filter(item => item.category === filter.category);
  }

  // Filter by unit
  if (filter.unit !== undefined) {
    filtered = filtered.filter(item => item.unit === filter.unit);
  }

  // Filter by tags
  if (filter.tags && filter.tags.length > 0) {
    filtered = filtered.filter(item =>
      filter.tags!.some(tag => item.tags?.includes(tag))
    );
  }

  // Filter by difficulty
  if (filter.difficulty) {
    filtered = filtered.filter(item => item.difficulty === filter.difficulty);
  }

  // Filter by favorite
  if (filter.isFavorite !== undefined) {
    filtered = filtered.filter(item => item.isFavorite === filter.isFavorite);
  }

  // Search by term
  if (filter.searchTerm) {
    const term = filter.searchTerm.toLowerCase();
    filtered = filtered.filter(item =>
      item.hiragana.includes(term) ||
      item.kanji?.includes(term) ||
      item.vietnamese.toLowerCase().includes(term) ||
      item.romaji?.toLowerCase().includes(term)
    );
  }

  return filtered;
}

/**
 * Group vocabulary by category
 */
export interface VocabularyGroup {
  category: VocabularyCategory | 'other';
  items: VocabularyItem[];
  count: number;
}

export function groupByCategory(items: VocabularyItem[]): VocabularyGroup[] {
  const groups: Map<VocabularyCategory | 'other', VocabularyItem[]> = new Map();

  items.forEach(item => {
    const category = item.category || 'other';
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)!.push(item);
  });

  return Array.from(groups.entries()).map(([category, items]) => ({
    category,
    items,
    count: items.length,
  }));
}

/**
 * Group vocabulary by tags
 */
export interface TagGroup {
  tag: string;
  items: VocabularyItem[];
  count: number;
}

export function groupByTags(items: VocabularyItem[]): TagGroup[] {
  const groups: Map<string, VocabularyItem[]> = new Map();

  items.forEach(item => {
    if (item.tags) {
      item.tags.forEach(tag => {
        if (!groups.has(tag)) {
          groups.set(tag, []);
        }
        groups.get(tag)!.push(item);
      });
    }
  });

  return Array.from(groups.entries())
    .map(([tag, items]) => ({
      tag,
      items,
      count: items.length,
    }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
}

/**
 * Sort vocabulary items
 */
export type SortOption =
  | 'id-asc'
  | 'id-desc'
  | 'hiragana-asc'
  | 'hiragana-desc'
  | 'vietnamese-asc'
  | 'vietnamese-desc'
  | 'created-asc'
  | 'created-desc'
  | 'updated-asc'
  | 'updated-desc';

export function sortVocabulary(
  items: VocabularyItem[],
  sortBy: SortOption
): VocabularyItem[] {
  const sorted = [...items];

  switch (sortBy) {
    case 'id-asc':
      return sorted.sort((a, b) => a.id.localeCompare(b.id));
    
    case 'id-desc':
      return sorted.sort((a, b) => b.id.localeCompare(a.id));
    
    case 'hiragana-asc':
      return sorted.sort((a, b) => a.hiragana.localeCompare(b.hiragana));
    
    case 'hiragana-desc':
      return sorted.sort((a, b) => b.hiragana.localeCompare(a.hiragana));
    
    case 'vietnamese-asc':
      return sorted.sort((a, b) => a.vietnamese.localeCompare(b.vietnamese));
    
    case 'vietnamese-desc':
      return sorted.sort((a, b) => b.vietnamese.localeCompare(a.vietnamese));
    
    case 'created-asc':
      return sorted.sort((a, b) => a.createdAt - b.createdAt);
    
    case 'created-desc':
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
    
    case 'updated-asc':
      return sorted.sort((a, b) => a.updatedAt - b.updatedAt);
    
    case 'updated-desc':
      return sorted.sort((a, b) => b.updatedAt - a.updatedAt);
    
    default:
      return sorted;
  }
}

/**
 * Get vocabulary statistics
 */
export interface VocabularyStats {
  total: number;
  byCategory: Record<string, number>;
  byUnit: Record<number, number>;
  withKanji: number;
  withoutKanji: number;
  favorites: number;
  byDifficulty: Record<number, number>;
}

export function getVocabularyStats(items: VocabularyItem[]): VocabularyStats {
  const stats: VocabularyStats = {
    total: items.length,
    byCategory: {},
    byUnit: {},
    withKanji: 0,
    withoutKanji: 0,
    favorites: 0,
    byDifficulty: {},
  };

  items.forEach(item => {
    // Count by category
    const category = item.category || 'other';
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;

    // Count by unit
    if (item.unit) {
      stats.byUnit[item.unit] = (stats.byUnit[item.unit] || 0) + 1;
    }

    // Count kanji
    if (item.kanji) {
      stats.withKanji++;
    } else {
      stats.withoutKanji++;
    }

    // Count favorites
    if (item.isFavorite) {
      stats.favorites++;
    }

    // Count by difficulty
    if (item.difficulty) {
      stats.byDifficulty[item.difficulty] = (stats.byDifficulty[item.difficulty] || 0) + 1;
    }
  });

  return stats;
}

/**
 * Export vocabulary to JSON
 */
export function exportToJSON(items: VocabularyItem[]): string {
  return JSON.stringify(items, null, 2);
}

/**
 * Import vocabulary from JSON
 */
export function importFromJSON(jsonString: string): VocabularyItem[] {
  try {
    const data = JSON.parse(jsonString);
    if (Array.isArray(data)) {
      return data;
    }
    throw new Error('Invalid JSON format: expected an array');
  } catch (error) {
    throw new Error(`Failed to import JSON: ${error}`);
  }
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 * Used for randomizing flashcard order
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Category display names (for UI)
 */
export const CATEGORY_LABELS: Record<VocabularyCategory | 'other', string> = {
  pronoun: 'Đại từ',
  people: 'Con người',
  occupation: 'Nghề nghiệp',
  country: 'Quốc gia',
  place: 'Địa điểm',
  greeting: 'Chào hỏi',
  grammar: 'Ngữ pháp',
  question: 'Câu hỏi',
  number: 'Số đếm',
  honorific: 'Kính ngữ',
  phrase: 'Cụm từ',
  verb: 'Động từ',
  interjection: 'Thán từ',
  transportation: 'Phương tiện',
  time: 'Thời gian',
  other: 'Khác',
};

/**
 * Flashcard mode display names (for UI)
 */
export const FLASHCARD_MODE_LABELS: Record<FlashcardMode, string> = {
  'vi-to-hiragana': 'Tiếng Việt → Hiragana',
  'vi-to-kanji': 'Tiếng Việt → Kanji',
  'hiragana-to-vi': 'Hiragana → Tiếng Việt',
  'kanji-to-hiragana': 'Kanji → Hiragana',
  'kanji-to-vi': 'Kanji → Tiếng Việt',
  'mixed': 'Hỗn hợp',
};
