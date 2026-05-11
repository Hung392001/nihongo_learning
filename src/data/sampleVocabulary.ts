import { VocabularyItem } from '../types/vocabulary';
import { generateId, getCurrentTimestamp } from '../utils/flashcardHelpers';

/**
 * Sample vocabulary data for testing and initial setup
 * Based on common Japanese words for beginners
 * 
 * NOTE: For production use, import from unit1Vocabulary.ts which contains
 * the complete, structured Unit 1 vocabulary with 45 items.
 * 
 * This file is kept for backwards compatibility and quick testing.
 */
export const sampleVocabulary: Omit<VocabularyItem, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    vietnamese: 'Xin chào',
    hiragana: 'こんにちは',
    kanji: '今日は',
    romaji: 'konnichiwa',
    category: 'greeting',
    tags: ['greeting', 'basic', 'daily'],
    exampleSentence: 'こんにちは。元気ですか。',
    exampleSentenceHiragana: 'こんにちは。げんきですか。',
    exampleTranslationVi: 'Xin chào. Bạn khỏe không?',
    difficulty: 1,
  },
  {
    vietnamese: 'Cảm ơn',
    hiragana: 'ありがとう',
    kanji: '有難う',
    romaji: 'arigatou',
    category: 'greeting',
    tags: ['greeting', 'basic', 'gratitude'],
    exampleSentence: 'ありがとうございます。',
    exampleSentenceHiragana: 'ありがとうございます。',
    exampleTranslationVi: 'Cảm ơn rất nhiều.',
    difficulty: 1,
  },
  {
    vietnamese: 'Nước',
    hiragana: 'みず',
    kanji: '水',
    romaji: 'mizu',
    category: 'people',
    tags: ['noun', 'basic', 'nature'],
    exampleSentence: '水を飲みます。',
    exampleSentenceHiragana: 'みずをのみます。',
    exampleTranslationVi: 'Uống nước.',
    difficulty: 1,
  },
  {
    vietnamese: 'Lửa',
    hiragana: 'ひ',
    kanji: '火',
    romaji: 'hi',
    category: 'people',
    tags: ['noun', 'basic', 'nature'],
    exampleSentence: '火が熱いです。',
    exampleSentenceHiragana: 'ひがあついです。',
    exampleTranslationVi: 'Lửa nóng.',
    difficulty: 1,
  },
  {
    vietnamese: 'Người',
    hiragana: 'ひと',
    kanji: '人',
    romaji: 'hito',
    category: 'people',
    tags: ['noun', 'basic', 'human'],
    exampleSentence: 'あの人は誰ですか。',
    exampleSentenceHiragana: 'あのひとはだれですか。',
    exampleTranslationVi: 'Người kia là ai?',
    difficulty: 1,
  },
  {
    vietnamese: 'Tạm biệt',
    hiragana: 'さようなら',
    kanji: null,
    romaji: 'sayounara',
    category: 'greeting',
    tags: ['greeting', 'basic', 'farewell'],
    exampleSentence: 'さようなら、また明日。',
    exampleSentenceHiragana: 'さようなら、またあした。',
    exampleTranslationVi: 'Tạm biệt, hẹn gặp lại ngày mai.',
    difficulty: 1,
  },
  {
    vietnamese: 'Xin lỗi',
    hiragana: 'ごめんなさい',
    kanji: null,
    romaji: 'gomennasai',
    category: 'greeting',
    tags: ['greeting', 'basic', 'apology'],
    exampleSentence: 'ごめんなさい、遅れました。',
    exampleSentenceHiragana: 'ごめんなさい、おくれました。',
    exampleTranslationVi: 'Xin lỗi, tôi đến muộn.',
    difficulty: 1,
  },
  {
    vietnamese: 'Có',
    hiragana: 'はい',
    kanji: null,
    romaji: 'hai',
    category: 'greeting',
    tags: ['response', 'basic', 'yes'],
    exampleSentence: 'はい、わかりました。',
    exampleSentenceHiragana: 'はい、わかりました。',
    exampleTranslationVi: 'Vâng, tôi hiểu rồi.',
    difficulty: 1,
  },
  {
    vietnamese: 'Không',
    hiragana: 'いいえ',
    kanji: null,
    romaji: 'iie',
    category: 'greeting',
    tags: ['response', 'basic', 'no'],
    exampleSentence: 'いいえ、違います。',
    exampleSentenceHiragana: 'いいえ、ちがいます。',
    exampleTranslationVi: 'Không, sai rồi.',
    difficulty: 1,
  },
  {
    vietnamese: 'Núi',
    hiragana: 'やま',
    kanji: '山',
    romaji: 'yama',
    category: 'place',
    tags: ['noun', 'basic', 'nature', 'geography'],
    exampleSentence: '山に登ります。',
    exampleSentenceHiragana: 'やまにのぼります。',
    exampleTranslationVi: 'Leo núi.',
    difficulty: 1,
  },
  {
    vietnamese: 'Sông',
    hiragana: 'かわ',
    kanji: '川',
    romaji: 'kawa',
    category: 'place',
    tags: ['noun', 'basic', 'nature', 'geography'],
    exampleSentence: '川で泳ぎます。',
    exampleSentenceHiragana: 'かわでおよぎます。',
    exampleTranslationVi: 'Bơi ở sông.',
    difficulty: 1,
  },
  {
    vietnamese: 'Mặt trời',
    hiragana: 'たいよう',
    kanji: '太陽',
    romaji: 'taiyou',
    category: 'people',
    tags: ['noun', 'basic', 'nature', 'astronomy'],
    exampleSentence: '太陽が明るいです。',
    exampleSentenceHiragana: 'たいようがあかるいです。',
    exampleTranslationVi: 'Mặt trời sáng.',
    difficulty: 1,
  },
  {
    vietnamese: 'Mặt trăng',
    hiragana: 'つき',
    kanji: '月',
    romaji: 'tsuki',
    category: 'people',
    tags: ['noun', 'basic', 'nature', 'astronomy'],
    exampleSentence: '月がきれいです。',
    exampleSentenceHiragana: 'つきがきれいです。',
    exampleTranslationVi: 'Mặt trăng đẹp.',
    difficulty: 1,
  },
  {
    vietnamese: 'Ngày',
    hiragana: 'ひ',
    kanji: '日',
    romaji: 'hi',
    category: 'people',
    tags: ['noun', 'basic', 'time'],
    exampleSentence: '今日はいい日です。',
    exampleSentenceHiragana: 'きょうはいいひです。',
    exampleTranslationVi: 'Hôm nay là một ngày tốt.',
    difficulty: 1,
  },
  {
    vietnamese: 'Năm',
    hiragana: 'とし',
    kanji: '年',
    romaji: 'toshi',
    category: 'people',
    tags: ['noun', 'basic', 'time'],
    exampleSentence: '今年は2026年です。',
    exampleSentenceHiragana: 'ことしは2026ねんです。',
    exampleTranslationVi: 'Năm nay là năm 2026.',
    difficulty: 1,
  },
  {
    vietnamese: 'Sách',
    hiragana: 'ほん',
    kanji: '本',
    romaji: 'hon',
    category: 'people',
    tags: ['noun', 'basic', 'object', 'education'],
    exampleSentence: '本を読みます。',
    exampleSentenceHiragana: 'ほんをよみます。',
    exampleTranslationVi: 'Đọc sách.',
    difficulty: 1,
  },
  {
    vietnamese: 'Trường học',
    hiragana: 'がっこう',
    kanji: '学校',
    romaji: 'gakkou',
    category: 'place',
    tags: ['noun', 'basic', 'education', 'place'],
    exampleSentence: '学校に行きます。',
    exampleSentenceHiragana: 'がっこうにいきます。',
    exampleTranslationVi: 'Đi đến trường.',
    difficulty: 1,
  },
  {
    vietnamese: 'Học sinh',
    hiragana: 'がくせい',
    kanji: '学生',
    romaji: 'gakusei',
    category: 'occupation',
    tags: ['noun', 'basic', 'education', 'occupation'],
    exampleSentence: '私は学生です。',
    exampleSentenceHiragana: 'わたしはがくせいです。',
    exampleTranslationVi: 'Tôi là học sinh.',
    difficulty: 1,
  },
  {
    vietnamese: 'Giáo viên',
    hiragana: 'せんせい',
    kanji: '先生',
    romaji: 'sensei',
    category: 'occupation',
    tags: ['noun', 'basic', 'education', 'occupation', 'honorific'],
    exampleSentence: '先生に聞きます。',
    exampleSentenceHiragana: 'せんせいにききます。',
    exampleTranslationVi: 'Hỏi thầy/cô.',
    difficulty: 1,
  },
  {
    vietnamese: 'Bạn bè',
    hiragana: 'ともだち',
    kanji: '友達',
    romaji: 'tomodachi',
    category: 'people',
    tags: ['noun', 'basic', 'relationship'],
    exampleSentence: '友達と遊びます。',
    exampleSentenceHiragana: 'ともだちとあそびます。',
    exampleTranslationVi: 'Chơi với bạn.',
    difficulty: 1,
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
