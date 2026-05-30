import { GrammarLesson } from "./types";

export const unit4: GrammarLesson = {
  id: "unit4",
  title: "Unit 4: Telling Time and Verb Conjugations",
  content: [
    {
      type: "title",
      vietnamese: "１. Time Expressions",
      english: "1. Time Expressions",
    },
    {
      type: "explanation",
      english:
        "To ask and tell time in Japanese. Pattern: N (time) です。For minutes, use ふん or ぷん. For exact hours, just use じ.",
      vietnamese:
        "Hỏi và nói về thời gian trong tiếng Nhật. Mẫu câu: N (thời gian) です。Đối với phút, sử dụng ふん hoặc ぷん. Đối với giờ chính xác, chỉ cần sử dụng じ.",
      structure: "いま \u3000なんじですか。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "いま \u3000なんじですか。",
          vietnamese: "Bây giờ là mấy giờ?",
          english: "What time is it now?",
        },
        {
          japanese: "10じ \u300020ふんです。",
          vietnamese: "Là 10 giờ 20 phút.",
          english: "It's 10:20.",
        },
        {
          japanese: "にほんは \u3000いま \u3000なんじですか。",
          vietnamese: "Bây giờ ở Nhật Bản là mấy giờ?",
          english: "What time is it in Japan now?",
        },
        {
          japanese: "4じ \u300045ふんです。",
          vietnamese: "Là 4 giờ 45 phút.",
          english: "It's 4:45.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "２. Chia động từ: ます / ません / ました / ませんでした",
      english: "2. Verb Conjugations: ます / ません / ました / ませんでした",
    },
    {
      type: "explanation",
      text: [
        {
          english:
            "The ます form makes the verb polite and is used for present/future tense. It becomes the predicate in a sentence and shows the speaker's polite attitude toward the listener. Used for truths, customs, present actions, and future events.<br/><br/>",
          vietnamese:
            "Dạng ます làm cho động từ trở nên lịch sự và được sử dụng cho thì hiện tại/tương lai. Nó trở thành vị ngữ trong câu và thể hiện thái độ lịch sự của người nói đối với người nghe. Dùng cho sự thật, thói quen, hành động hiện tại và sự kiện tương lai.<br/><br/>",
        },
        {
          english: "Present/Future - Affirmative:",
          structure: "V + ます (do)",
        },
        {
          english: "<br/><br/>Present/Future - Negative:",
          structure: "V + ません (don't do)",
        },
        {
          english: "<br/><br/>Past - Affirmative:",
          structure: "V + ました (did)",
        },
        {
          english: "<br/><br/>Past - Negative:",
          structure: "V + ませんでした (didn't do)",
        },
      ],
    },
    {
      type: "example",
      examples: [
        {
          japanese: "きょう \u3000べんきょうします。",
          vietnamese: "Hôm nay tôi học bài.",
          english: "I study today.",
        },
        {
          japanese: "きょう \u3000べんきょうしません。",
          vietnamese: "Hôm nay tôi không học bài.",
          english: "I don't study today.",
        },
        {
          japanese: "きのう \u3000べんきょうしました。",
          vietnamese: "Hôm qua tôi đã học bài.",
          english: "I studied yesterday.",
        },
        {
          japanese: "きのう \u3000べんきょうしませんでした。",
          vietnamese: "Hôm qua tôi không học bài.",
          english: "I didn't study yesterday.",
        },
      ],
    },
    {
      type: "explanation",
      english:
        "Interrogative form: Add か at the end of the sentence. Do not change the word order. For questions, repeat the verb in the interrogative sentence.",
      vietnamese: "",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "きのう \u3000べんきょうしましたか。",
          vietnamese: "Hôm qua bạn có học không?",
          english: "Did you study yesterday?",
        },
        {
          japanese: "はい、\u3000べんきょうしました。",
          vietnamese: "Vâng, tôi đã học.",
          english: "Yes, I studied.",
        },
        {
          japanese: "いいえ、\u3000べんきょうしませんでした。",
          vietnamese: "Không, tôi không học.",
          english: "No, I didn't study.",
        },
      ],
    },
    {
      type: "note",
      english:
        "そうです and ちがいます (Unit 2) are NOT used in verb interrogative sentences.",
      vietnamese: "",
    },
    {
      type: "title",
      vietnamese: "３. Time Particle: Danh từ (thời gian) に Động từ",
      english: "3. Time Particle: Noun (time) に Verb",
    },
    {
      type: "explanation",
      english:
        "Particle に: Add after time nouns to indicate when an action occurs.",
      vietnamese: "",
      structure: "N<sub>time</sub> + に + V.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "けさ \u3000なんじに \u3000おきましたか。",
          vietnamese: "Sáng nay bạn dậy lúc mấy giờ?",
          english: "What time did you wake up this morning?",
        },
        {
          japanese: "こんばん \u300011じに \u3000ねます。",
          vietnamese: "Tối nay tôi ngủ lúc 11 giờ.",
          english: "I will sleep at 11 PM tonight.",
        },
        {
          japanese: "きのう \u3000べんきょうしましたか。",
          vietnamese: "Hôm qua bạn có học không?",
          english: "Did you study yesterday?",
        },
        {
          japanese: "いいえ、\u3000わたしは \u3000べんきょうしませんでした。",
          vietnamese: "Không, tôi không học.",
          english: "No, I didn't study.",
        },
      ],
    },
    {
      type: "note",
      english:
        "Do NOT use particle に after these time nouns: きょう, あした, あさって, きのう, おととい, けさ, こんばん, いま, まいあさ, まいばん, まいにち, せんしゅう, こんしゅう, らいしゅう, いつ, せんげつ, こんげつ, らいげつ, ことし, らいねん, きょねん.",
      vietnamese: "",
    },
    {
      type: "note",
      english:
        "Particle に can be used or omitted with these time nouns: ~ようび, あさ, ひる, ばん / よる.",
      vietnamese: "",
    },
    {
      type: "title",
      vietnamese: "４. Time Range: Danh từ から Danh từ まで (From... To...)",
      english: "4. Time Range: Noun から Noun まで (From... To...)",
    },
    {
      type: "explanation",
      english:
        "から indicates the starting point and まで indicates the endpoint. から and まで don't have to be used together; they can be used separately.",
      vietnamese: "",
      structure: "N1から \u3000N2まで \u3000V/です。",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "おおさかから \u3000とうきょうまで \u30003じかん \u3000かかります。",
          vietnamese: "Từ Osaka đến Tokyo mất 3 tiếng.",
          english: "It takes 3 hours from Osaka to Tokyo.",
        },
        {
          japanese: "9じから \u30005じまで \u3000べんきょうします。",
          vietnamese: "Tôi học bài từ 9 giờ đến 5 giờ.",
          english: "I study from 9 AM to 5 PM.",
        },
        {
          japanese: "10じから \u3000はたらきます。",
          vietnamese: "Tôi làm việc từ 10 giờ.",
          english: "I work from 10 AM.",
        },
        {
          japanese: "ぎんこうは \u30009じから \u30004じまでです。",
          vietnamese: "Ngân hàng mở cửa từ 9 giờ đến 4 giờ.",
          english: "The bank is open from 9 AM to 4 PM.",
        },
        {
          japanese: "ひるやすみは \u300012じからです。",
          vietnamese: "Giờ nghỉ trưa bắt đầu từ 12 giờ.",
          english: "Lunch break starts from 12 PM.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "５. Conjunction Particle: Danh từ と Danh từ",
      english: "5. Conjunction Particle: Noun と Noun",
    },
    {
      type: "explanation",
      english: "Used to connect two nouns of equal status.",
      vietnamese: "",
      structure: "N1と \u3000N2.",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "ぎんこうの \u3000やすみは \u3000どようびと \u3000にちようびです。",
          vietnamese: "Ngày nghỉ của ngân hàng là thứ Bảy và Chủ Nhật.",
          english: "The bank's days off are Saturday and Sunday.",
        },
      ],
    },
    {
      type: "title",
      vietnamese: "６. Confirmation Particle: ~ ね (nhỉ, ạ)",
      english: "6. Confirmation Particle: ~ ね (right?)",
    },
    {
      type: "explanation",
      english:
        "Particle ね: Used at the end of a sentence to express the speaker's expectation of the listener's agreement, confirmation, or reminder.",
      vietnamese:
        "Trợ từ ね: Được dùng ở cuối câu để thể hiện sự mong đợi sự đồng ý, xác nhận hoặc nhắc nhở của người nghe.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "あなたも \u3000にほんご を \u3000べんきょうしていますね。",
          vietnamese: "Bạn cũng đang học tiếng Nhật, phải không?",
          english: "You are also studying Japanese, aren't you?",
        },
      ],
    },
  ],
};
