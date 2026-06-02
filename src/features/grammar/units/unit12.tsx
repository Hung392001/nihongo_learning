import { GrammarLesson } from "./types";

export const unit12: GrammarLesson = {
  id: "unit12",
  title: "Unit 12: Thì quá khứ và so sánh",
  content: [
    {
      type: "title",
      english: "1. Affirmative and Negative Forms of Nouns and Na-Adjectives",
      vietnamese: "1. Thể khẳng định, phủ định của danh từ và tính từ đuôi な",
    },
    {
      type: "table",
      english: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell"></td>
            <td class="counter-cell"><strong>Present / Future</strong></td>
            <td class="counter-cell"><strong>Past</strong></td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell"><strong>Affirmative</strong></td>
            <td class="counter-cell">Noun / な-adj + です</td>
            <td class="counter-cell">Noun / な-adj + でした</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell"><strong>Negative</strong></td>
            <td class="counter-cell">Noun / な-adj + じゃ(では) ありません</td>
            <td class="counter-cell">Noun / な-adj + じゃ(では) ありませんでした</td>
          </tr>
        </tbody>
      </table>`,
      vietnamese: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell"></td>
            <td class="counter-cell"><strong>Hiện tại / Tương lai</strong></td>
            <td class="counter-cell"><strong>Quá khứ</strong></td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell"><strong>Khẳng định</strong></td>
            <td class="counter-cell">danh / tính từ な + です</td>
            <td class="counter-cell">danh / tính từ な + でした</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell"><strong>Phủ định</strong></td>
            <td class="counter-cell">danh / tính từ な + じゃ(では) ありません</td>
            <td class="counter-cell">danh / tính từ な + じゃ(では) ありませんでした</td>
          </tr>
        </tbody>
      </table>`,
    },
    {
      type: "example",
      examples: [
        {
          japanese: "きのうは \u3000ひまでした。",
          vietnamese: "Hôm qua tôi rảnh.",
          english: "I was free yesterday.",
        },
        {
          japanese: "きのうは \u3000やすみでした。",
          vietnamese: "Hôm qua tôi được nghỉ.",
          english: "I had a day off yesterday.",
        },
        {
          japanese: "しけんは \u3000かんたんでしたか。",
          vietnamese: "Bữa tiệc có đơn giản không?",
          english: "Was the exam simple?",
        },
        {
          japanese: "... かんたんじゃ \u3000ありませんでした。",
          vietnamese: "... Không đơn giản.",
          english: "... It was not simple.",
        },
      ],
    },
    {
      type: "title",
      english: "2. Affirmative and Negative Forms of I-Adjectives",
      vietnamese: "2. Thể khẳng định, phủ định của tính từ đuôi い",
    },
    {
      type: "table",
      english: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell"></td>
            <td class="counter-cell"><strong>Present / Future</strong></td>
            <td class="counter-cell"><strong>Past</strong></td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell"><strong>Affirmative</strong></td>
            <td class="counter-cell">い-adj + です</td>
            <td class="counter-cell">い-adj (remove い) + かったです</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell"><strong>Negative</strong></td>
            <td class="counter-cell">い-adj (remove い) + くないです</td>
            <td class="counter-cell">い-adj (remove い) + くなかったです</td>
          </tr>
        </tbody>
      </table>`,
      vietnamese: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell"></td>
            <td class="counter-cell"><strong>Hiện tại / Tương lai</strong></td>
            <td class="counter-cell"><strong>Quá khứ</strong></td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell"><strong>Khẳng định</strong></td>
            <td class="counter-cell">tính từ い + です</td>
            <td class="counter-cell">tính từ い (bỏ い) + かった です</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell"><strong>Phủ định</strong></td>
            <td class="counter-cell">tính từ い (bỏ い) + くない です</td>
            <td class="counter-cell">tính từ い (bỏ い) + くなかった です</td>
          </tr>
        </tbody>
      </table>`,
    },
    {
      type: "example",
      examples: [
        {
          japanese: "きのうは \u3000あつかったです。",
          vietnamese: "Hôm qua trời nóng.",
          english: "It was hot yesterday.",
        },
        {
          japanese: "パーティーは \u3000きのう \u3000たのしかったですか。",
          vietnamese: "Bữa tiệc đêm qua có vui không?",
          english: "Was the party yesterday fun?",
        },
        {
          japanese: "... いいえ、\u3000たのしくなかったです。",
          vietnamese: "... Không, không vui lắm.",
          english: "... No, it was not fun.",
        },
      ],
    },
    {
      type: "title",
      english: "3. いい / よい (Good)",
      vietnamese: "3. いい / よい (tốt)",
    },
    {
      type: "explanation",
      english:
        "いい is commonly used for present/future affirmative. よい is used for negative and past forms.",
      vietnamese:
        "いい: thường dùng ở dạng hiện tại / tương lai. よい: thường dùng cho phủ định và quá khứ.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "きのう \u3000てんきは \u3000よかったですか。",
          vietnamese: "Hôm qua thời tiết có tốt không?",
          english: "Was the weather good yesterday?",
        },
        {
          japanese: "... いいえ、\u3000よくなかったです。",
          vietnamese: "... Không, không tốt.",
          english: "... No, it was not good.",
        },
      ],
    },
    {
      type: "title",
      english:
        "4. Noun 1 は Noun 2 より Adjective です (Comparisons: More than)",
      vietnamese: "4. Danh từ 1 は Danh từ 2 より Tính từ です (hơn)",
    },
    {
      type: "explanation",
      english:
        "Use より to compare two things. N2 is used as the standard for comparison when describing the state/quality of N1.",
      vietnamese:
        "Sử dụng より để so sánh hai vật. N2 được dùng làm tiêu chuẩn so sánh khi mô tả trạng thái / tính chất của N1.",
      structure: "N<sub>1</sub>は \u3000N<sub>2</sub>より \u3000Adjです",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "このくるまは \u3000あのくるまより \u3000おおきいです。",
          vietnamese: "Xe hơi này thì lớn hơn xe hơi kia.",
          english: "This car is bigger than that car.",
        },
        {
          japanese: "にほんごは \u3000えいごより \u3000むずかしいです。",
          vietnamese: "Tiếng Nhật thì khó hơn tiếng Anh.",
          english: "Japanese is more difficult than English.",
        },
      ],
    },
    {
      type: "title",
      english: "5. どちら (Comparison between two objects)",
      vietnamese: "5. 「どちら」 - so sánh lựa chọn giữa hai đối tượng",
    },
    {
      type: "explanation",
      english:
        "どちら is used when comparing or choosing between two people, things, places, or options. It means 'which one' when there are only two choices. <br/><br/>In questions, どちら is often followed by が and asks which of the two has a certain quality or characteristic.<br/><br/>In answers, the pattern ～のほうが is used to indicate which one is more. <br/></br>If both choices are similar and there is no difference, どちらも can be used to mean 'both'.<br/><br/>",
      vietnamese:
        "どちら được dùng khi so sánh hoặc lựa chọn giữa hai người, đồ vật, địa điểm hoặc phương án. Nó có nghĩa là 'cái nào' hoặc 'bên nào' khi chỉ có hai lựa chọn.<br/><br/>Trong câu hỏi, どちら thường đi với が để hỏi lựa chọn nào có một đặc điểm hoặc tính chất nhất định.<br/><br/>Trong câu trả lời, mẫu ～のほうが được dùng để chỉ lựa chọn nào 'hơn' lựa chọn còn lại.<br/><br/>Nếu cả hai đều giống nhau hoặc không có sự khác biệt đáng kể, có thể dùng どちらも với nghĩa là 'cả hai đều'.<br/><br/>",
      structure: `
        N<sub>1</sub>と\u3000 N<sub>2</sub>と \u3000どちらが \u3000Adj(な / い)ですか。<br/><br/>
        N<sub>1</sub>/N<sub>2</sub>の \u3000ほうが \u3000Adj(な / い)です。<br/>
        どちらも \u3000Adj(な / い)です。
      `,
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "にほんごと \u3000えいごと \u3000どちらが \u3000むずかしいですか。",
          vietnamese: "Tiếng Nhật và Tiếng Anh, cái nào khó hơn?",
          english: "Which is more difficult, Japanese or English?",
        },
        {
          japanese: "... にほんごの \u3000ほうが \u3000むずかしいです。",
          vietnamese: "... Tiếng Nhật khó hơn.",
          english: "... Japanese is more difficult.",
        },
        {
          japanese:
            "しごとと \u3000べんきょうと \u3000どちらが \u3000おもしろいですか。",
          vietnamese: "Công việc và học tập, cái nào thú vị hơn?",
          english: "Which is more interesting, work or study?",
        },
        {
          japanese: "... どちらも \u3000おもしろいです。",
          vietnamese: "... Cả hai đều thú vị.",
          english: "... Both are interesting.",
        },
        {
          japanese: "やまと \u3000うみと \u3000どちらが \u3000すきですか。",
          vietnamese: "Núi và biển, thích cái nào hơn?",
          english: "Which do you prefer, mountains or sea?",
        },
        {
          japanese: "... うみの \u3000ほうが \u3000すきです。",
          vietnamese: "... Thích biển hơn.",
          english: "... I prefer the sea.",
        },
      ],
    },
    {
      type: "title",
      english: "6. いちばん (Superlative: The most)",
      vietnamese: "6. 「いちばん」 - so sánh nhất",
    },
    {
      type: "explanation",
      english:
        "いちばん is used to express the most outstanding item among three or more. The particle で indicates the range. When a question word is the subject, use が instead of は after the question word.<br/><br/>",
      vietnamese:
        "いちばん được dùng để diễn tả sự nổi bật nhất trong số ba hoặc nhiều hơn. Trợ từ で chỉ phạm vi. Khi từ để hỏi là chủ ngữ, sử dụng が thay vì は sau từ để hỏi.<br/><br/>",
      structure: `
        N<sub>1</sub>の \u3000なかで \u3000{なに / どこ / だれ / いつ}が \u3000いちばん \u3000Adj(な / い)ですか。<br/><br/>
        N<sub>2</sub>が \u3000いちばん \u3000Adj(な / い)です。
      `,
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "ベトナムの \u3000なかで \u3000どこが \u3000いちばん \u3000きれいですか。",
          vietnamese: "Ở Việt Nam, nơi nào là đẹp nhất?",
          english: "Which place is the most beautiful in Vietnam?",
        },
        {
          japanese:
            "... ハノイの \u3000まちが \u3000いちばん \u3000きれいです。",
          vietnamese: "... Hà Nội là đẹp nhất.",
          english: "... Hanoi is the most beautiful.",
        },
      ],
    },
    {
      type: "title",
      english: "7. Noun omission with particle の",
      vietnamese: "7. Lược bỏ danh từ với trợ từ の",
    },
    {
      type: "explanation",
      english:
        "The particle の can replace a noun that has already been mentioned to avoid repetition. Na-adjectives can also function as noun substitutes like nouns.",
      vietnamese:
        "Trợ từ の có thể thay thế cho một danh từ đã được đề cập để tránh lặp lại. Tính từ đuôi な cũng có thể hoạt động như một đại từ thay thế cho danh từ.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "アナさんの \u3000かばんは \u3000どれですか。",
          vietnamese: "Túi của Ana là cái nào?",
          english: "Which one is Ana's bag?",
        },
        {
          japanese: "... あかいの \u3000です。",
          vietnamese: "... Cái màu đỏ.",
          english: "... The red one.",
        },
      ],
    },
  ],
};
