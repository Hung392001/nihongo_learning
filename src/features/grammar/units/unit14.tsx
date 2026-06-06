import { GrammarLesson } from "./types";

export const unit14: GrammarLesson = {
  id: "unit14",
  title: "Unit 14: Verb Groups and て-form",
  content: [
    {
      type: "title",
      english: "1. て-form of Verbs",
      vietnamese: "1. Động từ thể て",
    },

    {
      type: "explanation",
      english:
        "Japanese verbs have changing endings and can form various expressions by combining the te-form with other words. Verbs are divided into 3 groups based on their conjugation patterns.",
      vietnamese:
        "Động từ trong tiếng Nhật có đuôi thay đổi - có thể tạo ra nhiều câu với nghĩa khác nhau bằng cách kết hợp thể て của động từ với những từ khác nhau. Căn cứ vào biến đổi, động từ được chia làm 3 nhóm.",
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
            <td class="counter-cell">Verb Group</td>
            <td class="counter-cell">ます-form</td>
            <td class="counter-cell">Meaning</td>
            <td class="counter-cell">て-form</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="3">い・ち・り → って</td>
            <td class="counter-cell">いいます</td>
            <td class="counter-cell">to say</td>
            <td class="counter-cell">いって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かいます</td>
            <td class="counter-cell">to buy</td>
            <td class="counter-cell">かって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">いきます</td>
            <td class="counter-cell">to go</td>
            <td class="counter-cell">いって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">ぎ → いで</td>
            <td class="counter-cell">およぎます</td>
            <td class="counter-cell">to swim</td>
            <td class="counter-cell">およいで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">いそぎます</td>
            <td class="counter-cell">to hurry</td>
            <td class="counter-cell">いそいで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="5">み・び・に → nde</td>
            <td class="counter-cell">のみます</td>
            <td class="counter-cell">to drink</td>
            <td class="counter-cell">のんで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">よみます</td>
            <td class="counter-cell">to read</td>
            <td class="counter-cell">よんで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">あそびます</td>
            <td class="counter-cell">to play</td>
            <td class="counter-cell">あそんで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">よびます</td>
            <td class="counter-cell">to call</td>
            <td class="counter-cell">よんで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">しにます</td>
            <td class="counter-cell">to die</td>
            <td class="counter-cell">しnde</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="3">り → って</td>
            <td class="counter-cell">とります</td>
            <td class="counter-cell">to take</td>
            <td class="counter-cell">とって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">きります</td>
            <td class="counter-cell">to cut</td>
            <td class="counter-cell">きって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">まちます</td>
            <td class="counter-cell">to wait</td>
            <td class="counter-cell">まって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">ち → って</td>
            <td class="counter-cell">もちます</td>
            <td class="counter-cell">to hold</td>
            <td class="counter-cell">もって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かします</td>
            <td class="counter-cell">to lend</td>
            <td class="counter-cell">かして</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">し → して</td>
            <td class="counter-cell">はなします</td>
            <td class="counter-cell">to speak</td>
            <td class="counter-cell">はなして</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かします</td>
            <td class="counter-cell">to lend</td>
            <td class="counter-cell">かして</td>
          </tr>
        </tbody>
      </table>`,
      vietnamese: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell">Nhóm</td>
            <td class="counter-cell">Thể ます</td>
            <td class="counter-cell">Ý nghĩa</td>
            <td class="counter-cell">Thể te</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="3">い・ち・り → って</td>
            <td class="counter-cell">いいます</td>
            <td class="counter-cell">nói</td>
            <td class="counter-cell">いって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かいます</td>
            <td class="counter-cell">mua</td>
            <td class="counter-cell">かって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">いきます</td>
            <td class="counter-cell">đi</td>
            <td class="counter-cell">いって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">ぎ → いで</td>
            <td class="counter-cell">およぎます</td>
            <td class="counter-cell">bơi</td>
            <td class="counter-cell">およいで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">いそぎます</td>
            <td class="counter-cell">vội, gấp</td>
            <td class="counter-cell">いそいで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="5">み・び・に → nde</td>
            <td class="counter-cell">のみます</td>
            <td class="counter-cell">uống</td>
            <td class="counter-cell">のんで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">よみます</td>
            <td class="counter-cell">đọc</td>
            <td class="counter-cell">よんで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">あそびます</td>
            <td class="counter-cell">chơi</td>
            <td class="counter-cell">あそんで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">よびます</td>
            <td class="counter-cell">gọi</td>
            <td class="counter-cell">よんで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">しにます</td>
            <td class="counter-cell">chết</td>
            <td class="counter-cell">しんで</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="3">り → って</td>
            <td class="counter-cell">とります</td>
            <td class="counter-cell">lấy</td>
            <td class="counter-cell">とって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">きります</td>
            <td class="counter-cell">cắt</td>
            <td class="counter-cell">きって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">まちます</td>
            <td class="counter-cell">chờ</td>
            <td class="counter-cell">まって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">ち → って</td>
            <td class="counter-cell">もちます</td>
            <td class="counter-cell">cầm, có</td>
            <td class="counter-cell">もって</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かします</td>
            <td class="counter-cell">cho mượn</td>
            <td class="counter-cell">かして</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">し → して</td>
            <td class="counter-cell">はなします</td>
            <td class="counter-cell">nói chuyện</td>
            <td class="counter-cell">はなして</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かします</td>
            <td class="counter-cell">cho mượn</td>
            <td class="counter-cell">かして</td>
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
            <td class="counter-cell">て-form</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="10">Special Cases</td>
            <td class="counter-cell">おきます</td>
            <td class="counter-cell">wake up</td>
            <td class="counter-cell">おきて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">みます</td>
            <td class="counter-cell">look, see</td>
            <td class="counter-cell">みて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">おります</td>
            <td class="counter-cell">get down (from bed)</td>
            <td class="counter-cell">おりて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">あびます</td>
            <td class="counter-cell">take a bath</td>
            <td class="counter-cell">あびて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">おちます</td>
            <td class="counter-cell">fall, drop</td>
            <td class="counter-cell">おちて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">たります</td>
            <td class="counter-cell">be enough</td>
            <td class="counter-cell">たりて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">でかけます</td>
            <td class="counter-cell">go out</td>
            <td class="counter-cell">でかけて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">ねます</td>
            <td class="counter-cell">sleep</td>
            <td class="counter-cell">ねて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">できます</td>
            <td class="counter-cell">can do, be able to</td>
            <td class="counter-cell">できて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">います</td>
            <td class="counter-cell">be (person), exist</td>
            <td class="counter-cell">いて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="5">...えます → ...えて</td>
            <td class="counter-cell">たべます</td>
            <td class="counter-cell">eat</td>
            <td class="counter-cell">たべて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かえます</td>
            <td class="counter-cell">change, exchange</td>
            <td class="counter-cell">かえて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">つかえます</td>
            <td class="counter-cell">use</td>
            <td class="counter-cell">つかえて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">あけます</td>
            <td class="counter-cell">open</td>
            <td class="counter-cell">あけて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">つけます</td>
            <td class="counter-cell">turn on, attach</td>
            <td class="counter-cell">つけて</td>
          </tr>
        </tbody>
      </table>`,
      vietnamese: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell">Nhóm</td>
            <td class="counter-cell">Thể ます (U4)</td>
            <td class="counter-cell">Ý nghĩa</td>
            <td class="counter-cell">Thể te (U14)</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="10">Trường hợp đặc biệt</td>
            <td class="counter-cell">おきます</td>
            <td class="counter-cell">thức dậy</td>
            <td class="counter-cell">おきて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">みます</td>
            <td class="counter-cell">xem, nhìn, thấy</td>
            <td class="counter-cell">みて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">おります</td>
            <td class="counter-cell">xuống (giường)</td>
            <td class="counter-cell">おりて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">あびます</td>
            <td class="counter-cell">tắm</td>
            <td class="counter-cell">あびて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">おちます</td>
            <td class="counter-cell">rơi, rớt</td>
            <td class="counter-cell">おちて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">たります</td>
            <td class="counter-cell">đủ, vừa đủ</td>
            <td class="counter-cell">たりて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">でかけます</td>
            <td class="counter-cell">ra ngoài</td>
            <td class="counter-cell">でかけて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">ねます</td>
            <td class="counter-cell">ngủ</td>
            <td class="counter-cell">ねて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">できます</td>
            <td class="counter-cell">làm, có thể</td>
            <td class="counter-cell">できて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">います</td>
            <td class="counter-cell">ở, có (người) (bản, chất, tính chất)</td>
            <td class="counter-cell">いて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="5">...えます → ...えて</td>
            <td class="counter-cell">たべます</td>
            <td class="counter-cell">ăn</td>
            <td class="counter-cell">たべて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かえます</td>
            <td class="counter-cell">đổi</td>
            <td class="counter-cell">かえて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">つかえます</td>
            <td class="counter-cell">dùng, sử dụng</td>
            <td class="counter-cell">つかえて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">あけます</td>
            <td class="counter-cell">mở</td>
            <td class="counter-cell">あけて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">つけます</td>
            <td class="counter-cell">bật, mở</td>
            <td class="counter-cell">つけて</td>
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
            <td class="counter-cell">Verb Group</td>
            <td class="counter-cell">ます-form</td>
            <td class="counter-cell">Meaning</td>
            <td class="counter-cell">て-form</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">Group III: Irregular</td>
            <td class="counter-cell">します</td>
            <td class="counter-cell">do</td>
            <td class="counter-cell">して</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">きます</td>
            <td class="counter-cell">come</td>
            <td class="counter-cell">きて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="5">Noun + します → Noun + して</td>
            <td class="counter-cell">べんきょうします</td>
            <td class="counter-cell">study</td>
            <td class="counter-cell">べんきょうして</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かいものをします</td>
            <td class="counter-cell">shopping</td>
            <td class="counter-cell">かいものをして</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">けっこんします</td>
            <td class="counter-cell">marry</td>
            <td class="counter-cell">けっこんして</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">しょくじします</td>
            <td class="counter-cell">eat a meal</td>
            <td class="counter-cell">しょくじして</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">さんぽします</td>
            <td class="counter-cell">take a walk</td>
            <td class="counter-cell">さんぽして</td>
          </tr>
        </tbody>
      </table>`,
      vietnamese: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell">Nhóm</td>
            <td class="counter-cell">Thể ます</td>
            <td class="counter-cell">Ý nghĩa</td>
            <td class="counter-cell">Thể te</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="2">Nhóm III: Động từ bất quy tắc</td>
            <td class="counter-cell">します</td>
            <td class="counter-cell">làm</td>
            <td class="counter-cell">して</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">きます</td>
            <td class="counter-cell">đến</td>
            <td class="counter-cell">きて</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell" rowspan="5">Danh từ + します → Danh từ + して</td>
            <td class="counter-cell">べんきょうします</td>
            <td class="counter-cell">học</td>
            <td class="counter-cell">べんきょうして</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">かいものをします</td>
            <td class="counter-cell">đi mua sắm</td>
            <td class="counter-cell">かいものをして</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">けっこんします</td>
            <td class="counter-cell">kết hôn</td>
            <td class="counter-cell">けっこんして</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">しょくじします</td>
            <td class="counter-cell">ăn cơm</td>
            <td class="counter-cell">しょくじして</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">さんぽします</td>
            <td class="counter-cell">đi dạo</td>
            <td class="counter-cell">さんぽして</td>
          </tr>
        </tbody>
      </table>`,
    },

    {
      type: "title",
      english: "2. Verbて ください - Please do...",
      vietnamese: "2. Động từ thể て ください (Xin hãy...)",
    },

    {
      type: "explanation",
      english:
        "Used to make requests, give instructions, or offer advice in a polite manner. The level of politeness can be adjusted depending on the situation and the relationship between the speaker and the listener",
      vietnamese:
        "Dùng để đưa ra yêu cầu, chỉ thị hoặc lời khuyên một cách lịch sự. Mức độ lịch sự có thể được điều chỉnh tùy thuộc vào tình huống và mối quan hệ giữa người nói và người nghe.",
      structure: "V<sub>て-form</sub> \u3000ください",
    },

    {
      type: "example",
      examples: [
        {
          japanese:
            "すみませんが、\u3000ボールペンを \u3000かして \u3000ください。",
          vietnamese: "Xin lỗi, đưa cho tôi mượn cây bút bi. (Nhờ vả)",
          english: "Excuse me, please lend me a ballpoint pen.",
        },
        {
          japanese:
            "ここに \u3000うちの \u3000じゅうしょと \u3000でんわばんごうを \u3000かいて \u3000ください。",
          vietnamese:
            "Hãy viết số điện thoại và địa chỉ nhà vào đây. (Chỉ thị)",
          english: "Please write your home address and phone number here.",
        },
        {
          japanese: "どうぞ \u3000たくさん \u3000たべて \u3000ください。",
          vietnamese: "Xin mời bạn ăn nhiều vào nhé. (Khuyên khích)",
          english: "Please eat a lot.",
        },
      ],
    },

    {
      type: "title",
      english: "3. Vて います - Currently doing...",
      vietnamese: "3. Động từ thể て います (Đang ~)",
    },

    {
      type: "explanation",
      english:
        "Used to describe an action that is happening now or a state that continues over a period of time.",
      vietnamese:
        "Dùng để miêu tả một hành động đang diễn ra ngay bây giờ hoặc một trạng thái tiếp tục trong một khoảng thời gian.",
      structure: "V<sub>て-form</sub> \u3000います",
    },

    {
      type: "example",
      examples: [
        {
          japanese:
            "いま \u3000なにを して いますか。 ... にほんごを \u3000べんきょうして \u3000います。",
          vietnamese: "Bây giờ bạn đang làm gì? – Tôi đang học tiếng Nhật.",
          english: "What are you doing now? ... I am studying Japanese.",
        },
        {
          japanese:
            "おかあさんは \u3000だれと \u3000あそんで \u3000いますか。 ... はは \u3000はおとうとと \u3000あそんで \u3000います。",
          vietnamese:
            "Mẹ của bạn đang chơi với ai? – Mẹ tôi đang chơi với em tôi.",
          english:
            "Who is your mother playing with? ... My mother is playing with my younger brother.",
        },
        {
          japanese: "ちちは \u3000しんぶんを \u3000よんで \u3000います。",
          vietnamese: "Bố tôi đang đọc báo.",
          english: "My father is reading the newspaper.",
        },
      ],
    },

    {
      type: "title",
      english: "4. Vましょうか - Shall I...?",
      vietnamese: "4. Động từ (thể ます) ましょうか (~ nhé?)",
    },

    {
      type: "explanation",
      english:
        "Used when the speaker offers to do something or suggests an action that may benefit the listener.",
      vietnamese:
        "Dùng khi người nói đề nghị làm gì đó hoặc gợi ý một hành động có thể mang lại lợi ích cho người nghe.",
      structure: 'V (<span class="highlight-i">ます</span>) \u3000ましょうか',
    },

    {
      type: "example",
      examples: [
        {
          japanese: "あついですから、\u3000まどを \u3000あけましょうか。",
          vietnamese: "Bởi vì nóng nên tôi mở cửa sổ cho bạn nhé.",
          english: "Because it's hot, shall I open the window?",
        },
      ],
    },

    {
      type: "title",
      english: "5. Noun が Verb",
      vietnamese: "5. Danh từ が Động từ",
    },

    {
      type: "explanation",
      english:
        "Use が after the subject for natural phenomena or objective descriptions that can be perceived with the five senses.",
      vietnamese:
        "Dùng lúc miêu tả tự nhiên & hiện tượng tự nhiên mà cảm nhận bằng 5 giác quan, hoặc truyền đạt khách quan một sự việc thì dùng trợ từ が sau chủ từ.",
      structure: "Nが \u3000V",
    },

    {
      type: "example",
      examples: [
        {
          japanese: "あめが \u3000ふって \u3000います。",
          vietnamese: "Trời đang mưa.",
          english: "It is raining.",
        },
        {
          japanese: "ミラーさんが \u3000いませんね。",
          vietnamese: "Anh Miller không có ở đây rồi.",
          english: "Mr. Miller is not here.",
        },
      ],
    },

    {
      type: "title",
      english: "6. すみませんが vs しつれいですが",
      vietnamese: "6. すみませんが vs しつれいですが",
    },

    {
      type: "explanation",
      english:
        "Both are used at the beginning of a question or request. すみませんが is for general requests or getting attention. しつれいですが is used before asking personal or sensitive information.",
      vietnamese:
        "Cả hai đều dùng ở đầu câu hỏi hoặc yêu cầu. すみませんが dùng cho yêu cầu chung hoặc thu hút sự chú ý. しつれいですが dùng trước khi hỏi thông tin cá nhân hoặc nhạy cảm.",
    },

    {
      type: "example",
      examples: [
        {
          japanese: "すみませんが、\u3000えきは \u3000どこですか。",
          vietnamese: "Xin lỗi, nhà ga ở đâu ạ?",
          english: "Excuse me, where is the station?",
        },
        {
          japanese: "しつれいですが、\u3000おなまえは \u3000なんですか。",
          vietnamese: "Xin thất lễ, tên của anh/chị là gì ạ?",
          english: "Excuse me, may I ask your name?",
        },
      ],
    },

    {
      type: "title",
      english: "7. それから / あとで / てから",
      vietnamese: "7. それから / あとで / てから",
    },

    {
      type: "table",
      english: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell">Criteria</td>
            <td class="counter-cell">それから</td>
            <td class="counter-cell">あとで</td>
            <td class="counter-cell">てから</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">Meaning</td>
            <td class="counter-cell">and then / after</td>
            <td class="counter-cell">after / later</td>
            <td class="counter-cell">after finishing A, then B; after doing A, do B</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">Usage</td>
            <td class="counter-cell">connect sentences</td>
            <td class="counter-cell">in sentences</td>
            <td class="counter-cell">in sentences</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">Emphasis</td>
            <td class="counter-cell">mild</td>
            <td class="counter-cell">normal</td>
            <td class="counter-cell">very clear</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">Structure</td>
            <td class="counter-cell">sentence 1。それから sentence 2</td>
            <td class="counter-cell">Nの あとで<br/>Vた あとで</td>
            <td class="counter-cell">Vてから</td>
          </tr>
        </tbody>
      </table>`,
      vietnamese: `<table class="counter-table">
        <tbody>
          <tr class="counter-row">
            <td class="counter-cell">Tiêu chí</td>
            <td class="counter-cell">それから</td>
            <td class="counter-cell">あとで</td>
            <td class="counter-cell">てから</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">Ý nghĩa</td>
            <td class="counter-cell">rồi... / sau đó</td>
            <td class="counter-cell">sau đó / lát nữa</td>
            <td class="counter-cell">làm xong A rồi mới B</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">Cách dùng</td>
            <td class="counter-cell">Nối câu</td>
            <td class="counter-cell">Trong câu</td>
            <td class="counter-cell">Trong câu</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">Mức độ nhấn mạnh</td>
            <td class="counter-cell">Nhẹ</td>
            <td class="counter-cell">Bình thường</td>
            <td class="counter-cell">Rất rõ</td>
          </tr>
          <tr class="counter-row">
            <td class="counter-cell">Cấu trúc</td>
            <td class="counter-cell">Câu 1。それから Câu 2</td>
            <td class="counter-cell">Nの あとで<br/>Vた あとで</td>
            <td class="counter-cell">Vてから</td>
          </tr>
        </tbody>
      </table>`,
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "あさごはんを \u3000たべました。 \u3000それから、 \u3000がっこうへ \u3000いきました。",
          vietnamese: "Tôi đã ăn sáng. Sau đó, tôi đã đi đến trường.",
          english: "I ate breakfast. Then, I went to school.",
        },
        {
          japanese: "しごとの \u3000あとで、 \u3000ともだちに あいました。",
          vietnamese: "Sau giờ làm việc, tôi đã gặp bạn.",
          english: "After work, I met my friend.",
        },
        {
          japanese: "しゅくだいを \u3000してから、 \u3000テレビを みます。",
          vietnamese: "Làm bài tập xong rồi tôi mới xem TV.",
          english: "I will watch TV after finishing my homework.",
        },
      ],
    },
  ],
};
