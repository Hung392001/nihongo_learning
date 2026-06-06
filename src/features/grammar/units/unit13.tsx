import { GrammarLesson } from "./types";

export const unit13: GrammarLesson = {
  id: "unit13",
  title: "Unit 13: Wants and Desires - ほしい and たい",
  content: [
    {
      type: "title",
      english: "1. Noun が ほしいです - Want a Noun",
      vietnamese: "1. Danh từ が ほしいです (ほしい: muốn NOUN)",
    },

    {
      type: "explanation",
      english:
        "ほしい is an i-adjective used to express the speaker's desire to have/own something. The object/noun is marked with the particle が.",
      vietnamese:
        "ほしい là tính từ đuôi い, diễn tả mong muốn sở hữu cái gì đó. Tân ngữ của ほしい được đánh dấu bằng trợ từ が.",
      structure: "Nが \u3000ほしいです",
    },
    {
      type: "note",
      english:
        "ほしいです is only used for the speaker's own desires, not for third parties or invitations.",
      vietnamese:
        "ほしいです chỉ biểu thị ham muốn của người nói, không dùng cho người thứ ba hoặc lời mời.",
    },

    {
      type: "example",
      examples: [
        {
          japanese: "わたしは \u3000あかい \u3000くるまが \u3000ほしいです。",
          vietnamese: "Tôi muốn chiếc xe hơi màu đỏ.",
          english: "I want a red car.",
        },
        {
          japanese: "わたしは \u3000あたらしい \u3000うちが \u3000ほしいです。",
          vietnamese: "Tôi muốn có căn nhà mới.",
          english: "I want a new house.",
        },
        {
          japanese: "わたしは \u3000おかねが \u3000たくさん \u3000ほしいです。",
          vietnamese: "Tôi muốn có nhiều tiền.",
          english: "I want a lot of money.",
        },
      ],
    },

    {
      type: "title",
      english: "2. Verb (ます-stem) たいです - Want to Do Something",
      vietnamese: "2. Động từ (thể ます) たいです - Muốn làm gì đó",
    },

    {
      type: "explanation",
      english:
        "たいです is attached to the stem of a verb (remove ます) to express the desire to do an action. It conjugates like an i-adjective. The object particle can be either を or が.",
      vietnamese:
        "たい là trợ từ gắn sau thể ます của động từ (bỏ ます) để biểu thị mong muốn làm việc gì đó. Nó biến đổi tương tự như tính từ đuôi い. Trợ từ chỉ tân ngữ có thể là を hoặc が.",
      structure: 'V <span class="highlight-i">ます</span> + たいです',
    },
    {
      type: "note",
      english:
        "たいです is only used for the speaker's own desires, not for third parties or invitations. For invitations, use ～ませんか instead.",
      vietnamese:
        "V(thể ます)たいです chỉ biểu thị ham muốn của người nói, không dùng cho người thứ ba hoặc lời mời. Để mời ai đó, dùng ～ませんか.",
    },

    {
      type: "example",
      examples: [
        {
          japanese:
            "わたしは \u3000きょう \u3000うちへ \u3000はやく \u3000かえりたいです。",
          vietnamese: "Hôm nay tôi muốn về nhà sớm.",
          english: "I want to go home early today.",
        },
        {
          japanese:
            "わたしは \u3000スーパーで \u3000くろい \u3000かばんを / が \u3000かいたいです。",
          vietnamese: "Tôi muốn mua cái cặp màu đen ở siêu thị.",
          english: "I want to buy a black bag at the supermarket.",
        },
        {
          japanese:
            "わたしは \u3000この \u3000しんぶんを / が \u3000よみたいです。",
          vietnamese: "Tôi muốn đọc cuốn báo này.",
          english: "I want to read this newspaper.",
        },
        {
          japanese:
            "おなかが \u3000いたいですから、\u3000なにも \u3000たべたくないです。",
          vietnamese: "Vì đau bụng nên tôi không muốn ăn gì cả.",
          english: "Because my stomach hurts, I don't want to eat anything.",
        },
      ],
    },

    {
      type: "note",
      text: "For invitations:<br/>Incorrect: ❌ コーヒーが \u3000ほしいですか。 / コーヒーが \u3000のみたいですか。<br/>Correct: ✅ コーヒーは \u3000いかがですか。 / コーヒーを \u3000  のみませんか。",
      vietnamese:
        "Đối với lời mời:<br/>Sai: ❌ コーヒーが \u3000ほしいですか。 / コーヒーが \u3000のみたいですか。<br/>Đúng: ✅ コーヒーは \u3000いかがですか。 / コーヒーを \u3000のみませんか。",
    },

    {
      type: "title",
      english: "3. Purpose of Movement",
      vietnamese: "3. Mục đích di chuyển",
    },

    {
      type: "explanation",
      english:
        "Used to express going, coming, or returning somewhere with a specific purpose or activity in mind. The purpose can be an action (using the verb in the ます form) or a noun. The particle に indicates the purpose of the movement.<br/><br/>",
      vietnamese:
        "Dùng để biểu thị việc đi, đến hoặc trở về một nơi nào đó với mục đích hoặc hoạt động cụ thể trong tâm trí. Mục đích có thể là một hành động (sử dụng động từ ở thể ます) hoặc danh từ. Trợ từ に chỉ thị mục đích của hành động di chuyển.<br/><br/>",

      structure:
        'N<sub>place</sub>へ \u3000V(<span class="highlight-i">ます</span>)に \u3000いきます・きます・かえります。<br/>N<sub>place</sub>へ \u3000Nに \u3000いきます・きます・かえります。',
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "わたしは \u3000スーパーへ \u3000やさいを \u3000かいに \u3000いきたいです。",
          vietnamese: "Tôi muốn đi đến siêu thị để mua rau.",
          english: "I want to go to the supermarket to buy vegetables.",
        },
        {
          japanese:
            "わたしは \u3000にほんへ \u3000けいざいを \u3000べんきょうしに\u3000 いきたいです。",
          vietnamese: "Tôi muốn đến Nhật để học kinh tế Nhật.",
          english: "I want to go to Japan to study Japanese economics.",
        },
        {
          japanese: "あなたは \u3000どこへ \u3000いきたいですか。",
          vietnamese: "Bạn có muốn đi đâu không?",
          english: "Where do you want to go?",
        },
        {
          japanese: "... わたしは \u3000どこへも \u3000いきたくないです。",
          vietnamese: "... Tôi không muốn đi đâu...",
          english: "... I don't want to go anywhere...",
        },
        {
          japanese:
            "... あした、\u3000わたしは プールへ \u3000およぎに \u3000いきたいです。",
          vietnamese: "... Ngày mai, tôi muốn đi đến hồ bơi...",
          english: "... Tomorrow, I want to go to the pool to swim...",
        },
        {
          japanese:
            "... わたしは \u3000つかれましたから、\u3000なにも \u3000たべたくないです。",
          vietnamese: "... Mệt vì mệt, nên không muốn ăn gì...",
          english: "... I'm tired, so I don't want to eat anything...",
        },
        {
          japanese: "あした \u3000きょうとの \u3000おまつりに \u3000いきます。",
          vietnamese: "Ngày mai tôi sẽ đi lễ hội ở Kyoto. (danh từ hành động)",
          english: "Tomorrow I will go to the festival in Kyoto.",
        },
      ],
    },

    {
      type: "title",
      english: "4. でます : leave / exit; はいります : enter",
      vietnamese: "4. でます : ra ; はいります : vào",
    },

    {
      type: "explanation",
      english:
        "Use でます when someone leaves or exits a location, and use はいります when someone enters or goes into a location. These verbs describe movement between places.",
      vietnamese:
        "Dùng でます khi ai đó rời khỏi hoặc ra khỏi một địa điểm, và dùng はいります khi ai đó vào hoặc đi vào một địa điểm. Những động từ này mô tả sự di chuyển giữa các nơi.",
      structure:
        "N<sub>place</sub> を \u3000でます.<br/>N<sub>place</sub> に \u3000はいります.",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "わたしは \u3000けさ \u30007じに \u3000うちを \u3000でます。",
          vietnamese: "Sáng nay tôi ra khỏi nhà lúc 7g.",
          english: "I left home at 7 o'clock this morning.",
        },
        {
          japanese: "わたしは \u3000こんばん \u3000きっさに \u3000はいります。",
          vietnamese: "Tối nay tôi vào quán cà phê.",
          english: "I will enter a coffee shop tonight.",
        },
      ],
    },

    {
      type: "title",
      english: "5. ごろ and ぐらい - Approximate Time and Quantity",
      vietnamese: "5. ごろ và ぐらい - Thời gian và số lượng xấp xỉ",
    },

    {
      type: "explanation",
      english:
        "ごろ is used for approximate time points (around what time). ぐらい is used for approximate durations, quantities, and degrees (about how much).",
      vietnamese:
        "ごろ dùng để chỉ thời điểm xấp xỉ (khoảng mấy giờ). ぐらい dùng để chỉ khoảng thời gian, số lượng, mức độ xấp xỉ (khoảng bao nhiêu).",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "9じごろ",
          vietnamese: "Khoảng 9 giờ",
          english: "Around 9 o'clock",
        },
        {
          japanese: "7じかんぐらい",
          vietnamese: "Khoảng 7 tiếng",
          english: "About 7 hours",
        },
        {
          japanese: "100えんぐらい",
          vietnamese: "Khoảng 100 yên",
          english: "About 100 yen",
        },
      ],
    },
    {
      type: "title",
      english: "6. どこか and なにか - Somewhere and Something",
      vietnamese: "6. どこか và なにか - Nơi nào đó và cái gì đó",
    },
    {
      type: "explanation",
      english:
        "どこか means 'somewhere' and なにか means 'something'. The particles へ and を can be omitted after どこか and なにか respectively.",
      vietnamese:
        "どこか có nghĩa là 'điểm đó, nơi nào đó'. なにか có nghĩa là 'cái gì đó'. Có thể lược bỏ trợ từ ～へ sau どこか và ～を sau なにか.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "どこかへ \u3000いきたいです。",
          vietnamese: "Tôi muốn đi đâu đó.",
          english: "I want to go somewhere.",
        },
        {
          japanese: "なにかを \u3000たべたいです。",
          vietnamese: "Tôi muốn ăn cái gì đó.",
          english: "I want to eat something.",
        },
      ],
    },

    {
      type: "title",
      english: "7. Honorific Prefix ご～",
      vietnamese: "7. ご～",
    },

    {
      type: "explanation",
      english:
        "The prefix ご is added to certain nouns to make expressions more polite and respectful, especially in business or formal situations.",
      vietnamese:
        "Tiền tố ご được thêm vào trước một số danh từ để thể hiện sự tôn trọng, lịch sự.",
    },

    {
      type: "example",
      examples: [
        {
          japanese: "ごちゅうもんは？",
          vietnamese: "Anh / Chị dùng món gì ạ?",
          english: "What would you like to order?",
        },
        {
          japanese: "ごかぞくは \u3000おげんきですか。",
          vietnamese: "Gia đình bạn có khỏe không?",
          english: "Is your family well?",
        },
        {
          japanese: "ごしゅっしんは \u3000どちらですか。",
          vietnamese: "Quê quán của bạn ở đâu?",
          english: "Where are you from?",
        },
      ],
    },
  ],
};
