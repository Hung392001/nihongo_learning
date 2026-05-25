import { GrammarLesson } from "./types";

export const unit1: GrammarLesson = {
  id: "unit1",
  title: "Unit 1: Thì / Là",
  content: [
    {
      type: "title",
      text: "Thể & Cấu trúc",
    },
    {
      type: "title",
      text: "1. Khẳng định (+)",
    },
    {
      type: "explanation",
      text: "Affirmative form",
      vietnamese: "Structure: N₁ は N₂ です。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "わたしは がくせいです。",
          vietnamese: "Tôi là học sinh.",
          english: "I am a student.",
        },
      ],
    },
    {
      type: "title",
      text: "2. Phủ định (-)",
    },
    {
      type: "explanation",
      text: "Negative form",
      vietnamese: "Structure: N₁ は N₂ じゃ ありません。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "わたしは がくせいじゃ ありません。",
          vietnamese: "Tôi không phải là học sinh.",
          english: "I am not a student.",
        },
      ],
    },
    {
      type: "title",
      text: "3. Nghi vấn (?)",
    },
    {
      type: "explanation",
      text: "Question form",
      vietnamese: "Structure: N₁ は N₂ ですか。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "あなたは がくせいですか。",
          vietnamese: "Bạn có phải là học sinh không?",
          english: "Are you a student?",
        },
      ],
    },
    {
      type: "title",
      text: "Giải thích chi tiết",
    },
    {
      type: "title",
      text: "Trợ từ は",
    },
    {
      type: "explanation",
      vietnamese:
        "Chức năng: Biểu thị danh từ trước nó là chủ đề của câu văn, và sau nó là những thông tin cần thuật vì ngữ.",
    },
    {
      type: "note",
      vietnamese: "Phát âm: Trợ từ は đọc là わ",
    },
    {
      type: "title",
      text: "です",
    },
    {
      type: "explanation",
      vietnamese:
        "Chức năng: N₂ đi cùng です để tạo thành vị ngữ. Ý nghĩa: Biểu thị ý nghĩa phán đoán, khẳng định + thái độ lịch sự đối với người nghe.",
    },
    {
      type: "title",
      text: "じゃ ありません",
    },
    {
      type: "explanation",
      vietnamese:
        "Chức năng: Là thể phủ định của です. Dùng trong: Nói thoại hằng ngày.",
    },
    {
      type: "title",
      text: "Trợ từ か",
    },
    {
      type: "explanation",
      vietnamese:
        "Chức năng: Biểu thị sự không chắc chắn, nghi vấn. Cách dùng: Phần cuối câu được đọc với giọng cao hơn. Thêm か ở cuối câu mà không thay đổi trật tự từ. Dùng để xác nhận nội dung là đúng hay sai.",
    },
    {
      type: "note",
      vietnamese:
        "Trả lời: Đúng: はい | Sai: いいえ. Cách hỏi: Thay nghi vấn từ vào vị trí của nội dung muốn hỏi + thêm か vào cuối câu. Trật tự từ không thay đổi.",
    },
    {
      type: "title",
      text: "Ví dụ mẫu",
    },
    {
      type: "title",
      text: "Câu hỏi: Bạn có phải là học sinh không?",
    },
    {
      type: "explanation",
      text: "Question and answers",
      vietnamese: "Câu hỏi: あなたは がくせいですか。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "はい、わたしは がくせいです。",
          vietnamese: "Có: Có, tôi là học sinh.",
          english: "Yes, I am a student.",
        },
        {
          japanese: "いいえ、わたしは がくせいじゃ ありません。",
          vietnamese: "Không: Không, tôi không phải là học sinh.",
          english: "No, I am not a student.",
        },
      ],
    },
    {
      type: "title",
      text: "2. Của",
    },
    {
      type: "explanation",
      text: "Possession pattern",
      vietnamese:
        "Structure: N₁ の N₂. Trợ từ の nối N₁ (đứng trước) để bổ nghĩa cho N₂ (đứng sau). N₁ biểu thị nơi sở thuộc của N₂.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "わたしは UNOの しゃいんです。",
          vietnamese: "Tôi là nhân viên công ty UNO.",
          english: "I am an employee of UNO company.",
        },
        {
          japanese: "わたしは ゆうびんきょくの がくせいです。",
          vietnamese: "Tôi là học sinh của bưu điện.",
          english: "I am a student at the post office.",
        },
      ],
    },
    {
      type: "title",
      text: "3. Cũng",
    },
    {
      type: "explanation",
      text: "Also/too particle",
      vietnamese:
        "Structure: N も. Trợ từ も dùng trình bày một nội dung tương tự ở câu văn trước.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "グエンさんも がくせいです。",
          vietnamese: "Nguyễn cũng là học sinh.",
          english: "Nguyen is also a student.",
        },
      ],
    },
    {
      type: "title",
      text: "Đối thoại ví dụ",
    },
    {
      type: "explanation",
      vietnamese: "A: Tôi là bác sĩ.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "A: わたしは いしゃです。",
          vietnamese: "A: Tôi là bác sĩ.",
          english: "A: I am a doctor.",
        },
        {
          japanese: "B: あなたも いしゃですか。",
          vietnamese: "B: Bạn cũng là bác sĩ phải không?",
          english: "B: Are you also a doctor?",
        },
        {
          japanese: "A: いいえ、わたしは いしゃじゃ ありません。",
          vietnamese: "A: Không, tôi không phải là bác sĩ.",
          english: "A: No, I am not a doctor.",
        },
      ],
    },
    {
      type: "title",
      text: "4. さん - Danh xưng kính trọng",
    },
    {
      type: "explanation",
      vietnamese:
        "Cách dùng: さん được thêm sau tên hoặc nghề nghiệp để thể hiện sự tôn trọng. Không bao giờ dùng さん với tên của chính mình.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "たなかさん",
          vietnamese: "Anh Tanaka / Chị Tanaka",
          english: "Mr./Ms. Tanaka",
        },
        {
          japanese: "せんせいさん",
          vietnamese: "Thầy / Cô giáo",
          english: "Teacher (respectful)",
        },
        {
          japanese: "いしゃさん",
          vietnamese: "Bác sĩ",
          english: "Doctor (respectful)",
        },
      ],
    },
    {
      type: "title",
      text: "Phụ chú thêm",
    },
    {
      type: "explanation",
      vietnamese:
        "Cách xưng hô: Dùng họ tên để xưng hô với người nghe (người thứ 2) → thể hiện tính lịch sự.",
    },
    {
      type: "note",
      vietnamese:
        "Khi nào dùng あなた: Hạn chế dùng nếu đã biết tên/họ của người đó. Thay vào đó: Thêm さん sau tên. Ngoại lệ: あなた chỉ dùng trong những mối quan hệ cực kỳ thân mật (vợ/chồng, người yêu...). Các trường hợp khác có thể gây ấn tượng không tốt cho đối phương.",
    },
    {
      type: "practice",
      items: [
        {
          meaning: "I am a bank employee.",
          usage: "ぎんこういん（銀行員）+ です",
        },
        {
          meaning: "Sato is also a student.",
          usage: "さとうさん + も + がくせい + です",
        },
        {
          meaning: "This is my company's phone.",
          usage: "わたしの かいしゃの でんわ",
        },
        {
          meaning: "What is your profession?",
          usage: "あなたは ～ですか？",
        },
      ],
    },
  ],
};
