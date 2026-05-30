import { GrammarLesson } from "./types";

export const unit8: GrammarLesson = {
  id: "unit8",
  title: "Unit 8: Adjectives - Descriptions & Qualities",
  content: [
    {
      type: "title",
      vietnamese: "1. Tính từ",
      english: "1. Adjectives",
    },
    {
      type: "explanation",
      english:
        "Adjectives can be used as predicates in sentences which are used to express the state or characteristics of a noun. In Japanese, adjectives are divided into two categories: na-adjectives and i-adjectives, each with different conjugation rules.",
      vietnamese:
        "Tính từ có thể dùng làm vị ngữ trong câu được dùng để biểu thị trạng thái / đặc điểm của danh từ. Trong tiếng Nhật, tính từ được chia làm 2 loại: Tính từ đuôi な  và Tính từ đuôi い - và mỗi loại có cách biến đổi khác nhau.",
    },
    {
      type: "title",
      vietnamese: "2. Danh từ は Tính từ です - Mẫu câu tính từ",
      english: "2. Noun は Adjective です - Adjective Sentences",
    },
    {
      type: "explanation",
      english:
        "This is the basic affirmative form of adjective sentences at present time (not past), used to talk about current state, future, general truth, or habitual state. The sentence ends with です to show politeness to the listener.",
      vietnamese:
        "Câu tính từ ở thời hiện tại (+), không quá khứ (dùng nói về hiện tại, tương lai, sự thật chung / trạng thái thường xuyên) kết thúc bằng です. です thể hiện thái độ lịch sự đối với người nghe.",
      structure:
        "Nは \u3000けいようし-なです <br/> Nは \u3000けいようし-いです",
    },
    {
      type: "note",
      english: "けいようし means 'adjective'",
      vietnamese: "けいようし có nghĩa là 'tính từ'",
    },
    {
      type: "title",
      vietnamese: "A. Thể khẳng định đơn",
      english: "A. Simple Affirmative Form",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "きょうは \u3000ひまです。",
          vietnamese: "Hôm nay tôi rảnh.",
          english: "Today I am free",
        },
        {
          japanese: "その \u3000ほんは \u3000おもしろいです。",
          vietnamese: "Quyển sách đó thú vị.",
          english: "That book is interesting.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "B. Thể khẳng định CÓ NOUN 2",
      english: "B. Affirmative Form with Noun 2",
    },
    {
      type: "explanation",
      english:
        "When an adjective describes a noun, it directly modifies that noun. For na-adjectives, add な before the noun. For i-adjectives, use the adjective directly before the noun.",
      vietnamese:
        "Khi tính từ bổ nghĩa cho danh từ, tính từ đứng trước danh từ để bổ nghĩa trực tiếp. Đối với tính từ đuôi な, thêm な trước danh từ. Đối với tính từ đuôi い, chỉ cần đặt tính từ trước danh từ.",
      structure:
        "N₁は \u3000けいようし-な \u3000N₂です <br/> N₁は \u3000けいようし-い \u3000N₂です",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "ディエンビエンフーは \u3000しずかな \u3000まちです。",
          vietnamese: "Điện Biên Phủ là thành phố yên tĩnh.",
          english: "Dien Bien Phu is a quiet city.",
        },
        {
          japanese:
            "きのう わたしは \u3000スーパーで \u3000あおい \u3000シャツを \u3000 かいました。",
          vietnamese: "Hôm qua tôi đã mua chiếc áo sơ mi màu xanh ở siêu thị.",
          english: "Yesterday I bought a blue shirt at the supermarket.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "C. Thể phủ định",
      english: "C. Negative Form",
    },
    {
      type: "explanation",
      english:
        "For na-adjectives: replace です with じゃありません or ではありません. For i-adjectives: change the final い to くないです. Exception: いいです → よくないです (not いくないです)",
      vietnamese:
        "Đối với tính từ đuôi な: thay です bằng じゃありません hoặc ではありません. Đối với tính từ đuôi い: đổi đuôi い thành くないです. * Lưu ý: Thể phủ định của いいです → よくないです",
      structure:
        "Nは \u3000けいようし-な じゃ/では \u3000ありません <br/> Nは \u3000けいようし-い \u3000くないです",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "にほんごは \u3000むずかしく \u3000ないです。",
          vietnamese: "Tiếng Nhật tôi không khó.",
          english: "Japanese is not difficult.",
        },
        {
          japanese: "かわの \u3000みずは \u3000きれいじゃ \u3000ありません。",
          vietnamese: "Nước của suối thì không sạch.",
          english: "The water from the river is not clean.",
        },
        {
          japanese: "その \u3000ほんは \u3000おもしろく \u3000ないです。",
          vietnamese: "Quyển sách đó không thú vị.",
          english: "That book is not interesting.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "Câu nghi vấn với tính từ",
      english: "Interrogative Form with Adjectives",
    },
    {
      type: "explanation",
      english:
        "To form a question with adjectives, simply add か at the end of the sentence. Answer by repeating the adjective from the question, without using そうです or ちがいます.",
      vietnamese:
        "Cách tạo thể nghi vấn của câu tính từ cũng tương tự như của danh từ (U1) và câu động từ (U4). Chỉ trả lời bằng cách nhắc lại tính từ trong câu nghi vấn, không dùng そうです / ちがいます.",
      structure:
        "Nは \u3000けいようし-い ですか。<br/> Nは \u3000けいようし-な ですか。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "この \u3000くるまは \u3000いいですか。",
          vietnamese: "Chiếc xe hơi này tốt không?",
          english: "Is this car good?",
        },
        {
          japanese: "はい、\u3000いいです。",
          vietnamese: "Vâng, tốt.",
          english: "Yes, it is good.",
        },
        {
          japanese: "いいえ、\u3000よくないです。",
          vietnamese: "Không, không tốt.",
          english: "No, it is not good.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "3. Nhưng",
      english: "3. But - Connecting Contrasting Ideas",
    },
    {
      type: "explanation",
      english:
        "The particle が connects two sentences with opposite or contrasting meanings. If the sentences share the same subject, and the first clause has a positive evaluation, the second clause will have a negative evaluation, and vice versa.",
      vietnamese:
        "が: nối 2 mệnh đề có mối quan hệ ngược nghĩa nhau. Trong câu nếu như có chung chủ ngữ, nếu mệnh đề trước thể hiện đánh giá tích cực thì mệnh đề sau thể hiện đánh giá không tích cực và ngược lại.",
      structure: "N₁は \u3000___ ですが、N₂は \u3000___ です",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "にほんの \u3000たべものは \u3000おいしいですが、\u3000たかいです。",
          vietnamese: "Món ăn của Nhật ngon nhưng mà đắt.",
          english: "Japanese food is delicious but expensive.",
        },
        {
          japanese:
            "この \u3000ほんは \u3000おもしろいですが、\u3000たかく \u3000ないです。",
          vietnamese: "Quyển sách này thú vị nhưng không đắt.",
          english: "This book is interesting but not expensive.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "4. とても / あまり - Phó từ chỉ mức độ",
      english: "4. Degree Adverbs: とても / あまり",
    },
    {
      type: "explanation",
      english:
        "とても and あまり are adverbs that express degree. とても means very and is used in positive sentences. あまり means not very or not much and is used in negative sentences. Both are placed before the adjective they modify.",
      vietnamese:
        "とても / あまり đều là những phó từ biểu thị mức độ, và khi làm chức năng bổ nghĩa tính từ thì chúng được đặt trước tính từ. とても: rất (+) / あまり: không... lắm (-).",
      structure:
        'とても\u3000 ___です。 <br/> あまり \u3000けいようし-<span style="position: relative; display: inline-block;">い<span style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: linear-gradient(to top right, transparent 45%, red 48%, red 52%, transparent 55%); pointer-events: none;"></span></span> \u3000くないです。 <br/>あまり \u3000けいようし-<span style="position: relative; display: inline-block;">な<span style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: linear-gradient(to top right, transparent 45%, red 48%, red 52%, transparent 55%); pointer-events: none;"></span></span>じゃ \u3000ありません。',
    },
    {
      type: "example",
      examples: [
        {
          japanese: "わたしの へやは とても きれいです。",
          vietnamese: "Căn phòng của tôi rất sạch.",
          english: "My room is very clean.",
        },
        {
          japanese: "えいごは あまり むずかしく ないです。",
          vietnamese: "Tiếng Anh không khó lắm.",
          english: "English is not very difficult.",
        },
        {
          japanese: "この 式は あまり わかりません。",
          vietnamese: "Công thức này không rõ lắm.",
          english: "This formula is not very clear.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "5. Danh từ là どうですか - Hỏi ấn tượng, cảm tưởng",
      english: "5. Noun は どうですか - Asking for Impressions",
    },
    {
      type: "explanation",
      english:
        "This pattern is used to ask for someone's impression, opinion, or feelings about something they have experienced, a place they have visited, or a person they have met. The response typically describes the impression using an adjective.",
      vietnamese:
        "Mẫu câu dùng để hỏi về ấn tượng, ý kiến hoặc cảm tưởng của người nghe về một việc đã làm / địa điểm đã đến / người đã gặp...",
      structure: "N là どうですか",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "にほんごは どうですか。",
          vietnamese: "Tiếng Nhật thì thế nào?",
          english: "How is Japanese? / What do you think of Japanese?",
        },
        {
          japanese: "... むずかしいです。",
          vietnamese: "... Khó dữ á.",
          english: "... It is difficult.",
        },
        {
          japanese: "ラーメンは どうですか。",
          vietnamese: "Món ramen thế nào?",
          english: "How is the ramen?",
        },
        {
          japanese: "... おいしいです。",
          vietnamese: "... Ngọt.",
          english: "... It is delicious.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "6. Danh từ 1 là どんな Danh từ 2 ですか - Hỏi về tính chất",
      english: "6. Noun1 は どんな Noun2 ですか - Asking About Qualities",
    },
    {
      type: "explanation",
      english:
        "どんな is used to ask about the nature, quality, or characteristics of a person or thing. It is used with adjectives that describe the noun. The answer typically includes an adjective modifying the noun.",
      vietnamese:
        "どんな: dùng để hỏi về tính chất, trạng thái của người hoặc vật và nó được dùng với tính chất bổ nghĩa danh từ.",
      structure: "N1 là どんな N2 ですか",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "ディエンビエンフーは どんな まちですか。",
          vietnamese: "Điện Biên Phủ là thành phố như thế nào?",
          english: "What kind of city is Dien Bien Phu?",
        },
        {
          japanese: "... しずかな まちです。",
          vietnamese: "... Là thành phố yên tĩnh.",
          english: "... It is a quiet city.",
        },
        {
          japanese: "あなたの せんせいは どんな ひとですか。",
          vietnamese: "Thầy giáo của bạn là người như thế nào?",
          english: "What kind of person is your teacher?",
        },
        {
          japanese: "... やさしい ひとです。",
          vietnamese: "... Là người tốt bụng.",
          english: "... He/She is a kind person.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "7. そうですね - Biểu thị sự đồng ý / Suy nghĩ",
      english: "7. そうですね - Expression of Agreement / Thinking",
    },
    {
      type: "explanation",
      english:
        "This phrase is used to show agreement or to give yourself a moment to think before answering a question. In the dialogue of this lesson, そうですね appears when someone needs a moment to think, showing hesitation or contemplation.",
      vietnamese:
        " そうですね biểu thị sự đồng ý, đồng cảm. Ở phần hội thoại của bài này そうですね xuất hiện khi một người biểu thị sự ngập ngừng suy nghĩ câu trả lời khi được hỏi.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "おしごとは どうですか。",
          vietnamese: "Công việc của bạn thế nào?",
          english: "How is your work?",
        },
        {
          japanese: "... そうですね。とても おもしろいです。",
          vietnamese: "À vâng... Rất thú vị.",
          english: "... Let me see... It is very interesting.",
        },
      ],
    },
    {
      type: "note",
      english:
        "Note: そうですね is a versatile expression that can mean I see, That's right, Let me think... depending on the context and intonation.",
      vietnamese:
        "Lưu ý: そうですね là cách diễn đạt linh hoạt có thể có nghĩa Tôi hiểu, Đúng vậy, Để tôi xem... tùy theo ngữ cảnh và ngữ điệu.",
    },
  ],
};
