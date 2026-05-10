import { VocabularyItem } from '../types/vocabulary';
import { generateId, getCurrentTimestamp } from '../utils/flashcardHelpers';

/**
 * Sample vocabulary data for testing and initial setup
 * Based on common Japanese words for beginners
 */
export const sampleVocabulary: Omit<VocabularyItem, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    vietnamese: 'Xin chào',
    hiragana: 'こんにちは',
    kanji: '今日は',
  },
  {
    vietnamese: 'Cảm ơn',
    hiragana: 'ありがとう',
    kanji: '有難う',
  },
  {
    vietnamese: 'Nước',
    hiragana: 'みず',
    kanji: '水',
  },
  {
    vietnamese: 'Lửa',
    hiragana: 'ひ',
    kanji: '火',
  },
  {
    vietnamese: 'Người',
    hiragana: 'ひと',
    kanji: '人',
  },
  {
    vietnamese: 'Tạm biệt',
    hiragana: 'さようなら',
    kanji: null,
  },
  {
    vietnamese: 'Xin lỗi',
    hiragana: 'ごめんなさい',
    kanji: null,
  },
  {
    vietnamese: 'Có',
    hiragana: 'はい',
    kanji: null,
  },
  {
    vietnamese: 'Không',
    hiragana: 'いいえ',
    kanji: null,
  },
  {
    vietnamese: 'Núi',
    hiragana: 'やま',
    kanji: '山',
  },
  {
    vietnamese: 'Sông',
    hiragana: 'かわ',
    kanji: '川',
  },
  {
    vietnamese: 'Mặt trời',
    hiragana: 'たいよう',
    kanji: '太陽',
  },
  {
    vietnamese: 'Mặt trăng',
    hiragana: 'つき',
    kanji: '月',
  },
  {
    vietnamese: 'Ngày',
    hiragana: 'ひ',
    kanji: '日',
  },
  {
    vietnamese: 'Năm',
    hiragana: 'とし',
    kanji: '年',
  },
  {
    vietnamese: 'Sách',
    hiragana: 'ほん',
    kanji: '本',
  },
  {
    vietnamese: 'Trường học',
    hiragana: 'がっこう',
    kanji: '学校',
  },
  {
    vietnamese: 'Học sinh',
    hiragana: 'がくせい',
    kanji: '学生',
  },
  {
    vietnamese: 'Giáo viên',
    hiragana: 'せんせい',
    kanji: '先生',
  },
  {
    vietnamese: 'Bạn bè',
    hiragana: 'ともだち',
    kanji: '友達',
  },
];

/**
 * Convert sample data to full VocabularyItem objects
 */
export function createSampleVocabulary(): VocabularyItem[] {
  const timestamp = getCurrentTimestamp();
  return sampleVocabulary.map((item, index) => ({
    ...item,
    id: generateId(),
    createdAt: timestamp - (sampleVocabulary.length - index) * 1000,
    updatedAt: timestamp - (sampleVocabulary.length - index) * 1000,
  }));
}

/**
 * Seed the storage with sample vocabulary
 */
export async function seedSampleData(storage: any): Promise<void> {
  const existing = await storage.getAll();
  
  // Only seed if no data exists
  if (existing.length === 0) {
    const samples = createSampleVocabulary();
    
    for (const sample of samples) {
      await storage.create({
        vietnamese: sample.vietnamese,
        hiragana: sample.hiragana,
        kanji: sample.kanji,
      });
    }
    
    console.log(`Seeded ${samples.length} sample vocabulary items`);
  } else {
    console.log('Storage already contains data, skipping seed');
  }
}
