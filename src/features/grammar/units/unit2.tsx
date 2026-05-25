import { GrammarLesson } from "./types";

export const unit2: GrammarLesson = {
  id: "unit2",
  title: "Unit 2: Đại từ chỉ định - Đây / Đó / Kia",
  content: [
    {
      type: "title",
      text: "1. これ / それ / あれ",
    },
    {
      type: "explanation",
      text: "これ: near speaker",
      vietnamese: "Structure: この + N は ___ です。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "これは \u3000ボールペンです。",
          vietnamese: "(これは ボールペンです。)",
          english: "This is a pen.",
        },
      ],
    },
    {
      type: "explanation",
      text: "それ: near listener",
      vietnamese: "Structure: その + N は ___ です。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "それは \u3000ほんです。",
          vietnamese: "(それは ほんです。)",
          english: "That is a book.",
        },
      ],
    },
    {
      type: "explanation",
      text: "あれ: far from both",
      vietnamese: "Structure: あの + N は ___ です。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "あれは\u3000くるまです。",
          vietnamese: "(あれは くるまです。)",
          english: "That over there is a car.",
        },
      ],
    },
    {
      type: "example",
      examples: [
        {
          japanese: "これ / それ / あれは \u3000なんですか。",
          vietnamese: "Cái này / đó / kia là gì?",
          english: "What is this / that / that over there?",
        },
      ],
    },
    {
      type: "title",
      text: "2. この / その / あの",
    },
    {
      type: "explanation",
      text: "この: this (near speaker)",
      vietnamese: "Structure: この + N は ___ です。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "この \u3000ほんは \u3000あなたのですか。",
          vietnamese: "(この ほんは あなたのですか。)",
          english: "Is this book yours?",
        },
      ],
    },
    {
      type: "explanation",
      text: "その: that (near listener)",
      vietnamese: "Structure: その + N は ___ です。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "その \u3000ノートは \u3000だれのですか。",
          vietnamese: "(その ノートは だれのですか。)",
          english: "Whose notebook is that?",
        },
      ],
    },
    {
      type: "explanation",
      text: "あの: that over there (far from both)",
      vietnamese: "Structure: あの + N は ___ です",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "あの \u3000カードは \u3000どなたのですか。",
          vietnamese: "(あの カードは どなたのですか。)",
          english: "Whose card is that over there?",
        },
      ],
    },
    {
      type: "title",
      text: "Example Dialogue",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "あの \u3000とけいは \u3000せんせいのですか。",
          english: "Is that clock the teacher's?",
        },
        {
          japanese: "はい、\u3000せんせいのです。",
          english: "Yes, it is the teacher's.",
        },
        {
          japanese: "いいえ、\u3000せんせいのじゃ \u3000ありません。",
          english: "No, it is not the teacher's.",
        },
      ],
    },
    {
      type: "note",
      vietnamese:
        " Trong câu danh từ, để trả lời (+) cho câu hỏi đúng/sai → dùng そう có thể trả lời: はい、そうです。 Trường hợp trả lời (-) → thì dùng そうじゃ ありません không thông dụng. Thay vào đó người ta thường sử dụng ちがいます (sai / không phải) hoặc biết kết quả đúng để trả lời.",
    },
    {
      type: "title",
      text: "3. Either/Or Questions",
    },
    {
      type: "explanation",
      text: "Alternative question form",
      vietnamese: "Structure: ___ は ___ ですか、___ ですか。",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "それは \u3000ボールペンですか、\u3000シャープペンシルですか。",
          english: "Is that a ballpoint pen or a mechanical pencil?",
        },
        {
          japanese: "ボールペンです。",
          english: "It's a ballpoint pen.",
        },
      ],
    },
    {
      type: "note",
      vietnamese:
        "Là mẫu câu nghi vấn cấp xếp từ 2 câu nghi vấn đơn liền và bắt buộc nghe lựa chọn – khi trả lời không dùng はい / いいえ mà nói nguyên câu đã lựa chọn.",
    },
    {
      type: "title",
      text: "4. N₁ の N₂",
    },
    {
      type: "explanation",
      text: "Possessive and explanatory particle (N₁ denotes the owner (of). N₂ denotes the explanation (of...).)",
      vietnamese: "Structure: ___ は \u3000N₁の \u3000N₂です。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "これは \u3000コンピューターの \u3000ほんです。",
          vietnamese: "Đây là quyển sách về máy vi tính.",
          english: "This is a book about computers.",
        },
        {
          japanese: "これは \u3000わたしの \u3000ほんです。",
          vietnamese: "Đây là cuốn sách của tôi.",
          english: "This is my book.",
        },
      ],
    },
    {
      type: "explanation",
      vietnamese:
        'の dùng thay cho danh từ (khi danh từ đã nói trước) "của ai đó / cái của ai đó". の dùng cho vật, không dùng cho người.',
    },
    {
      type: "example",
      examples: [
        {
          japanese: "あれは \u3000だれの \u3000かばんですか。",
          vietnamese: "Kia là cái cặp của ai?",
          english: "Whose bag is that over there?",
        },
        {
          japanese: "... さとうさんのです。",
          vietnamese: "... Của anh / chị Sato.",
          english: "... It's Mr./Ms. Sato's.",
        },
        {
          japanese: "この \u3000かばんは \u3000あなたのですか。",
          vietnamese: "Cái cặp này phải của bạn không?",
          english: "Is this bag yours?",
        },
        {
          japanese: "... いいえ、\u3000わたしのじゃ \u3000ありません。",
          vietnamese: "... Không, không phải của tôi.",
          english: "... No, it's not mine.",
        },
        {
          japanese: "ミラーさんは \u3000IMCの \u3000しゃいんですか。",
          vietnamese: "Anh Miller có phải nhân viên công ty IMC không?",
          english: "Is Mr. Miller an employee of IMC?",
        },
        {
          japanese: "はい、\u3000IMCの \u3000しゃいんです。",
          vietnamese: "Vâng, anh ấy là nhân viên công ty IMC.",
          english: "Yes, he is an employee of IMC.",
        },
      ],
    },
    {
      type: "note",
      vietnamese: "(Cách viết sai) → × はい、IMCのです。",
    },
    {
      type: "title",
      text: "5. お ~",
    },
    {
      type: "explanation",
      text: "Polite prefix",
      vietnamese:
        "お ~ : tiền tố lịch sự trong tiếng Nhật. Đặt trước danh / động từ để biểu lịch sự, tôn trọng và nhẹ nhàng khi nói.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "おみやげ",
          vietnamese: "quà",
          english: "souvenir",
        },
        {
          japanese: "おさけ",
          vietnamese: "rượu",
          english: "alcohol",
        },
        {
          japanese: "おかね",
          vietnamese: "tiền",
          english: "money",
        },
      ],
    },
    {
      type: "title",
      text: "6. そうですか",
    },
    {
      type: "explanation",
      vietnamese:
        "Khi người nói tiếp nhận thông tin mới và để bày tỏ là đã hiểu – phát âm giọng thấp.",
      text: "Used when acknowledging new information - low intonation.",
    },
  ],
};
