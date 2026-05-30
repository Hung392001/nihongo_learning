import { GrammarLesson } from "./types";

export const unit7: GrammarLesson = {
  id: "unit7",
  title: "Unit 7: Giving & Receiving - で・に・から・もう",
  content: [
    {
      type: "title",
      vietnamese: "1. Trợ từ で - Công cụ / Phương tiện thực hiện hành động",
      english: "1. Particle で - Instrument/Means for Actions",
    },
    {
      type: "explanation",
      english:
        "The particle で indicates the tool, instrument, or method by which an action is performed. This shows how the action is carried out.",
      vietnamese:
        "Trợ từ で biểu thị công cụ, phương tiện hay cách thức để tiến hành một hành động. Chỉ cách thức thực hiện hành động.",
      structure: "N<sub>tool/method</sub>で \u3000V",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "スプーンで \u3000たべます。",
          vietnamese: "Tôi ăn cơm bằng muỗng.",
          english: "I eat with a spoon.",
        },
        {
          japanese: "ペンで \u3000てがみを \u3000かきます。",
          vietnamese: "Tôi viết thư bằng bút.",
          english: "I write a letter with a pen.",
        },
        {
          japanese: "コンピューターで \u3000しごとを \u3000します。",
          vietnamese: "Tôi làm việc bằng máy vi tính.",
          english: "I work with a computer.",
        },
      ],
    },
    {
      type: "title",
      vietnamese:
        "2. 'Từ / Câu' は ～ごで なんですか - Hỏi cách nói bằng ngôn ngữ khác",
      english:
        "2. 'Word/Sentence' は [Language]ご で なんですか - Asking for Translations",
    },
    {
      type: "explanation",
      english:
        "This pattern is used to ask how a word or sentence is said in another language. The response typically gives the translation directly.",
      vietnamese:
        "Mẫu câu dùng để hỏi ý nghĩa của một từ/câu được nói như thế nào bằng ngôn ngữ khác. Câu trả lời thường là bản dịch trực tiếp.",
      structure: "[Word/Sentence]は \u3000[Language]ごで \u3000なんですか",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "「ありがとう」は \u3000えいごで \u3000なんですか。",
          vietnamese: "'Arigato' nói bằng tiếng Anh như thế nào?",
          english: "How do you say 'Arigato' in English?",
        },
        {
          japanese: "... 「Thank you」です。",
          vietnamese: "... Tiếng Anh nói là 'Thank you'.",
          english: "... It's 'Thank you' in English.",
        },
        {
          japanese: "「Good bye」は \u3000にほんごで \u3000なんですか。",
          vietnamese: "'Good bye' nói bằng tiếng Nhật như thế nào?",
          english: "How do you say 'Good bye' in Japanese?",
        },
        {
          japanese: "... 「さようなら」です。",
          vietnamese: "... Tiếng Nhật nói là 'さようなら'.",
          english: "... It's 'Sayonara' in Japanese.",
        },
      ],
    },
    {
      type: "title",
      vietnamese:
        "3. N₁ (người cho) に N₂ (người nhận) を あげます / かします / おしえます",
      english:
        "3. N1 (Giver) に N2 (Receiver) を あげます / かします / おしえます",
    },
    {
      type: "explanation",
      english:
        "These verbs express the action of providing objects or information to someone. The receiver of the action is marked with the particle に after N2. The object being given is marked with を.<br/><br/>Verbs:<br/>• あげます: to give (objects)<br/>• かします: to lend (objects)<br/>• おしえます: to teach (information/knowledge)<br/><br/>",
      vietnamese:
        "Những động từ trên biểu thị ý nghĩa cung cấp đồ vật, thông tin cho đối tượng nhận. Trợ từ に đứng sau danh từ chỉ đối tượng nhận (N2). Đối tượng được cho/tặng được đánh dấu bằng を.<br/><br/>Động từ:<br/>• あげます: tặng, cho (đồ vật)<br/>• かします: cho mượn (đồ vật)<br/>• おしえます: dạy, chỉ bảo (thông tin/kiến thức)<br/><br/>",
      structure:
        "N<sub>giver</sub>は \u3000N<sub>receiver</sub>に \u3000N<sub>object</sub>を \u3000V",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "わたしは \u3000ははに \u3000たんじょうびの \u3000プレゼントを \u3000あげます。",
          vietnamese: "Tôi tặng quà cho mẹ ngày sinh nhật.",
          english: "I give a birthday present to my mother.",
        },
        {
          japanese:
            "わたしは \u3000ともだちに \u3000にほんごを \u3000おしえます。",
          vietnamese: "Tôi dạy tiếng Nhật cho bạn tôi.",
          english: "I teach Japanese to my friend.",
        },
        {
          japanese:
            "わたしは \u3000まいにち \u3000かれに \u3000でんわを \u3000かけます。",
          vietnamese: "Tôi gọi điện thoại cho anh ấy mỗi ngày.",
          english: "I call him every day.",
        },
      ],
    },
    {
      type: "title",
      vietnamese:
        "4.  N₁ (người nhận) に/から N₂ (người cho) を もらいます / かります / ならいます",
      english:
        "4.  N₁ (Receiver) に/から N₂ (Giver) を もらいます / かります / ならいます",
    },
    {
      type: "explanation",
      english:
        "These verbs express the action of receiving objects or information from someone. The giver/source is marked with に or から after N2. The object being received is marked with を.<br/><br/>Verbs:<br/>• もらいます: to receive (objects)<br/>• かります: to borrow (objects)<br/>• ならいます: to learn (from someone)<br/><br/>",
      vietnamese:
        "Những động từ trên biểu thị ý nghĩa nhận đồ vật, thông tin từ đối tượng cho. Chúng ta thêm に hoặc から vào sau danh từ chỉ người cho (N2). Đối tượng được nhận được đánh dấu bằng を.<br/><br/>Động từ:<br/>• もらいます: nhận (đồ vật)<br/>• かります: mượn (đồ vật)<br/>• ならいます: học (từ ai đó)<br/><br/>",
      structure:
        "N<sub>receiver</sub>は \u3000N<sub>giver</sub>に/から \u3000N<sub>object</sub>を \u3000V",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "わたしは \u3000きょねんの \u3000クリスマスに \u3000ははに \u3000シャツを \u3000もらいました。",
          vietnamese:
            "Năm ngoái tôi đã nhận cái áo sơ mi từ mẹ vào ngày Giáng sinh.",
          english: "I received a shirt from my mother last Christmas.",
        },
        {
          japanese:
            "わたしは \u3000ちゅうごくじんの \u3000せんせいに \u3000ちゅうごくごを \u3000ならいます。",
          vietnamese: "Tôi học tiếng Trung Quốc từ giáo viên người Trung.",
          english: "I learn Chinese from a Chinese teacher.",
        },
        {
          japanese: "わたしは \u3000ははから \u3000はなを \u3000もらいました。",
          vietnamese: "Tôi nhận hoa từ bà tôi.",
          english: "I received flowers from my grandmother.",
        },
        {
          japanese: "ぎんこうから \u3000おかねを \u3000かりました。",
          vietnamese: "Tôi đã vay tiền từ ngân hàng.",
          english: "I borrowed money from the bank.",
        },
      ],
    },
    {
      type: "note",
      english:
        "Note: For organizations (bank, school, company, etc.), use から instead of に. For individuals, both に and から can be used.",
      vietnamese:
        "Lưu ý: Đối với tổ chức (ngân hàng, trường học, công ty,...) dùng từから thay cho に. Đối với cá nhân, có thể dùng cả に và から.",
    },
    {
      type: "title",
      vietnamese: "5. もう Động từ ました - Hành động đã hoàn thành",
      english: "5. もう + Verb (Past) - Already Done",
    },
    {
      type: "explanation",
      english:
        "The adverb もう (already) is used with past tense verbs to indicate that an action has been completed at the current time.",
      vietnamese:
        "Phó từ もう (đã rồi) dùng với động từ ở thể quá khứ để biểu thị một hành động đã kết thúc ở thời điểm hiện tại.",
      structure: "もう \u3000V<sub>past</sub>",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "もう にもつを おくりましたか。",
          vietnamese: "Bạn đã gửi đồ chưa?",
          english: "Have you sent the luggage yet?",
        },
        {
          japanese: "はい、[もう] おくりました。",
          vietnamese: "Vâng, [tôi đã] gửi rồi.",
          english: "Yes, I already sent it.",
        },
        {
          japanese: "いいえ、まだです。",
          vietnamese: "Không, chưa.",
          english: "No, not yet.",
        },
        {
          japanese: "いいえ、まだ おくっていません。",
          vietnamese: "Không, tôi vẫn chưa gửi.",
          english: "No, I haven't sent it yet.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "6. Thể lược bỏ trợ từ は - trong đối thoại",
      english: "6. Particle Omission - Implicit Meaning in Dialogue",
    },
    {
      type: "explanation",
      english:
        "In conversation, particles (especially は) can be omitted when the meaning is clear from the context or previous sentences. This makes the dialogue more natural and fluent. The listener can infer the subject from the conversation flow.",
      vietnamese:
        "Trong câu đối thoại, nếu biểu ý nghĩa thông qua quan hệ giữa câu trước và câu sau thì trợ từ (đặc biệt là は) có thể bị lược bỏ. Điều này làm cho đối thoại trở nên tự nhiên và trôi chảy hơn. Người nghe có thể suy ra chủ đề từ ngữ cảnh của cuộc hội thoại.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "この スプーン[は]、すてきですね。",
          vietnamese: "Cái muỗng này đẹp nhỉ!",
          english: "This spoon is pretty!",
        },
        {
          japanese: "コーヒー[を]、もう いっぱい いかがですか。",
          vietnamese: "Bạn dùng thêm cốc cà phê nhé!",
          english: "Would you like another cup of coffee?",
        },
      ],
    },
    {
      type: "note",
      english:
        "Note: In the examples above, the particles in brackets [ ] can be omitted in natural conversation.",
      vietnamese:
        "Lưu ý: Trong các ví dụ trên, các trợ từ trong ngoặc vuông [ ] có thể bị lược bỏ trong hội thoại tự nhiên.",
    },
  ],
};
