import { GrammarLesson } from "./types";

export const unit14: GrammarLesson = {
  id: "unit14",
  title: "Unit 14: Te-form and Related Expressions",
  content: [
    {
      type: "explanation",
      text: "In Unit 14, you will learn the Japanese て-form, polite requests, progressive tense, offers of help, and important particle usage.",
      vietnamese:
        "ユニット１４では、日本語の「て形」、丁寧な依頼、進行形、申し出表現、助詞の使い方を学びます。",
    },

    {
      type: "title",
      text: "１. Verb Groups and Te-form Conjugation",
    },

    {
      type: "explanation",
      text: "Japanese verbs are divided into three groups. The conjugation into て-form depends on the verb group and ending.",
      vietnamese:
        "日本語の動詞は３つのグループに分かれています。て形への変化は動詞の種類によって異なります。",
    },

    {
      type: "note",
      text: "Group I: います/ちます/ります → って | みます/びます/にます → んで | きます → いて | ぎます → いで | します → して | Exception: いきます → いって",
      vietnamese:
        "グループI：います・ちます・ります → って｜みます・びます・にます → んで｜きます → いて｜ぎます → いで｜します → して｜例外：いきます → いって",
    },

    {
      type: "example",
      examples: [
        {
          japanese: "かいます → かって",
          vietnamese: "Mua → hãy mua / mua rồi",
          english: "buy → buy (te-form)",
        },
        {
          japanese: "よみます → よんで",
          vietnamese: "Đọc → hãy đọc / đọc rồi",
          english: "read → read (te-form)",
        },
        {
          japanese: "ききます → きいて",
          vietnamese: "Nghe → hãy nghe",
          english: "listen → listen (te-form)",
        },
        {
          japanese: "いそぎます → いそいで",
          vietnamese: "Vội → hãy vội",
          english: "hurry → hurry (te-form)",
        },
        {
          japanese: "はなします → はなして",
          vietnamese: "Nói → hãy nói",
          english: "speak → speak (te-form)",
        },
        {
          japanese: "いきます → いって",
          vietnamese: "Đi → hãy đi",
          english: "go → go (te-form)",
        },
      ],
    },

    {
      type: "note",
      text: "Group II: Remove ます and add て | Group III: します → して, きます → きて",
      vietnamese:
        "グループII：ますを取って「て」を付ける｜グループIII：します → して、きます → きて",
    },

    {
      type: "example",
      examples: [
        {
          japanese: "たべます → たべて",
          vietnamese: "Ăn → hãy ăn",
          english: "eat → eat (te-form)",
        },
        {
          japanese: "ねます → ねて",
          vietnamese: "Ngủ → hãy ngủ",
          english: "sleep → sleep (te-form)",
        },
        {
          japanese: "みます → みて",
          vietnamese: "Xem → hãy xem",
          english: "watch → watch (te-form)",
        },
        {
          japanese: "べんきょうします → べんきょうして",
          vietnamese: "Học → hãy học",
          english: "study → study (te-form)",
        },
        {
          japanese: "きます → きて",
          vietnamese: "Đến → hãy đến",
          english: "come → come (te-form)",
        },
      ],
    },

    {
      type: "title",
      text: "２. ～てください - Polite Requests",
    },

    {
      type: "explanation",
      text: "～てください is used to politely request or instruct someone to do something.",
      vietnamese:
        "「〜てください」は、相手に丁寧に依頼や指示をする時に使います。",
    },

    {
      type: "note",
      text: "Structure: V（て-form） + ください",
      vietnamese: "文型：V（て形）+ ください",
    },

    {
      type: "example",
      examples: [
        {
          japanese: "すみませんが、ボールペンで かいて ください。",
          vietnamese: "Xin lỗi, vui lòng viết bằng bút bi.",
          english: "Excuse me, please write with a ballpoint pen.",
        },
        {
          japanese: "ここに じゅうしょと なまえを かいて ください。",
          vietnamese: "Vui lòng viết địa chỉ và tên vào đây.",
          english: "Please write your address and name here.",
        },
        {
          japanese: "まって ください。",
          vietnamese: "Xin hãy đợi.",
          english: "Please wait.",
        },
      ],
    },

    {
      type: "title",
      text: "３. ～ています - Present Progressive",
    },

    {
      type: "explanation",
      text: "～ています is used to describe actions currently in progress.",
      vietnamese: "「〜ています」は、今進行中の動作を表します。",
    },

    {
      type: "note",
      text: "Structure: V（て-form） + います",
      vietnamese: "文型：V（て形）+ います",
    },

    {
      type: "example",
      examples: [
        {
          japanese: "いま にほんごを べんきょうして います。",
          vietnamese: "Bây giờ tôi đang học tiếng Nhật.",
          english: "I am studying Japanese now.",
        },
        {
          japanese: "ミラーさんは いま でんわを かけて います。",
          vietnamese: "Anh Miller đang gọi điện thoại.",
          english: "Mr. Miller is making a phone call now.",
        },
        {
          japanese: "こどもが あそんで います。",
          vietnamese: "Bọn trẻ đang chơi.",
          english: "The children are playing.",
        },
      ],
    },

    {
      type: "title",
      text: "４. ～ましょうか - Offering Help",
    },

    {
      type: "explanation",
      text: "～ましょうか is used when offering to do something for another person.",
      vietnamese:
        "「〜ましょうか」は、相手のために何かを申し出る時に使います。",
    },

    {
      type: "note",
      text: "Structure: V（ます-stem） + ましょうか",
      vietnamese: "文型：V（ます形語幹）+ ましょうか",
    },

    {
      type: "example",
      examples: [
        {
          japanese: "あついですね。まどを あけましょうか。",
          vietnamese: "Nóng nhỉ. Tôi mở cửa sổ giúp nhé?",
          english: "It is hot, isn’t it? Shall I open the window?",
        },
        {
          japanese: "にもつを もちましょうか。",
          vietnamese: "Tôi mang hành lý giúp nhé?",
          english: "Shall I carry your luggage?",
        },
        {
          japanese: "ええ、おねがいします。",
          vietnamese: "Vâng, nhờ bạn.",
          english: "Yes, please.",
        },
      ],
    },

    {
      type: "title",
      text: "５. Particle が for Natural Phenomena",
    },

    {
      type: "explanation",
      text: "When describing natural phenomena or objective states, が is often used instead of は.",
      vietnamese:
        "自然現象や客観的な状態を説明する時、「は」ではなく「が」を使うことがあります。",
    },

    {
      type: "example",
      examples: [
        {
          japanese: "あめが ふって います。",
          vietnamese: "Trời đang mưa.",
          english: "It is raining.",
        },
        {
          japanese: "ゆきが ふって います。",
          vietnamese: "Trời đang có tuyết.",
          english: "It is snowing.",
        },
        {
          japanese: "かぜが つよいです。",
          vietnamese: "Gió mạnh.",
          english: "The wind is strong.",
        },
      ],
    },

    {
      type: "title",
      text: "６. すみませんが vs しつれいですが",
    },

    {
      type: "explanation",
      text: "すみませんが is used before requests or to get attention. しつれいですが is used before asking personal or sensitive information.",
      vietnamese:
        "「すみませんが」は依頼や呼びかけの前に使い、「しつれいですが」は個人的な質問の前に使います。",
    },

    {
      type: "example",
      examples: [
        {
          japanese: "すみませんが、えんぴつを かして ください。",
          vietnamese: "Xin lỗi, cho tôi mượn bút chì được không?",
          english: "Excuse me, please lend me a pencil.",
        },
        {
          japanese: "しつれいですが、おなまえは？",
          vietnamese: "Xin thất lễ, tên của bạn là gì?",
          english: "Excuse me, but what is your name?",
        },
        {
          japanese: "しつれいですが、おいくつですか。",
          vietnamese: "Xin thất lễ, bạn bao nhiêu tuổi?",
          english: "Excuse me, but how old are you?",
        },
      ],
    },

    {
      type: "title",
      text: "７. Common Patterns Summary",
    },

    {
      type: "note",
      text: "Pattern 1: V（て-form）+ ください | Pattern 2: V（て-form）+ います | Pattern 3: V（ます-stem）+ ましょうか | Pattern 4: Natural phenomenon + が | Pattern 5: すみませんが / しつれいですが",
      vietnamese:
        "パターン1：V（て形）+ ください｜パターン2：V（て形）+ います｜パターン3：V（ます形語幹）+ ましょうか｜パターン4：自然現象 + が｜パターン5：すみませんが・しつれいですが",
    },

    {
      type: "practice",
      items: [
        {
          meaning: "Please read this book.",
          usage: "このほんを よんで ください",
        },
        {
          meaning: "I am eating lunch now.",
          usage: "いま ひるごはんを たべて います",
        },
        {
          meaning: "Shall I help you?",
          usage: "てつだいましょうか",
        },
        {
          meaning: "It is raining now.",
          usage: "あめが ふって います",
        },
        {
          meaning: "Excuse me, may I ask your address?",
          usage: "しつれいですが、じゅうしょは？",
        },
      ],
    },
  ],
};
