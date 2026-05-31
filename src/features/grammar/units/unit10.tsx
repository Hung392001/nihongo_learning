import { GrammarLesson } from "./types";

export const unit10: GrammarLesson = {
  id: "unit10",
  title: "Unit 10: Existence & Location - あります・います",
  content: [
    {
      type: "title",
      english: "1. Noun が あります / います",
      vietnamese: "1. Danh từ が あります / います",
    },
    {
      type: "explanation",
      english:
        "あります is used for subjects that do not move on their own (objects, plants, ...).<br/> います is used for subjects that can move on their own (people, animals, ...).",
      vietnamese:
        "あります / います biểu thị sự tồn tại của người / động vật / đồ vật. あります: dùng cho đối tượng tồn tại không tự chuyển động (đồ vật, thực vật...). います: dùng cho đối tượng có thể tự chuyển động (người, động vật...).",
      structure:
        "N<sub>people, animal</sub> が \u3000います.<br/>N<sub>object</sub> が \u3000あります.",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "わたしの \u3000うちには \u3000いぬと \u3000ねこが \u3000います。",
          vietnamese: "Nhà tôi thì có con chó và con mèo.",
          english: "My house has a dog and a cat.",
        },
        {
          japanese: "わたしは \u3000おかねが \u3000あります。",
          vietnamese: "Tôi thì có tiền.",
          english: "I have money.",
        },
      ],
    },
    {
      type: "title",
      english: "2. [Place] に [Noun] が あります / います",
      vietnamese: "2. [Địa điểm] に [Danh từ] が あります / います",
    },
    {
      type: "explanation",
      english:
        "This pattern is used to express that there exists something/someone at a location. The location where the person/object exists is marked by the particle に.",
      vietnamese:
        "Mẫu câu dùng để diễn tả ở một địa điểm nào đó có tồn tại cái gì / ai đó. Địa điểm nơi mà người / đồ vật (tồn tại) được biểu thị bằng trợ từ に.",
      structure:
        "N<sub>place</sub> に \u3000N<sub>people, animal</sub> が \u3000います.<br/>N<sub>place</sub> に \u3000N<sub>object</sub> が \u3000あります.",
    },
    {
      type: "note",
      english: "Action location using で. Existence location using に.<br/>",
      vietnamese: "Hành động ở đâu: で — Tồn tại ở đâu: に.",
    },
    {
      type: "note",
      english:
        "For questions about objects, use なに. For questions about people, use だれ. After question words, the particle ga is used.",
      vietnamese:
        "Đối với câu hỏi về vật, dùng なに. Đối với câu hỏi về người, dùng だれ. Sau từ nghi vấn, trợ từ が được dùng.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "こうえんに \u3000おとこの \u3000こが \u3000います。",
          vietnamese: "Có bé trai ở công viên.",
          english: "There is a boy in the park.",
        },
        {
          japanese: "つくえに \u3000じしょが \u3000あります。",
          vietnamese: "Có cuốn từ điển ở bàn.",
          english: "There is a dictionary on the desk.",
        },
        {
          japanese: "ちかに \u3000なにが \u3000ありますか。",
          vietnamese: "Ở dưới tầng hầm có gì?",
          english: "What is in the basement?",
        },
        {
          japanese: "うけつけに \u3000だれが \u3000いますか。",
          vietnamese: "Ở quầy tiếp tân có ai?",
          english: "Who is at the reception desk?",
        },
      ],
    },
    {
      type: "title",
      english: "3. [Noun] は [Place] に あります / います",
      vietnamese: "3. [Danh từ] は [Địa điểm] に あります / います",
    },
    {
      type: "explanation",
      english:
        "This pattern makes the N<sub>person/animal/object</sub> describes its location. The noun should be something both the speaker and listener know about.",
      vietnamese:
        "Mẫu câu này đưa N<sub>người / động vật / đồ vật</sub> diễn đạt vị trí tồn tại đó. Trường hợp này, danh từ này phải là thứ mà cả người nghe và người nói biết đến.",
    },
    {
      type: "note",
      english:
        'Can also use the pattern "Nは \u3000N<sub>place</sub> です" (Unit 3) instead. When using です, the particle に is omitted after question words (どこ) before desu and after locations (うちは).',
      vietnamese:
        'Có thể dùng mẫu "Nは N<sub>địa điểm</sub> です" (Unit 3) để nói thay mẫu này. Khi đó, trợ từ に sẽ không có sau nghi vấn từ (どこ) biểu thị địa điểm trước です và sau địa điểm (うちは).',
    },
    {
      type: "example",
      examples: [
        {
          japanese: "おんなの \u3000ひとは \u3000うけつけに \u3000います。",
          vietnamese: "Người con gái thì ở quầy tiếp tân.",
          english: "The girl is at the reception desk.",
        },
        {
          japanese: "れいぞうこは \u3000しょくどうに \u3000あります。",
          vietnamese: "Tủ lạnh thì có ở nhà ăn.",
          english: "The refrigerator is in the dining room.",
        },
        {
          japanese: "ミラーさんは \u3000どこですか。",
          vietnamese: "Anh Miller ở đâu?",
          english: "Where is Mr. Miller?",
        },
        {
          japanese: "うちに います。",
          vietnamese: "Ở nhà.",
          english: "He is at home.",
        },
        {
          japanese: "うちです。",
          vietnamese: "Ở nhà.",
          english: "It's at home.",
        },
      ],
    },
    {
      type: "title",
      english: "4. Noun (Place) の Noun (Position)",
      vietnamese: "4. Danh từ (vật / người / địa điểm) の Danh từ (vị trí)",
    },
    {
      type: "explanation",
      english:
        "Position words such as うえ, した, まえ, うしろ, みぎ, ひだり, なか, そと, となり, ちかく, あいだ express spatial relationships relative to N₁.",
      vietnamese:
        "Các từ うえ, した, まえ, うしろ, みぎ, ひだり, なか, そと, となり, ちかく, あいだ biểu thị quan hệ vị trí không gian so với N₁.",
    },
    {
      type: "note",
      english:
        "A position/location expression can be used in the pattern N<sub>place</sub> の N<sub>position</sub> + で when the verb describes an action occurring at that specific location.",
      vietnamese:
        "Có thể đứng từ vị trí → sau N<sub>địa điểm</sub> の N<sub>vị trí</sub> + で khi động từ biểu thị hành động tại địa điểm đó.",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "ドアの \u3000うしろに \u3000おんなの \u3000こが \u3000います。",
          vietnamese: "Có bé gái sau cánh cửa.",
          english: "There is a girl behind the door.",
        },
        {
          japanese:
            "おんなの \u3000ひとと \u3000おとこの \u3000ひとの あいだに \u3000パンダが \u3000います。",
          vietnamese: "Có gấu trúc giữa người đàn ông và người phụ nữ.",
          english: "There is a panda between the man and woman.",
        },
        {
          japanese: "こうえんの \u3000まえに \u3000ぎんこうが \u3000あります。",
          vietnamese: "Có ngân hàng trước công viên.",
          english: "There is a bank in front of the park.",
        },
        {
          japanese: "きょうしつの \u3000なかに \u3000いすが \u3000あります。",
          vietnamese: "Có ghế trong lớp học.",
          english: "There are chairs inside the classroom.",
        },
        {
          japanese: "えきの \u3000ちかくで \u3000ともだちに \u3000あいます。",
          vietnamese: "Tôi gặp bạn ở gần nhà ga.",
          english: "I meet my friend near the station.",
        },
      ],
    },
    {
      type: "title",
      english: "5. Listing Nouns: と vs や",
      vietnamese: "5. Liệt kê các danh từ: と và や",
    },
    {
      type: "explanation",
      english:
        "The particles と and や do not distinguish between people and objects; they distinguish by listing method. と: Lists all nouns completely and accurately. や: Lists representative examples (2 or more) - incomplete list, often used with など at the end.",
      vietnamese:
        "Trợ từ と and や không phân biệt người - vật mà phân biệt theo cách liệt kê. Trợ từ と: Liệt kê các danh từ (đối tượng) - đầy đủ và chính xác. Trợ từ や: Liệt kê các danh từ tiêu biểu đại diện (2 trở lên) - liệt kê không đầy đủ, thì 2 và cái cần thêm など.",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "はこの \u3000なかに \u3000ボールペンや \u3000ノートなどが \u3000あります。",
          vietnamese: "Ở trong hộp chúng tôi có viết và tập.",
          english: "There are things like pens and notebooks in the box.",
        },
        {
          japanese:
            "はこの \u3000なかに \u3000てがみや \u3000しゃしんが \u3000あります。",
          vietnamese: "Có thư và có ảnh trong hộp.",
          english: "There are letters and photos in the box.",
        },
      ],
    },
  ],
};
