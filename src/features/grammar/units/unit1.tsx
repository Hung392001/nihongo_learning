import { GrammarLesson } from "./types";

export const unit1: GrammarLesson = {
  id: "unit1",
  title: "Unit 1: Thì / Là",
  content: [
    {
      type: "title",
      vietnamese: "Thể & Cấu trúc",
      english: "Form & Structure",
    },
    {
      type: "title",
      vietnamese: "1. Khẳng định (+)",
      english: "1. Affirmative (+)",
    },
    {
      type: "explanation",
      english: "Affirmative form",
      vietnamese: "Dạng khẳng định",
      structure: "N₁は \u3000N₂です。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "わたしは \u3000がくせいです。",
          vietnamese: "Tôi là học sinh.",
          english: "I am a student.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "2. Phủ định (-)",
      english: "2. Negative (-)",
    },
    {
      type: "explanation",
      english: "Negative form",
      vietnamese: "",
      structure: "N₁は \u3000N₂じゃ \u3000ありません。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "わたしは \u3000がくせいじゃ \u3000ありません。",
          vietnamese: "Tôi không phải là học sinh.",
          english: "I am not a student.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "3. Nghi vấn (?)",
      english: "3. Question (?)",
    },
    {
      type: "explanation",
      english: "Question form",
      vietnamese: "Dạng nghi vấn",
      structure: "N₁は \u3000N₂ですか。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "あなたは \u3000がくせいですか。",
          vietnamese: "Bạn có phải là học sinh không?",
          english: "Are you a student?",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "Giải thích chi tiết",
      english: "Detailed Explanation",
    },
    {
      type: "title",
      vietnamese: "Trợ từ は",
      english: "Particle は (wa)",
    },
    {
      type: "explanation",
      english:
        "It indicates that the noun preceding it is the subject of the sentence, and that the information following it is descriptive.",
      vietnamese:
        "Biểu thị danh từ trước nó là chủ đề của câu văn, và sau nó là những thông tin cần thuật vì ngữ.",
    },
    {
      type: "note",
      english: "Pronunciation: Particle は is read as わ",
      vietnamese: "Phát âm: Trợ từ は đọc là わ",
    },
    {
      type: "title",
      vietnamese: "です",
      english: "です (desu)",
    },
    {
      type: "explanation",
      english:
        "Function: N₂ combines with です to form the predicate.<br/> Meaning: Expresses judgment, affirmation + polite attitude towards the listener.",
      vietnamese:
        "Chức năng: N₂ đi cùng です để tạo thành vị ngữ.<br/> Ý nghĩa: Biểu thị ý nghĩa phán đoán, khẳng định + thái độ lịch sự đối với người nghe.",
    },
    {
      type: "title",
      vietnamese: "じゃ ありません",
      english: "じゃ ありません (ja arimasen)",
    },
    {
      type: "explanation",
      english:
        "Function: This is the negative form of です. Usage: Used in daily conversation.",
      vietnamese:
        "Chức năng: Là thể phủ định của です. Dùng trong: Nói thoại hằng ngày.",
    },
    {
      type: "title",
      vietnamese: "Trợ từ か",
      english: "Particle か (ka)",
    },
    {
      type: "explanation",
      english:
        "Function: Expresses uncertainty or question. Usage: The end of the sentence is read in a higher tone. Add か at the end of the sentence without changing the word order. Used to confirm whether the content is correct or not.",
      vietnamese:
        "Chức năng: Biểu thị sự không chắc chắn, nghi vấn. Cách dùng: Phần cuối câu được đọc với giọng cao hơn. Thêm か ở cuối câu mà không thay đổi trật tự từ. Dùng để xác nhận nội dung là đúng hay sai.",
    },
    {
      type: "note",
      english:
        "Answer: Correct: はい | Incorrect: いいえ. Question: Replace the interrogative word in the position of the content to ask + add か at the end of the sentence. Word order does not change.",
      vietnamese:
        "Trả lời: Đúng: はい | Sai: いいえ. Cách hỏi: Thay nghi vấn từ vào vị trí của nội dung muốn hỏi + thêm か vào cuối câu. Trật tự từ không thay đổi.",
    },
    {
      type: "title",
      vietnamese: "Ví dụ mẫu",
      english: "Example Questions",
    },
    {
      type: "explanation",
      text: "あなたは がくせいですか。",
      english: "Are you a student?",
      vietnamese: "Bạn có phải là sinh viên không?",
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
      vietnamese: "2. Của",
      english: "2. Possession",
    },
    {
      type: "explanation",
      english: "Possession pattern",
      vietnamese:
        "Trợ từ の nối N₁ (đứng trước) để bổ nghĩa cho N₂ (đứng sau). N₁ biểu thị nơi sở thuộc của N₂.",
      structure: "N₁ の N₂.",
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
      vietnamese: "3. Cũng",
      english: "3. Also/Too",
    },
    {
      type: "explanation",
      english: "Also/too particle",
      vietnamese:
        "Trợ từ も dùng trình bày một nội dung tương tự ở câu văn trước.",
      structure: "N も.",
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
      vietnamese: "Đối thoại ví dụ",
      english: "Example Dialogue",
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
      vietnamese: "4. さん - Danh xưng kính trọng",
      english: "4. さん - Honorific Title",
    },
    {
      type: "explanation",
      english:
        "Usage: さん is added after a name or occupation to express respect. Never use さん with your own name.",
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
      vietnamese: "Phụ chú thêm",
      english: "Additional Notes",
    },
    {
      type: "explanation",
      english:
        "Addressing others: Use family name and title to address the listener (2nd person) → shows politeness.",
      vietnamese:
        "Cách xưng hô: Dùng họ tên để xưng hô với người nghe (người thứ 2) → thể hiện tính lịch sự.",
    },
    {
      type: "note",
      english:
        "When to use あなた: Avoid using if you already know the person's name. Instead: Add さん after the name. Exception: あなた is only used in very intimate relationships (spouse, lover...). Other cases may give a bad impression to the other person.",
      vietnamese:
        "Khi nào dùng あなた: Hạn chế dùng nếu đã biết tên/họ của người đó. Thay vào đó: Thêm さん sau tên. Ngoại lệ: あなた chỉ dùng trong những mối quan hệ cực kỳ thân mật (vợ/chồng, người yêu...). Các trường hợp khác có thể gây ấn tượng không tốt cho đối phương.",
    },
  ],
};
