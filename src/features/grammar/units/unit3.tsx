import { GrammarLesson } from "./types";

export const unit3: GrammarLesson = {
  id: "unit3",
  title: "Unit 3: Locations & Direction - ここ・そこ・あそこ",
  japaneseTitle: "ユニット３：ばしょ・ほうこう｜ここ・そこ・あそこ・どこ",
  content: [
    {
      type: "explanation",
      text: "In Unit 3, you will learn location words and how to describe where places and people are located.",
      vietnamese:
        "ユニット３では、場所を示す単語と、場所や人がどこに位置するかを説明する方法を学びます。",
    },
    {
      type: "title",
      text: "１. ここ・そこ・あそこ・どこ - Place Words",
    },
    {
      type: "explanation",
      text: 'ここ, そこ, あそこ are location words (different from これ, それ, あれ which refer to objects). どこ is used to ask "where".',
      vietnamese:
        "ここ、そこ、あそこは場所を示す単語です（これ、それ、あれは物を指す単語とは異なります）。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "ここ：話者の近い場所",
          vietnamese: "ここ (đây): Nơi gần người nói",
          english: "ここ (here): Place near the speaker",
        },
        {
          japanese: "そこ：聞き手の近い場所",
          vietnamese: "そこ (đó): Nơi gần người nghe",
          english: "そこ (there): Place near the listener",
        },
        {
          japanese: "あそこ：二人から遠い場所",
          vietnamese: "あそこ (ở kia): Nơi xa cả hai",
          english: "あそこ (over there): Place far from both",
        },
        {
          japanese: "どこ：質問「どこですか」",
          vietnamese: 'どこ (đâu): Câu hỏi "Ở đâu?"',
          english: 'どこ (where): Question "Where is it?"',
        },
      ],
    },
    {
      type: "title",
      text: "２. Danh từ は ～です - Place Description Pattern",
    },
    {
      type: "explanation",
      text: "Use this pattern to describe what a place is or what is located at a place. Pattern: N1 は N2 です。",
      vietnamese:
        "このパターンは、場所が何であるか、または場所に何があるかを説明するために使用されます。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "あそこは トイレです。",
          vietnamese: "Ở kia là phòng tắm.",
          english: "That over there is a restroom.",
        },
        {
          japanese: "あそこは ほんやです。",
          vietnamese: "Ở kia là tiệm sách.",
          english: "That over there is a bookstore.",
        },
        {
          japanese: "やまださんは あのへやです。",
          vietnamese: "Anh Yamada ở phòng nọ.",
          english: "Mr. Yamada is in that room.",
        },
      ],
    },
    {
      type: "title",
      text: "３. ここ・そこ・あそこ + です - Indicating Location",
    },
    {
      type: "explanation",
      text: "When answering where something is located, use N1 は ここ/そこ/あそこ です。",
      vietnamese:
        "ある物や人がどこにあるかを示す場合、「N1 は ここ/そこ/あそこ です」という形式を使用します。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "エレベーターは どこですか。",
          vietnamese: "Thang máy ở đâu?",
          english: "Where is the elevator?",
        },
        {
          japanese: "あそこは ぎんこうです。",
          vietnamese: "Ở kia là ngân hàng.",
          english: "That over there is a bank.",
        },
        {
          japanese: "N1 の かいしゃは どこですか。",
          vietnamese: "Công ty của N1 ở đâu?",
          english: "Where is N1's company?",
        },
      ],
    },
    {
      type: "title",
      text: "４. Quests about Location",
    },
    {
      type: "explanation",
      text: "When asking about the location of an object or person, you can use: どこですか。",
      vietnamese:
        "物や人の位置について質問する場合、「どこですか」を使用できます。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "トレインは どこですか。",
          vietnamese: "Tàu ở đâu?",
          english: "Where is the train?",
        },
        {
          japanese: "TYLは どこですか。",
          vietnamese: "TYL ở đâu?",
          english: "Where is TYL?",
        },
        {
          japanese: "わたしは どこですか。",
          vietnamese: "Tôi ở đâu?",
          english: "Where am I?",
        },
      ],
    },
    {
      type: "title",
      text: "５. の を使った質問 - Using の for Origin/Affiliation",
    },
    {
      type: "explanation",
      text: "Pattern: これ/それ/あれ は どこの N ですか。Use の to indicate what country or company something belongs to.",
      vietnamese:
        "どこの に続く名詞は、対象物がどこから来たか、どこに属するかを示します。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "これは どこの パソコンですか。",
          vietnamese: "Máy vi tính này từ đâu?",
          english: "Where is this computer from?",
        },
        {
          japanese: "これは どこの いんさつきですか。",
          vietnamese: "Máy in này từ đâu?",
          english: "Where is this printer from?",
        },
        {
          japanese: "パワーでんきの カメラです。",
          vietnamese: "Đó là máy ảnh của công ty Power Electric.",
          english: "It is a camera from Power Electric company.",
        },
      ],
    },
    {
      type: "practice",
      items: [
        {
          meaning: "The bank is over there.",
          usage: "ぎんこう + は + あそこ + です",
        },
        {
          meaning: "Where is the library?",
          usage: "としょかん + は + どこ + ですか",
        },
        {
          meaning: "This is from the United States.",
          usage: "これ + は + アメリカ + の + です",
        },
        {
          meaning: "The restroom is here.",
          usage: "トイレ + は + ここ + です",
        },
      ],
    },
  ],
};
