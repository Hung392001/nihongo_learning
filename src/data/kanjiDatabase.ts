/**
 * Kanji Database - Numbers 1-10
 * Based on kanji-web-app-master KanjiDocument structure
 */

export interface KanjiData {
  ka_id: string;
  ka_utf: string;
  kname: string;
  kstroke: number;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  onyomi_ja: string;
  kunyomi_ja: string;
  examples: Array<[string, string]>;
  rad_utf: string;
  rad_stroke: number;
  rad_order: number;
  rad_name: string;
  rad_meaning: string;
  grade: number;
}

export const kanjiDatabase: KanjiData[] = [
  {
    ka_id: "kanji_001",
    ka_utf: "一",
    kname: "ichi",
    kstroke: 1,
    meaning: "one",
    onyomi: "イチ",
    kunyomi: "ひ",
    onyomi_ja: "いち",
    kunyomi_ja: "ひ",
    examples: [
      ["一日", "いちにち - one day"],
      ["一番", "いちばん - number one"],
      ["一人", "ひとり - one person"]
    ],
    rad_utf: "一",
    rad_stroke: 1,
    rad_order: 1,
    rad_name: "one",
    rad_meaning: "一 (one)",
    grade: 1
  },
  {
    ka_id: "kanji_002",
    ka_utf: "二",
    kname: "ni",
    kstroke: 2,
    meaning: "two",
    onyomi: "ニ",
    kunyomi: "ふ",
    onyomi_ja: "に",
    kunyomi_ja: "ふ",
    examples: [
      ["二日", "ふつか - two days"],
      ["二人", "ふたり - two people"],
      ["第二", "だいに - second"]
    ],
    rad_utf: "一",
    rad_stroke: 1,
    rad_order: 1,
    rad_name: "one",
    rad_meaning: "一 (one)",
    grade: 1
  },
  {
    ka_id: "kanji_003",
    ka_utf: "三",
    kname: "san",
    kstroke: 3,
    meaning: "three",
    onyomi: "サン",
    kunyomi: "み",
    onyomi_ja: "さん",
    kunyomi_ja: "み",
    examples: [
      ["三日", "みっか - three days"],
      ["三人", "さんにん - three people"],
      ["三月", "さんがつ - March"]
    ],
    rad_utf: "一",
    rad_stroke: 1,
    rad_order: 1,
    rad_name: "one",
    rad_meaning: "一 (one)",
    grade: 1
  },
  {
    ka_id: "kanji_004",
    ka_utf: "四",
    kname: "shi",
    kstroke: 5,
    meaning: "four",
    onyomi: "シ",
    kunyomi: "よ",
    onyomi_ja: "し",
    kunyomi_ja: "よ",
    examples: [
      ["四日", "よんか - four days"],
      ["四人", "よんにん - four people"],
      ["四月", "しがつ - April"]
    ],
    rad_utf: "囗",
    rad_stroke: 3,
    rad_order: 36,
    rad_name: "enclosure",
    rad_meaning: "囗 (enclosure)",
    grade: 1
  },
  {
    ka_id: "kanji_005",
    ka_utf: "五",
    kname: "go",
    kstroke: 4,
    meaning: "five",
    onyomi: "ゴ",
    kunyomi: "いつ",
    onyomi_ja: "ご",
    kunyomi_ja: "いつ",
    examples: [
      ["五日", "いつか - five days"],
      ["五人", "ごにん - five people"],
      ["五月", "ごがつ - May"]
    ],
    rad_utf: "二",
    rad_stroke: 2,
    rad_order: 2,
    rad_name: "two",
    rad_meaning: "二 (two)",
    grade: 1
  },
  {
    ka_id: "kanji_006",
    ka_utf: "六",
    kname: "roku",
    kstroke: 4,
    meaning: "six",
    onyomi: "ロク",
    kunyomi: "む",
    onyomi_ja: "ろく",
    kunyomi_ja: "む",
    examples: [
      ["六日", "むいか - six days"],
      ["六人", "ろくにん - six people"],
      ["六月", "ろくがつ - June"]
    ],
    rad_utf: "八",
    rad_stroke: 2,
    rad_order: 12,
    rad_name: "eight",
    rad_meaning: "八 (eight)",
    grade: 1
  },
  {
    ka_id: "kanji_007",
    ka_utf: "七",
    kname: "shichi",
    kstroke: 2,
    meaning: "seven",
    onyomi: "シチ",
    kunyomi: "なな",
    onyomi_ja: "しち",
    kunyomi_ja: "なな",
    examples: [
      ["七日", "なのか - seven days"],
      ["七人", "ななにん - seven people"],
      ["七月", "しちがつ - July"]
    ],
    rad_utf: "一",
    rad_stroke: 1,
    rad_order: 1,
    rad_name: "one",
    rad_meaning: "一 (one)",
    grade: 1
  },
  {
    ka_id: "kanji_008",
    ka_utf: "八",
    kname: "hachi",
    kstroke: 2,
    meaning: "eight",
    onyomi: "ハチ",
    kunyomi: "や",
    onyomi_ja: "はち",
    kunyomi_ja: "や",
    examples: [
      ["八日", "ようか - eight days"],
      ["八人", "はちにん - eight people"],
      ["八月", "はちがつ - August"]
    ],
    rad_utf: "八",
    rad_stroke: 2,
    rad_order: 12,
    rad_name: "eight",
    rad_meaning: "八 (eight)",
    grade: 1
  },
  {
    ka_id: "kanji_009",
    ka_utf: "九",
    kname: "kyuu",
    kstroke: 2,
    meaning: "nine",
    onyomi: "キュウ",
    kunyomi: "ここ",
    onyomi_ja: "きゅう",
    kunyomi_ja: "ここ",
    examples: [
      ["九日", "ここのか - nine days"],
      ["九人", "きゅうにん - nine people"],
      ["九月", "くがつ - September"]
    ],
    rad_utf: "弋",
    rad_stroke: 3,
    rad_order: 56,
    rad_name: "crossroads",
    rad_meaning: "弋 (crossroads)",
    grade: 1
  },
  {
    ka_id: "kanji_010",
    ka_utf: "十",
    kname: "juu",
    kstroke: 2,
    meaning: "ten",
    onyomi: "ジュウ",
    kunyomi: "と",
    onyomi_ja: "じゅう",
    kunyomi_ja: "と",
    examples: [
      ["十日", "とおか - ten days"],
      ["十人", "じゅうにん - ten people"],
      ["十月", "じゅうがつ - October"]
    ],
    rad_utf: "十",
    rad_stroke: 2,
    rad_order: 24,
    rad_name: "ten",
    rad_meaning: "十 (ten)",
    grade: 1
  }
];
