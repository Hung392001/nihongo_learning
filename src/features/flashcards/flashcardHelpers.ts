import { VocabularyItem, FlashcardMode, FlashcardContent, SortOption, VocabularyStatistics } from '../vocabulary/vocabulary';

/**
 * Generate a unique ID for vocabulary items
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get current timestamp in milliseconds
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * Shuffle an array using Fisher-Yates algorithm
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
 * Create flashcard content based on mode and vocabulary item
 */
export function createFlashcardContent(
  item: VocabularyItem,
  mode: FlashcardMode
): FlashcardContent {
  switch (mode) {
    case FlashcardMode.VI_TO_HIRA:
      return {
        front: item.vietnamese,
        back: item.hiragana,
        item,
      };
    
    case FlashcardMode.HIRA_TO_KANJI:
      return {
        front: item.hiragana,
        back: item.kanji || '(No kanji available)',
        item,
      };
    
    case FlashcardMode.KANJI_TO_HIRA:
      return {
        front: item.kanji || '(No kanji)',
        back: item.hiragana,
        item,
      };
    
    default:
      throw new Error(`Unknown flashcard mode: ${mode}`);
  }
}

/**
 * Validate vocabulary item data
 */
export function isValidVocabularyItem(item: Partial<VocabularyItem>): boolean {
  return !!(
    item.vietnamese?.trim() &&
    item.hiragana?.trim()
  );
}

/**
 * Format mode name for display
 */
export function getModeName(mode: FlashcardMode): string {
  switch (mode) {
    case FlashcardMode.VI_TO_HIRA:
      return 'Vietnamese → Hiragana';
    case FlashcardMode.HIRA_TO_KANJI:
      return 'Hiragana → Kanji';
    case FlashcardMode.KANJI_TO_HIRA:
      return 'Kanji → Hiragana';
    default:
      return 'Unknown Mode';
  }
}

/**
 * Get available modes - always return all 3 modes
 */
export function getAvailableModes(items: VocabularyItem[]): FlashcardMode[] {
  return [
    FlashcardMode.VI_TO_HIRA,
    FlashcardMode.HIRA_TO_KANJI,
    FlashcardMode.KANJI_TO_HIRA,
  ];
}

/**
 * Sort vocabulary items by various criteria
 */
export function sortVocabulary(items: VocabularyItem[], sortBy: SortOption): VocabularyItem[] {
  const sorted = [...items];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
    
    case 'oldest':
      return sorted.sort((a, b) => a.createdAt - b.createdAt);
    
    case 'az':
      return sorted.sort((a, b) => a.vietnamese.localeCompare(b.vietnamese, 'vi'));
    
    case 'za':
      return sorted.sort((a, b) => b.vietnamese.localeCompare(a.vietnamese, 'vi'));
    
    case 'kanji-first':
      return sorted.sort((a, b) => {
        const aHasKanji = a.kanji !== null && a.kanji.trim() !== '';
        const bHasKanji = b.kanji !== null && b.kanji.trim() !== '';
        if (aHasKanji === bHasKanji) return 0;
        return aHasKanji ? -1 : 1;
      });
    
    case 'favorite-first':
      return sorted.sort((a, b) => {
        const aFav = a.isFavorite || false;
        const bFav = b.isFavorite || false;
        if (aFav === bFav) return 0;
        return aFav ? -1 : 1;
      });
    
    default:
      return sorted;
  }
}

/**
 * Filter vocabulary items by search query
 */
export function filterVocabulary(items: VocabularyItem[], query: string): VocabularyItem[] {
  if (!query.trim()) return items;
  
  const lowerQuery = query.toLowerCase();
  
  return items.filter(item => 
    item.vietnamese.toLowerCase().includes(lowerQuery) ||
    item.hiragana.includes(query) ||
    item.kanji?.includes(query) ||
    item.note?.toLowerCase().includes(lowerQuery) ||
    item.category?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Calculate vocabulary statistics
 */
export function calculateStatistics(items: VocabularyItem[]): VocabularyStatistics {
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  
  const wordsWithKanji = items.filter(item => item.kanji !== null && item.kanji.trim() !== '');
  const favoriteWords = items.filter(item => item.isFavorite);
  const recentWords = items.filter(item => item.createdAt > sevenDaysAgo);
  
  // Get unique categories and count
  const categoryMap = new Map<string, number>();
  items.forEach(item => {
    if (item.category) {
      categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + 1);
    }
  });
  
  const categories = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
  
  // Find oldest and newest
  const sortedByDate = [...items].sort((a, b) => a.createdAt - b.createdAt);
  const oldestWord = sortedByDate[0];
  const newestWord = sortedByDate[sortedByDate.length - 1];
  
  return {
    totalWords: items.length,
    wordsWithKanji: wordsWithKanji.length,
    wordsWithoutKanji: items.length - wordsWithKanji.length,
    favoriteWords: favoriteWords.length,
    recentlyAdded: recentWords.length,
    categories,
    oldestWord,
    newestWord,
  };
}

/**
 * Get display name for sort option
 */
export function getSortOptionName(option: SortOption): string {
  switch (option) {
    case 'newest':
      return 'Mới nhất';
    case 'oldest':
      return 'Cũ nhất';
    case 'az':
      return 'A → Z';
    case 'za':
      return 'Z → A';
    case 'kanji-first':
      return 'Có Kanji trước';
    case 'favorite-first':
      return 'Yêu thích trước';
    default:
      return option;
  }
}
