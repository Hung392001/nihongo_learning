/**
 * Kanji characters for numbers 1-10 with stroke information and meanings
 */

export interface KanjiNumber {
  number: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  strokes: number;
  meaning: string;
  strokeOrder: number[];
  visualization?: string;
}

export const kanjiNumbers: KanjiNumber[] = [
  {
    number: 1,
    kanji: '一',
    hiragana: 'いち',
    romaji: 'ichi',
    strokes: 1,
    meaning: 'one - written as a single horizontal line',
    strokeOrder: [1],
    visualization: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <text x="100" y="140" font-size="120" text-anchor="middle" font-family="serif" font-weight="bold">一</text>
      </svg>
    `
  },
  {
    number: 2,
    kanji: '二',
    hiragana: 'に',
    romaji: 'ni',
    strokes: 2,
    meaning: 'two - written as two horizontal lines',
    strokeOrder: [1, 2],
    visualization: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <text x="100" y="130" font-size="120" text-anchor="middle" font-family="serif" font-weight="bold">二</text>
      </svg>
    `
  },
  {
    number: 3,
    kanji: '三',
    hiragana: 'さん',
    romaji: 'san',
    strokes: 3,
    meaning: 'three - written as three horizontal lines',
    strokeOrder: [1, 2, 3],
    visualization: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <text x="100" y="130" font-size="120" text-anchor="middle" font-family="serif" font-weight="bold">三</text>
      </svg>
    `
  },
  {
    number: 4,
    kanji: '四',
    hiragana: 'し',
    romaji: 'shi / yon',
    strokes: 5,
    meaning: 'four - written as a box',
    strokeOrder: [1, 2, 3, 4, 5],
    visualization: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <text x="100" y="130" font-size="120" text-anchor="middle" font-family="serif" font-weight="bold">四</text>
      </svg>
    `
  },
  {
    number: 5,
    kanji: '五',
    hiragana: 'ご',
    romaji: 'go',
    strokes: 4,
    meaning: 'five - written with a cross pattern',
    strokeOrder: [1, 2, 3, 4],
    visualization: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <text x="100" y="130" font-size="120" text-anchor="middle" font-family="serif" font-weight="bold">五</text>
      </svg>
    `
  },
  {
    number: 6,
    kanji: '六',
    hiragana: 'ろく',
    romaji: 'roku',
    strokes: 4,
    meaning: 'six',
    strokeOrder: [1, 2, 3, 4],
    visualization: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <text x="100" y="130" font-size="120" text-anchor="middle" font-family="serif" font-weight="bold">六</text>
      </svg>
    `
  },
  {
    number: 7,
    kanji: '七',
    hiragana: 'しち',
    romaji: 'shichi / nana',
    strokes: 2,
    meaning: 'seven',
    strokeOrder: [1, 2],
    visualization: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <text x="100" y="130" font-size="120" text-anchor="middle" font-family="serif" font-weight="bold">七</text>
      </svg>
    `
  },
  {
    number: 8,
    kanji: '八',
    hiragana: 'はち',
    romaji: 'hachi',
    strokes: 2,
    meaning: 'eight - like a V shape splitting into two',
    strokeOrder: [1, 2],
    visualization: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <text x="100" y="130" font-size="120" text-anchor="middle" font-family="serif" font-weight="bold">八</text>
      </svg>
    `
  },
  {
    number: 9,
    kanji: '九',
    hiragana: 'きゅう',
    romaji: 'kyuu / ku',
    strokes: 2,
    meaning: 'nine',
    strokeOrder: [1, 2],
    visualization: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <text x="100" y="130" font-size="120" text-anchor="middle" font-family="serif" font-weight="bold">九</text>
      </svg>
    `
  },
  {
    number: 10,
    kanji: '十',
    hiragana: 'じゅう',
    romaji: 'juu / too',
    strokes: 2,
    meaning: 'ten - written as a cross/plus sign',
    strokeOrder: [1, 2],
    visualization: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <text x="100" y="130" font-size="120" text-anchor="middle" font-family="serif" font-weight="bold">十</text>
      </svg>
    `
  }
];
