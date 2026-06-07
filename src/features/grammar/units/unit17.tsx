import { GrammarLesson } from "./types";

export const unit17: GrammarLesson = {
  id: "unit17",
  title: "Unit 17: Verb Groups and negative form ~ない",
  content: [
    {
      type: "title",
      english: "1. Verb Groups and the negative form ~ない",
      vietnamese: "1. Các nhóm động từ & THỂ ない của động từ",
    },

    {
      type: "explanation",
      english:
        "The negative form of verbs ending with ~ない is called the ない-form. Verbs are divided into 3 groups based on their conjugation patterns to the negative form.",
      vietnamese:
        "Thể phủ định của động từ kết thúc với ~ない thì ra gọi tắt thể ~ない của động từ. Căn cứ vào biến đổi, động từ được chia làm 3 nhóm:",
    },

    {
      type: "title",
      english: "Group I Verbs",
      vietnamese: "NHÓM I:",
    },

    {
      type: "table",
      english: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell">Rule</td>
            <td class="counter-cell">ます-form (U4)</td>
            <td class="counter-cell">Meaning</td>
            <td class="counter-cell">ない-form</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="3">~います → ~あない</td>
            <td class="counter-cell">かいます</td>
            <td class="counter-cell">to buy</td>
            <td class="counter-cell">かわない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">わかります</td>
            <td class="counter-cell">to understand</td>
            <td class="counter-cell">わからない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" style="color: red; font-weight: bold;">あります</td>
            <td class="counter-cell" style="color: red; font-weight: bold;">to exist, to have</td>
            <td class="counter-cell" style="color: red; font-weight: bold;">ない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">~きます → ~かない</td>
            <td class="counter-cell">ききます</td>
            <td class="counter-cell">to listen</td>
            <td class="counter-cell">きかない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">およぎます</td>
            <td class="counter-cell">to swim</td>
            <td class="counter-cell">およがない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">~ぎます → ~がない</td>
            <td class="counter-cell">いそぎます</td>
            <td class="counter-cell">to hurry</td>
            <td class="counter-cell">いそがない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">すぎます</td>
            <td class="counter-cell">to pass, exceed</td>
            <td class="counter-cell">すぎない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="5">~みます → ~まない</td>
            <td class="counter-cell">のみます</td>
            <td class="counter-cell">to drink</td>
            <td class="counter-cell">のまない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">よみます</td>
            <td class="counter-cell">to read</td>
            <td class="counter-cell">よまない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">あそびます</td>
            <td class="counter-cell">to play</td>
            <td class="counter-cell">あそばない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">よびます</td>
            <td class="counter-cell">to call</td>
            <td class="counter-cell">よばない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">しにます</td>
            <td class="counter-cell">to die</td>
            <td class="counter-cell">しなない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="3">~ります → ~らない</td>
            <td class="counter-cell">とります</td>
            <td class="counter-cell">to take</td>
            <td class="counter-cell">とらない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">きります</td>
            <td class="counter-cell">to cut</td>
            <td class="counter-cell">きらない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">まちます</td>
            <td class="counter-cell">to wait</td>
            <td class="counter-cell">またない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">~ちます → ~たない</td>
            <td class="counter-cell">もちます</td>
            <td class="counter-cell">to hold</td>
            <td class="counter-cell">もたない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かします</td>
            <td class="counter-cell">to lend</td>
            <td class="counter-cell">かさない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">~します → ~さない</td>
            <td class="counter-cell">はなします</td>
            <td class="counter-cell">to speak</td>
            <td class="counter-cell">はなさない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">いれます</td>
            <td class="counter-cell">to put in</td>
            <td class="counter-cell">いれさない</td>
          </tr>
        </tbody>
      </table>`,
      vietnamese: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell">Quy tắc</td>
            <td class="counter-cell">Thể ます</td>
            <td class="counter-cell">Ý nghĩa</td>
            <td class="counter-cell">Thể ない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="3">~います → ~あない</td>
            <td class="counter-cell">かいます</td>
            <td class="counter-cell">mua</td>
            <td class="counter-cell">かわない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">わかります</td>
            <td class="counter-cell">hiểu</td>
            <td class="counter-cell">わからない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" style="color: red; font-weight: bold;">あります</td>
            <td class="counter-cell" style="color: red; font-weight: bold;">có, tồn tại</td>
            <td class="counter-cell" style="color: red; font-weight: bold;">ない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">~きます → ~かない</td>
            <td class="counter-cell">ききます</td>
            <td class="counter-cell">nghe</td>
            <td class="counter-cell">きかない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">およぎます</td>
            <td class="counter-cell">bơi</td>
            <td class="counter-cell">およがない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">~ぎます → ~がない</td>
            <td class="counter-cell">いそぎます</td>
            <td class="counter-cell">vội, gấp</td>
            <td class="counter-cell">いそがない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">すぎます</td>
            <td class="counter-cell">qua, vượt</td>
            <td class="counter-cell">すぎない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="5">~みます → ~まない</td>
            <td class="counter-cell">のみます</td>
            <td class="counter-cell">uống</td>
            <td class="counter-cell">のまない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">よみます</td>
            <td class="counter-cell">đọc</td>
            <td class="counter-cell">よまない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">あそびます</td>
            <td class="counter-cell">chơi</td>
            <td class="counter-cell">あそばない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">よびます</td>
            <td class="counter-cell">gọi</td>
            <td class="counter-cell">よばない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">しにます</td>
            <td class="counter-cell">chết</td>
            <td class="counter-cell">しなない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="3">~ります → ~らない</td>
            <td class="counter-cell">とります</td>
            <td class="counter-cell">lấy</td>
            <td class="counter-cell">とらない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">きります</td>
            <td class="counter-cell">cắt</td>
            <td class="counter-cell">きらない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">まちます</td>
            <td class="counter-cell">chờ</td>
            <td class="counter-cell">またない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">~ちます → ~たない</td>
            <td class="counter-cell">もちます</td>
            <td class="counter-cell">cầm, có</td>
            <td class="counter-cell">もたない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かします</td>
            <td class="counter-cell">cho mượn</td>
            <td class="counter-cell">かさない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">~します → ~さない</td>
            <td class="counter-cell">はなします</td>
            <td class="counter-cell">nói chuyện</td>
            <td class="counter-cell">はなさない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">いれます</td>
            <td class="counter-cell">cho vào, bỏ vào</td>
            <td class="counter-cell">いれさない</td>
          </tr>
        </tbody>
      </table>`,
    },

    {
      type: "title",
      english: "Group II Verbs",
      vietnamese: "NHÓM II:",
    },

    {
      type: "table",
      english: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell">Verb Group</td>
            <td class="counter-cell">ます-form</td>
            <td class="counter-cell">Meaning</td>
            <td class="counter-cell">ない-form</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="10">Special Cases</td>
            <td class="counter-cell">おきます</td>
            <td class="counter-cell">wake up</td>
            <td class="counter-cell">おきない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">みます</td>
            <td class="counter-cell">look, see</td>
            <td class="counter-cell">みない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">おります</td>
            <td class="counter-cell">get down (from bed)</td>
            <td class="counter-cell">おりない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">あびます</td>
            <td class="counter-cell">take a bath</td>
            <td class="counter-cell">あびない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">おちます</td>
            <td class="counter-cell">fall, drop</td>
            <td class="counter-cell">おちない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">たります</td>
            <td class="counter-cell">be enough</td>
            <td class="counter-cell">たりない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">でかけます</td>
            <td class="counter-cell">go out</td>
            <td class="counter-cell">でかけない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">ねます</td>
            <td class="counter-cell">sleep</td>
            <td class="counter-cell">ねない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">できます</td>
            <td class="counter-cell">can do, be able to</td>
            <td class="counter-cell">できなくて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">います</td>
            <td class="counter-cell">be (person), exist</td>
            <td class="counter-cell">いない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="5">...えます → ...えない</td>
            <td class="counter-cell">たべます</td>
            <td class="counter-cell">eat</td>
            <td class="counter-cell">たべない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かえます</td>
            <td class="counter-cell">change, exchange</td>
            <td class="counter-cell">かえない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">つかえます</td>
            <td class="counter-cell">use</td>
            <td class="counter-cell">つかえない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">あけます</td>
            <td class="counter-cell">open</td>
            <td class="counter-cell">あけない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">つけます</td>
            <td class="counter-cell">turn on, attach</td>
            <td class="counter-cell">つけない</td>
          </tr>
        </tbody>
      </table>`,
      vietnamese: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell">Nhóm</td>
            <td class="counter-cell">Thể ます</td>
            <td class="counter-cell">Ý nghĩa</td>
            <td class="counter-cell">Thể ない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="10">Trường hợp đặc biệt</td>
            <td class="counter-cell">おきます</td>
            <td class="counter-cell">thức dậy</td>
            <td class="counter-cell">おきない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">みます</td>
            <td class="counter-cell">xem, nhìn, thấy</td>
            <td class="counter-cell">みない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">おります</td>
            <td class="counter-cell">xuống (giường)</td>
            <td class="counter-cell">おりない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">あびます</td>
            <td class="counter-cell">tắm</td>
            <td class="counter-cell">あびない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">おちます</td>
            <td class="counter-cell">rơi, rớt</td>
            <td class="counter-cell">おちない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">たります</td>
            <td class="counter-cell">đủ, vừa đủ</td>
            <td class="counter-cell">たりない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">でかけます</td>
            <td class="counter-cell">ra ngoài</td>
            <td class="counter-cell">でかけない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">ねます</td>
            <td class="counter-cell">ngủ</td>
            <td class="counter-cell">ねない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">できます</td>
            <td class="counter-cell">làm, có thể</td>
            <td class="counter-cell">できない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">います</td>
            <td class="counter-cell">ở, có (người) (bản, chất, tính chất)</td>
            <td class="counter-cell">いない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="5">...えます → ...えない</td>
            <td class="counter-cell">たべます</td>
            <td class="counter-cell">ăn</td>
            <td class="counter-cell">たべない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かえます</td>
            <td class="counter-cell">đổi</td>
            <td class="counter-cell">かえない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">つかえます</td>
            <td class="counter-cell">dùng, sử dụng</td>
            <td class="counter-cell">つかえない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">あけます</td>
            <td class="counter-cell">mở</td>
            <td class="counter-cell">あけない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">つけます</td>
            <td class="counter-cell">bật, mở</td>
            <td class="counter-cell">つけない</td>
          </tr>
        </tbody>
      </table>`,
    },

    {
      type: "title",
      english: "Group III Verbs",
      vietnamese: "NHÓM III:",
    },

    {
      type: "table",
      english: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell">ます-form</td>
            <td class="counter-cell">Meaning</td>
            <td class="counter-cell">ない-form</td>
            <td class="counter-cell">Transformation</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">Irregular</td>
            <td class="counter-cell">きます</td>
            <td class="counter-cell">come</td>
            <td class="counter-cell">こない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">します</td>
            <td class="counter-cell">do</td>
            <td class="counter-cell">しない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="5">Noun + します</td>
            <td class="counter-cell">べんきょうします</td>
            <td class="counter-cell">study</td>
            <td class="counter-cell">べんきょうしない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かいものをします</td>
            <td class="counter-cell">shopping</td>
            <td class="counter-cell">かいものをしない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">けっこんします</td>
            <td class="counter-cell">marry</td>
            <td class="counter-cell">けっこんしない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">しょくじします</td>
            <td class="counter-cell">eat a meal</td>
            <td class="counter-cell">しょくじしない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">さんぽします</td>
            <td class="counter-cell">take a walk</td>
            <td class="counter-cell">さんぽしない</td>
          </tr>
        </tbody>
      </table>`,
      vietnamese: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell">Thể ます</td>
            <td class="counter-cell">Ý nghĩa</td>
            <td class="counter-cell">Thể ない</td>
            <td class="counter-cell">Biến đổi</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">Bất quy tắc</td>
            <td class="counter-cell">きます</td>
            <td class="counter-cell">đến</td>
            <td class="counter-cell">こない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">します</td>
            <td class="counter-cell">làm</td>
            <td class="counter-cell">しない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="5">Danh động từ + します</td>
            <td class="counter-cell">べんきょうします</td>
            <td class="counter-cell">học</td>
            <td class="counter-cell">べんきょうしない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かいものをします</td>
            <td class="counter-cell">đi mua sắm</td>
            <td class="counter-cell">かいものをしない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">けっこんします</td>
            <td class="counter-cell">kết hôn</td>
            <td class="counter-cell">けっこんしない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">しょくじします</td>
            <td class="counter-cell">ăn cơm</td>
            <td class="counter-cell">しょくじしない</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">さんぽします</td>
            <td class="counter-cell">đi dạo</td>
            <td class="counter-cell">さんぽしない</td>
          </tr>
        </tbody>
      </table>`,
    },

    {
      type: "title",
      english: "2. Vないで ください.",
      vietnamese: "2. Động từ (thể ない) ないで ください",
    },

    {
      type: "explanation",
      english:
        "This form is used when requesting or instructing someone not to do something.",
      vietnamese:
        "Mẫu câu này dùng khi yêu cầu hoặc chỉ thị một ai đừng làm một việc gì đó.",
      structure: "V<sub>ない-form</sub>ないで \u3000ください",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "うけつけで \u3000たばこを \u3000すわないで \u3000ください。",
          vietnamese: "Xin đừng hút thuốc ở quầy tiếp tân.",
          english: "Please don't smoke at the reception desk.",
        },
        {
          japanese:
            "ここに \u3000じてんしゃを \u3000とめないで \u3000ください。",
          vietnamese: "Xin đừng đậu xe đạp ở đây.",
          english: "Please don't park your bicycle here.",
        },
      ],
    },

    {
      type: "title",
      english: "3. Vなければ なりません",
      vietnamese: "3. Động từ (thể ない) なければ なりません",
    },

    {
      type: "explanation",
      english:
        "This form expresses that something must be done, this is typically used with negative verbs.",
      vietnamese:
        "Mẫu câu này biểu thị việc phải làm, đây thường phải câu phủ định.",
      structure: "V<sub>ない-form</sub>なければ \u3000なりません",
    },

    {
      type: "example",
      examples: [
        {
          japanese:
            "こんばん \u30009じに うちへ \u3000かえらなければ \u3000なりません。",
          vietnamese: "Hôm nay tôi phải về nhà lúc 9g tối.",
          english: "Tonight I must go home at 9 o'clock.",
        },
        {
          japanese:
            "あしたの \u3000あさ \u30009じに \u3000ははと \u3000デパートへ \u3000いかなければ \u3000なりません。",
          vietnamese:
            "Sáng mai tôi phải đi đến cửa hàng bách hóa với mẹ của tôi vào lúc 9g.",
          english:
            "Tomorrow morning at 9 o'clock, I must go to the department store with my mother.",
        },
      ],
    },

    {
      type: "title",
      english: "4. Vなくても いいです",
      vietnamese: "4. Động từ (thể ない) なくても いいです",
    },

    {
      type: "explanation",
      english:
        "This form expresses that something does not need to be done; it is not necessary.",
      vietnamese:
        "Mẫu câu này biểu thị một hành động không cần thiết phải làm một việc gì đó.",
      structure: "V<sub>ない-form</sub>なくても \u3000いいです",
    },

    {
      type: "example",
      examples: [
        {
          japanese:
            "きょう \u3000しゅくだいを \u3000しなければ \u3000なりませんか。 ... いいえ、\u3000しなくても \u3000いいです。",
          vietnamese:
            "Hôm nay có phải làm bài tập về nhà không? – Không, không cần.",
          english: "Do I have to do homework today? ... No, you don't have to.",
        },
        {
          japanese:
            "あした \u3000びょういんへ \u3000いかなければ \u3000なりませんか。 ... いいえ、\u3000いかなくても \u3000いいです。",
          vietnamese:
            "Ngày mai có cần đến bệnh viện không? – Không, không cần đâu.",
          english:
            "Do I have to go to the hospital tomorrow? ... No, you don't have to.",
        },
      ],
    },

    {
      type: "title",
      english: "5. Noun (time) までに Verb",
      vietnamese: "5. Danh từ (thời gian) までに",
    },

    {
      type: "explanation",
      english:
        "This form expresses the deadline for an action or event. The particle までに indicates the time limit, different from まで which indicates continuity.",
      vietnamese:
        "Mẫu câu này biểu thị thời hạn cho một hành động hoặc sự kiện. Trợ từ までに chỉ giới hạn thời gian, khác với まで chỉ sự liên tục.",
      structure: "N<sub>(time)</sub>までに \u3000V",
    },

    {
      type: "example",
      examples: [
        {
          japanese:
            "らいしゅうの \u3000きんようびまでに \u3000この \u3000ざっしを \u3000かえさなければ \u3000なりません。",
          vietnamese: "Phải trả cuốn tạp chí này muộn nhất là thứ 6 tuần sau.",
          english: "I must return this magazine by next Friday at the latest.",
        },
        {
          japanese:
            "こんばん \u300011じまでに \u3000うちへ \u3000かえらなければ \u3000なりません。",
          vietnamese: "Tối nay tôi phải về nhà trước 11g.",
          english: "Tonight I must go home by 11 o'clock.",
        },
      ],
    },

    {
      type: "title",
      english: "6. Moving the Object to the Topic",
      vietnamese: "6. Câu để thoái tân ngữ",
    },

    {
      type: "explanation",
      english:
        "When you want to make the object (marked by を) the topic of the sentence, you can move it to the beginning of the sentence and replace を with は.",
      vietnamese:
        'Khi đưa danh từ (tân ngữ) trong cụm "N を V" ra làm chủ đề để thay thế → thành は và đưa danh từ ra đầu câu.',
      structure: "Nを \u3000V → Nは \u3000...",
    },

    {
      type: "example",
      examples: [
        {
          japanese:
            "ここに \u3000しゅくだいを \u3000おかないで \u3000ください。",
          vietnamese: "Xin đừng đặt bài tập ở đây.",
          english: "Please don't place the homework here.",
        },
        {
          japanese:
            "しゅくだいは \u3000ここに \u3000おかないで \u3000ください。",
          vietnamese: "Bài tập thì xin đừng đặt ở đây.",
          english: "As for the homework, please don't place it here.",
        },
      ],
    },
  ],
};
