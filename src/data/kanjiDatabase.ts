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
  },
  {
    ka_id: "kanji_011",
    ka_utf: "百",
    kname: "hyaku",
    kstroke: 3,
    meaning: "hundred",
    onyomi: "ヒャク",
    kunyomi: "もも",
    onyomi_ja: "ひゃく",
    kunyomi_ja: "もも",
    examples: [
      ["二百", "にひゃく - two hundred"],
      ["三百", "さんびゃく - three hundred"],
      ["四百", "よんひゃく - four hundred"],
      ["五百", "ごひゃく - five hundred"],
      ["六百", "ろっぴゃく - six hundred"],
      ["七百", "ななひゃく - seven hundred"],
      ["八百", "はっぴゃく - eight hundred"],
      ["九百", "きゅうひゃく - nine hundred"]
    ],
    rad_utf: "白",
    rad_stroke: 3,
    rad_order: 100,
    rad_name: "white",
    rad_meaning: "白 (white)",
    grade: 1
  },
  {
    ka_id: "kanji_012",
    ka_utf: "千",
    kname: "sen",
    kstroke: 3,
    meaning: "thousand",
    onyomi: "セン",
    kunyomi: "ち",
    onyomi_ja: "せん",
    kunyomi_ja: "ち",
    examples: [
      ["千年", "せんねん - a thousand years"],
      ["千人", "せんにん - a thousand people"],
      ["千円", "せんえん - a thousand yen"]
    ],
    rad_utf: "千",
    rad_stroke: 3,
    rad_order: 101,
    rad_name: "thousand",
    rad_meaning: "千 (thousand)",
    grade: 1
  },
  {
    ka_id: "kanji_013",
    ka_utf: "万",
    kname: "man",
    kstroke: 3,
    meaning: "ten thousand",
    onyomi: "マン",
    kunyomi: "よろず",
    onyomi_ja: "まん",
    kunyomi_ja: "よろず",
    examples: [
      ["一万", "いちまん - ten thousand"],
      ["白万", "ひゃくまん - one million"],
    ],
    rad_utf: "万",
    rad_stroke: 3,
    rad_order: 102,
    rad_name: "ten thousand",
    rad_meaning: "万 (ten thousand)",
    grade: 1
  },
  {
    ka_id: "kanji_014",
    ka_utf: "円",
    kname: "oku",
    kstroke: 3,
    meaning: "yen",
    onyomi: "エン",
    kunyomi: "えん",
    onyomi_ja: "えん",
    kunyomi_ja: "えん",
    examples: [
      ["白円", "ひゃくえん - one hundred yen"],
      ["円い", "まるい - round"],
    ],
    rad_utf: "円",
    rad_stroke: 3,
    rad_order: 103,
    rad_name: "circle",
    rad_meaning: "円 (circle)",
    grade: 1
  },
  {
    ka_id: "kanji_015",
    ka_utf: "口",
    kname: "kuchi",
    kstroke: 3,
    meaning: "mouth",
    onyomi: "コウ",
    kunyomi: "くち",
    onyomi_ja: "こう",
    kunyomi_ja: "くち",
    examples: [
      ["入口", "ぐい - entrance"]
    ],
    rad_utf: "口",
    rad_stroke: 3,
    rad_order: 104,
    rad_name: "mouth",
    rad_meaning: "口 (mouth)",
    grade: 1
  },
  {
    ka_id: "kanji_016",
    ka_utf: "目",
    kname: "me",
    kstroke: 5,
    meaning: "eye",
    onyomi: "モク",
    kunyomi: "め",
    onyomi_ja: "もく",
    kunyomi_ja: "め",
    examples: [
      ["目", "め - eye"],
      ["一日目", "いちにちめ - first day"]
    ],
    rad_utf: "目",
    rad_stroke: 5,
    rad_order: 105,
    rad_name: "eye",
    rad_meaning: "目 (eye)",
    grade: 1
  },
  {
    ka_id: "kanji_017",
    ka_utf: "日",
    kname: "hi",
    kstroke: 4,
    meaning: "day",
    onyomi: "ニチ",
    kunyomi: "ひ",
    onyomi_ja: "にち",
    kunyomi_ja: "ひ",
    examples: [
      ["日曜日", "にちようび - Sunday"],
      ["日本", "にほん - Japan"],
      ["今日", "きょう - today"],
      ["毎日", "まいにち - every day"],
      ["日記", "にっき - diary"]
    ],
    rad_utf: "日",
    rad_stroke: 4,
    rad_order: 106,
    rad_name: "sun",
    rad_meaning: "日 (sun)",
    grade: 1
  },
  {
    ka_id: "kanji_018",
    ka_utf: "月",
    kname: "tsuki",
    kstroke: 4,
    meaning: "moon",
    onyomi: "ゲツ",
    kunyomi: "つき",
    onyomi_ja: "げつ",
    kunyomi_ja: "つき",
    examples: [
      ["月曜日", "げつようび - Monday"],
      ["今月", "こんげつ - this month"],
      ["月", "つき - moon"],
      ["毎月", "まいつき - every month"],
      ["来月", "らいげつ - next month"]
    ],
    rad_utf: "月",
    rad_stroke: 4,
    rad_order: 107,
    rad_name: "moon",
    rad_meaning: "月 (moon)",
    grade: 1
  },
  {
    ka_id: "kanji_019",
    ka_utf: "火",
    kname: "hi",
    kstroke: 4,
    meaning: "fire",
    onyomi: "カ",
    kunyomi: "ひ",
    onyomi_ja: "か",
    kunyomi_ja: "ひ",
    examples: [
      ["火曜日", "かようび - Tuesday"],
      ["火", "ひ - fire"],
    ],
    rad_utf: "火",
    rad_stroke: 4,
    rad_order: 108,
    rad_name: "fire",
    rad_meaning: "火 (fire)",
    grade: 1
  },
  {
    ka_id: "kanji_020",
    ka_utf: "水",
    kname: "mizu",
    kstroke: 4,
    meaning: "water",
    onyomi: "スイ",
    kunyomi: "みず",
    onyomi_ja: "すい",
    kunyomi_ja: "みず",
    examples: [
      ["水曜日", "すいようび - Wednesday"],
      ["水", "みず - water"],
    ],
    rad_utf: "水",
    rad_stroke: 4,
    rad_order: 109,
    rad_name: "water",
    rad_meaning: "水 (water)",
    grade: 1
  },
  {
    ka_id: "kanji_021",
    ka_utf: "木",
    kname: "ki",
    kstroke: 4,
    meaning: "tree",
    onyomi: "モク",
    kunyomi: "き",
    onyomi_ja: "もく",
    kunyomi_ja: "き",
    examples: [
      ["木曜日", "もくようび - Thursday"],
      ["木", "き - tree"],
    ],
    rad_utf: "木",
    rad_stroke: 4,
    rad_order: 110,
    rad_name: "tree",
    rad_meaning: "木 (tree)",
    grade: 1
  },
  {
    ka_id: "kanji_022",
    ka_utf: "金",
    kname: "kane",
    kstroke: 8,
    meaning: "gold",
    onyomi: "キン",
    kunyomi: "かね",
    onyomi_ja: "きん",
    kunyomi_ja: "かね",
    examples: [
      ["金曜日", "きんようび - Friday"],
      ["お金", "おかね - money"],
      ["現金", "げんきん - cash"]
    ],
    rad_utf: "金",
    rad_stroke: 8,
    rad_order: 111,
    rad_name: "gold",
    rad_meaning: "金 (gold)",
    grade: 1
  },
  {
    ka_id: "kanji_023",
    ka_utf: "土",
    kname: "tsuchi",
    kstroke: 3,
    meaning: "earth",
    onyomi: "ド",
    kunyomi: "つち",
    onyomi_ja: "ど",
    kunyomi_ja: "つち",
    examples: [
      ["土曜日", "どようび - Saturday"],
      ["土", "つち - earth"],
    ],
    rad_utf: "土",
    rad_stroke: 3,
    rad_order: 112,
    rad_name: "earth",
    rad_meaning: "土 (earth)",
    grade: 1
  },
  {
    ka_id: "kanji_024",
    ka_utf: "曜",
    kname: "you",
    kstroke: 4,
    meaning: "day of the week",
    onyomi: "ヨウ",
    kunyomi: "",
    onyomi_ja: "よう",
    kunyomi_ja: "",
    examples: [
      ["日曜日", "にちようび - Sunday"],
      ["月曜日", "げつようび - Monday"],
      ["火曜日", "かようび - Tuesday"],
      ["水曜日", "すいようび - Wednesday"],
      ["木曜日", "もくようび - Thursday"],
      ["金曜日", "きんようび - Friday"],
      ["土曜日", "どようび - Saturday"]
    ],
    rad_utf: "曜",
    rad_stroke: 4,
    rad_order: 106,
    rad_name: "day of the week",
    rad_meaning: "曜 (day of the week)",
    grade: 1
  },
  {
    ka_id: "kanji_025",
    ka_utf: "本",
    kname: "honn",
    kstroke: 5,
    meaning: "book",
    onyomi: "ホン",
    kunyomi: "ほん",
    onyomi_ja: "ほん",
    kunyomi_ja: "ほん",
    examples: [
      ["本", "ほん - book"],
      ["山本さん", "やまもとさん - Mr. Yamamoto"]
    ],
    rad_utf: "本",
    rad_stroke: 5,
    rad_order: 113,
    rad_name: "book",
    rad_meaning: "本 (book)",
    grade: 1
  },
  {
    ka_id: "kanji_026",
    ka_utf: "人",
    kname: "hito",
    kstroke: 2,
    meaning: "person",
    onyomi: "ジン",
    kunyomi: "ひと",
    onyomi_ja: "じん",
    kunyomi_ja: "ひと",
    examples: [
      ["日本人", "にほんじん - Japanese person"],
      ["一人", "ひとり - one person"]
    ],
    rad_utf: "人",
    rad_stroke: 2,
    rad_order: 114,
    rad_name: "person",
    rad_meaning: "人 (person)",
    grade: 1
  },
  {
    ka_id: "kanji_027",
    ka_utf: "今",
    kname: "ima",
    kstroke: 4,
    meaning: "now",
    onyomi: "コン",
    kunyomi: "いま",
    onyomi_ja: "こん",
    kunyomi_ja: "いま",
    examples: [
      ["今", "いま - now"],
      ["今年", "ことし - this year"]
    ],
    rad_utf: "今",
    rad_stroke: 4,
    rad_order: 115,
    rad_name: "now",
    rad_meaning: "今 (now)",
    grade: 1
  },
  {
    ka_id: "kanji_028",
    ka_utf: "寺",
    kname: "tera",
    kstroke: 6,
    meaning: "temple",
    onyomi: "ジ",
    kunyomi: "てら",
    onyomi_ja: "じ",
    kunyomi_ja: "てら",
    examples: [
      ["お寺", "おてら - temple"]
    ],
    rad_utf: "寺",
    rad_stroke: 6,
    rad_order: 116,
    rad_name: "temple",
    rad_meaning: "寺 (temple)",
    grade: 1
  },
  {
    ka_id: "kanji_029",
    ka_utf: "時",
    kname: "toki",
    kstroke: 13,
    meaning: "time",
    onyomi: "ジ",
    kunyomi: "とき",
    onyomi_ja: "じ",
    kunyomi_ja: "とき",
    examples: [
      ["時間", "じかん - time"],
      ["時々", "ときどき - sometimes"],
      ["時計", "とけい - clock"]
    ],
    rad_utf: "時",
    rad_stroke: 13,
    rad_order: 117,
    rad_name: "time",
    rad_meaning: "時 (time)",
    grade: 1
  },
  {
    ka_id: "kanji_030",
    ka_utf: "半",
    kname: "hatsu",
    kstroke: 8,
    meaning: "half",
    onyomi: "ハン",
    kunyomi: "はん",
    onyomi_ja: "はん",
    kunyomi_ja: "はん",
    examples: [
      ["半分", "はんぶん - half"],
      ["三時半", "さんじはん - half past three"]
    ],
    rad_utf: "半",
    rad_stroke: 8,
    rad_order: 118,
    rad_name: "half",
    rad_meaning: "半 (half)",
    grade: 1
  },
  {
    ka_id: "kanji_031",
    ka_utf: "刀",
    kname: "to",
    kstroke: 11,
    meaning: "sword",
    onyomi: "トウ",
    kunyomi: "かたな",
    onyomi_ja: "とう",
    kunyomi_ja: "かたな",
    examples: [
      ["刀", "かたな - sword"],
      ["日本刀", "にほんとう - Japanese sword"]
    ],
    rad_utf: "刀",
    rad_stroke: 11,
    rad_order: 119,
    rad_name: "sword",
    rad_meaning: "刀 (sword)",
    grade: 1
  },
  {
    ka_id: "kanji_032",
    ka_utf: "分",
    kname: "fun",
    kstroke: 4,
    meaning: "minute",
    onyomi: "ブン",
    kunyomi: "ふん",
    onyomi_ja: "ぶん",
    kunyomi_ja: "ふん",
    examples: [
      ["一分", "いっぷん - one minute"],
      ["分かる", "わかる - to understand"]
    ],
    rad_utf: "分",
    rad_stroke: 4,
    rad_order: 120,
    rad_name: "minute",
    rad_meaning: "分 (minute)",
    grade: 1
  }
];
