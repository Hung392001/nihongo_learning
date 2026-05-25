import { GrammarLesson } from "./types";

export const unit3: GrammarLesson = {
  id: "unit3",
  title: "Unit 3: Locations & Direction - ここ・そこ・あそこ",
  content: [
    {
      type: "title",
      text: "1. ここ / そこ / あそこ / こちら / そちら / あちら",
    },
    {
      type: "explanation",
      vietnamese:
        'ここ, そこ, あそこ: chỉ địa điểm (vị trí cụ thể - "đứng đâu nói đó").',
    },
    {
      type: "explanation",
      vietnamese:
        "こちら, そちら, あちら: đại từ chỉ phương hướng, vừa chỉ hướng / chỗ, mang sắc thái lịch sự - kính ngữ (dùng nói chuyện lịch sự / chỉ đường / chỉ hướng).",
    },
    {
      type: "title",
      text: "2. Nouns indicating places です",
    },
    {
      type: "explanation",
      text: "Used to express where an object, a person, or a place is located.",
      vietnamese:
        "Structure: N₁ \u3000は \u3000N₂です。<br/> N<sub>Place</sub> \u3000は \u3000Nです。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "でんわは \u3000そこです",
          vietnamese: "(でんわは そこです。)",
          english: "The phone is there.",
        },
      ],
    },
    {
      type: "example",
      examples: [
        {
          japanese: "おてあらいは \u3000あそこです。",
          vietnamese: "Nhà vệ sinh ở đằng kia.",
          english: "The restroom is over there.",
        },
        {
          japanese: "でんわは \u30002かいです。",
          vietnamese: "Điện thoại ở tầng hai.",
          english: "The phone is on the 2nd floor.",
        },
        {
          japanese: "やまださんは \u3000じむしょです。",
          vietnamese: "Anh Yamada ở văn phòng.",
          english: "Mr. Yamada is in the office.",
        },
      ],
    },
    {
      type: "title",
      text: "3. どこ / どちら",
    },
    {
      type: "explanation",
      text: "Question words for location and direction",
      vietnamese: "Structure: N は どこ / どちら ですか。",
    },
    {
      type: "explanation",
      vietnamese:
        "どこ: nghi vấn từ hỏi về địa điểm. <br/><br/> どちら: nghi vấn từ hỏi về phương hướng (cũng có thể dùng để hỏi về địa điểm), mang sắc thái lịch sự - kính ngữ.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "エレベーターは \u3000どこですか。",
          vietnamese: "Thang máy ở đâu?",
          english: "Where is the elevator?",
        },
        {
          japanese: "ぎんこうは \u3000どちらですか。",
          vietnamese: "Ngân hàng ở chỗ nào vậy?",
          english: "Which way is the bank?",
        },
      ],
    },
    {
      type: "explanation",
      text: "Ngoài ra, khi hỏi về tên của nơi chốn hay tổ chức (quốc gia, công ty, trường học...) thì nghi vấn từ dùng どこ / どちら không phải là なん。",
      vietnamese:
        "Structure: N <sub>place, organization</sub> は \u3000どこ / どちら ですか。",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "かいしゃは \u3000どこですか。",
          vietnamese: "Bạn làm ở công ty nào?",
          english: "Which company do you work for?",
        },
        {
          japanese: "おくには \u3000どちらですか。",
          vietnamese: "Anh đến từ đâu?",
          english: "Which country are you from?",
        },
      ],
    },
    {
      type: "title",
      text: "4. N₁ の N₂",
    },
    {
      type: "explanation",
      text: "Used to ask about the origin of an object.",
      vietnamese:
        "Structure: これ / それ / あれ は \u3000どこの \u3000N<sub>object</sub> ですか。",
    },
    {
      type: "explanation",
      vietnamese: "N₁: quốc gia còn N₂: sản phẩm → sản phẩm của nước đó.",
    },
    {
      type: "explanation",
      vietnamese: "N₁: công ty còn N₂: sản phẩm → sản phẩm của công ty đó.",
    },
    {
      type: "explanation",
      vietnamese:
        "→ 2 trường hợp này dùng どこ để hỏi (Hỏi về nguồn gốc đồ vật)",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "これは \u3000どこの \u3000とけいですか。",
          vietnamese: "Đây là đồng hồ của nước nào / hãng nào?",
          english: "Which country's watch is this?",
        },
        {
          japanese: "... にほんの \u3000とけいです。",
          vietnamese: "... Đây là máy của Nhật.",
          english: "... This is a Japanese watch.",
        },
        {
          japanese: "... パワーでんきの \u3000とけいです。",
          vietnamese: "... Đây là máy tính của công ty điện lực Power.",
          english: "... This is a Power Electric watch.",
        },
      ],
    },
  ],
};
