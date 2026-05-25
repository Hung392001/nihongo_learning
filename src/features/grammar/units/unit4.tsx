import { GrammarLesson } from "./types";

export const unit4: GrammarLesson = {
  id: "unit4",
  title: "Unit 4: Verb Forms & Time Expressions",
  japaneseTitle: "ユニット４：どうしのけい・じかんひょうげん",
  content: [
    {
      type: "explanation",
      text: "In Unit 4, you will learn verb conjugations, time expressions, and how to indicate when and for how long actions occur.",
      vietnamese:
        "ユニット４では、動詞の活用、時間表現、および行動がいつどのくらいの期間発生するかを示す方法を学びます。",
    },
    {
      type: "title",
      text: "１. Vます・ません・ました・ませんでした - Verb Conjugations",
    },
    {
      type: "explanation",
      text: "Japanese verbs conjugate based on tense and politeness. The ます form is polite present/future. Pattern: Vます (do), Vません (don't do), Vました (did), Vませんでした (didn't do).",
      vietnamese:
        "動詞の活用形：Vます（する）、Vません（しない）、Vました（した）、Vませんでした（しなかった）",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "きょう べんきょうします。",
          vietnamese: "Tôi học bài hôm nay.",
          english: "I study today.",
        },
        {
          japanese: "きょう べんきょうしません。",
          vietnamese: "Tôi không học bài hôm nay.",
          english: "I don't study today.",
        },
        {
          japanese: "きのう べんきょうしました。",
          vietnamese: "Tôi đã học bài hôm qua.",
          english: "I studied yesterday.",
        },
        {
          japanese: "きのう べんきょうしませんでした。",
          vietnamese: "Tôi không học bài hôm qua.",
          english: "I didn't study yesterday.",
        },
      ],
    },
    {
      type: "note",
      text: "When the subject is clear, the subject noun can be omitted. Verbs always come at the end of the clause in Japanese.",
      vietnamese:
        "主語が明確な場合、主語の名詞は省略できます。動詞は常に句の最後に来ます。",
    },
    {
      type: "title",
      text: "２. Danh từ (thời gian) + に + Động từ - Time Particle",
    },
    {
      type: "explanation",
      text: "The particle に indicates a specific time when an action occurs. Pattern: N は V に ～。 Do not use に with relative time words like きょう, あした, きのう.",
      vietnamese:
        "じょし「に」は、アクションが発生する具体的な時間を示します。「は」「V」「に」を含みます。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "けさ（あなたは）なんじに おきましたか。",
          vietnamese: "Sáng nay bạn thức dậy lúc mấy giờ?",
          english: "What time did you wake up this morning?",
        },
        {
          japanese: "こんばん（わたしは）どこへ いきますか。",
          vietnamese: "Tối nay (tôi) sẽ đi đâu?",
          english: "Where will I go tonight?",
        },
        {
          japanese: "きのう（あなたは）べんきょうしましたか。",
          vietnamese: "Hôm qua (bạn) có học bài không?",
          english: "Did you study yesterday?",
        },
        {
          japanese: "はい、わたしは べんきょうしました。",
          vietnamese: "Có, tôi đã học bài.",
          english: "Yes, I studied.",
        },
      ],
    },
    {
      type: "note",
      text: "Do NOT use に with: きょう (today), あした (tomorrow), きのう (yesterday), まいにち (every day), まいあさ (every morning), せんしゅう (last week), こんしゅう (this week), らいしゅう (next week), まいしゅう (every week), まいげつ (every month), ことし (this year), らいねん (next year), せんねん (last year)",
      vietnamese:
        "に を使わない時間表現：きょう、あした、きのう、まいにち、まいあさ、せんしゅう、こんしゅう、らいしゅう、まいしゅう、まいげつ、ことし、らいねん、せんねん",
    },
    {
      type: "title",
      text: "３. N から N まで - Duration or Range",
    },
    {
      type: "explanation",
      text: "から indicates the starting point and まで indicates the endpoint. Pattern: N1 から N2 まで です。",
      vietnamese:
        "から は開始点、まで は終了点を示します。「N1 から N2 まで」という形式で使われます。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "9じから 5じまで はたらきます。",
          vietnamese: "Tôi làm việc từ 9 giờ sáng đến 5 giờ chiều.",
          english: "I work from 9 AM to 5 PM.",
        },
        {
          japanese: "10じから べんきょうします。",
          vietnamese: "Tôi sẽ học bài từ 10 giờ.",
          english: "I will start studying from 10 AM.",
        },
      ],
    },
    {
      type: "title",
      text: "４. N と N - Conjunction Particle",
    },
    {
      type: "explanation",
      text: "と is used to connect two nouns or to indicate companionship. Pattern: N1 と N2 で V。",
      vietnamese:
        "と は二つの名詞を接続するために使用され、友情を示します。「N1 と N2 で V」という形式で使われます。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "こうえん で ともだち と はなします。",
          vietnamese: "Tôi nói chuyện với bạn ở công viên.",
          english: "I talk with my friend in the park.",
        },
        {
          japanese: "すしと てんぷら を たべます。",
          vietnamese: "Tôi ăn sushi và tempura.",
          english: "I eat sushi and tempura.",
        },
      ],
    },
    {
      type: "title",
      text: "５. ね - Particle for Confirmation",
    },
    {
      type: "explanation",
      text: "The particle ね is placed at the end of a sentence to express empathy, confirmation, or to seek agreement from the listener.",
      vietnamese:
        "じょし「ね」は、共感、確認、または聞き手からの同意を求めるために文の最後に付けられます。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "きょう は いい てんき ですね。",
          vietnamese: "Hôm nay thời tiết đẹp phải không?",
          english: "It's nice weather today, isn't it?",
        },
        {
          japanese: "あなたも にほんご を べんきょう していますね。",
          vietnamese: "Bạn cũng đang học tiếng Nhật, phải không?",
          english: "You are also studying Japanese, aren't you?",
        },
        {
          japanese: "これは こわいですね。",
          vietnamese: "Cái này đáng sợ phải không?",
          english: "This is scary, isn't it?",
        },
      ],
    },
    {
      type: "title",
      text: "６. Common Patterns Summary",
    },
    {
      type: "note",
      text: "Pattern 1: N + は + V（ます/ません/ました/ませんでした）| Pattern 2: N + は + V + に （時間） | Pattern 3: N1 + から + N2 + まで + V | Pattern 4: N1 + と + N2 | Pattern 5: V + ね",
      vietnamese:
        "パターン1：N + は + V（ます/ません/ました/ませんでした）| パターン2：N + は + に（時間）+ V | パターン3：N1 + から + N2 + まで + V | パターン4：N1 + と + N2 | パターン5：V + ね",
    },
    {
      type: "practice",
      items: [
        {
          meaning: "Did you study yesterday?",
          usage: "きのう + は + べんきょう + しました + か",
        },
        {
          meaning: "I work from 8 AM to 5 PM.",
          usage: "8じ + から + 5じ + まで + はたらきます",
        },
        {
          meaning: "I talk with my friend.",
          usage: "ともだち + と + はなします",
        },
        {
          meaning: "What time did you wake up?",
          usage: "なんじ + に + おきました + か",
        },
      ],
    },
  ],
};
