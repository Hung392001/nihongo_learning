import { GrammarLesson } from "./types";

export const unit16: GrammarLesson = {
  id: "unit16",
  title: "Unit 16: Connecting Sentences, Sequences, and Particles",
  content: [
    {
      type: "title",
      english: "1. Connecting Multiple Sentences with て-form",
      vietnamese: "1. Nối nhiều câu với thể て",
    },

    {
      type: "explanation",
      english:
        "We connect 2 or more sentences using the て-form. When you want to talk about multiple actions, use the て-form in the order they occur. The tense of the sentence is determined by the final verb.",
      vietnamese:
        "Khi muốn nói về nhiều hành động, sử dụng thể て theo thứ tự xảy ra của chúng. Thời của câu do động từ cuối quyết định.",
      structure: "V<sub>1</sub>て、\u3000V<sub>2</sub>て、... V<sub>n</sub>",
    },
    {
      type: "explanation",
      english: "For i-adjectives: ~い → ~くて (Exception: いい → よくて).",
      vietnamese:
        "Đối với tính từ đuôi い: ~い → ~くて (Ngoại lệ: いい → よくて).",
      structure:
        'Adj<sub>1</sub>-<span class="highlight-i">い</span>くて、\u3000Adj<sub>2</sub>-<span class="highlight-i">い</span>くて、... Adj<sub>n</sub>です',
    },
    {
      type: "explanation",
      english:
        "For na-adjectives and nouns: ~な → ~で. When connecting na-adjectives or nouns, use で instead of て.",
      vietnamese:
        "Đối với tính từ đuôi な và danh từ: ~な → ~で. Khi nối các tính từ đuôi な hoặc danh từ, sử dụng で thay vì て.",
      structure:
        'Adj<sub>1</sub>-<span class="highlight-na">な</span>で、\u3000Adj<sub>2</sub>-<span class="highlight-na">な</span>で、... Adj<sub>n</sub>です',
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "まいあさ \u3000わたしは \u3000おきて、\u3000あさごはんを \u3000たべて、\u3000コーヒーを \u3000のみます。",
          vietnamese: "Mỗi sáng thức dậy, ăn sáng và uống cà phê.",
          english: "Every morning I wake up, eat breakfast, and drink coffee.",
        },
        {
          japanese:
            "まいばん \u3000わたしは \u3000レポートを \u3000かいて、\u3000ほんを \u3000よんで、\u3000にほんごを \u3000べんきょうします。",
          vietnamese: "Mỗi tối viết báo cáo, đọc sách và học tiếng Nhật.",
          english:
            "Every evening I write reports, read books, and study Japanese.",
        },
        {
          japanese: "あなたは \u3000きのう \u3000なにを \u3000しましたか。",
          vietnamese: "Hôm qua bạn đã làm gì?",
          english: "What did you do yesterday?",
        },
        {
          japanese:
            "... わたしは \u3000きのう \u3000スーパーや \u3000いって、\u3000かいものして、\u3000それから \u3000ともだちに \u3000あいました。",
          vietnamese:
            "... Hôm qua tôi đã đến siêu thị và mua sắm và sau đó gặp bạn.",
          english:
            "... Yesterday I went to the supermarket, did shopping, and then met my friend.",
        },
        {
          japanese:
            "あのひとは \u3000どんな \u3000ひとですか。 ... わかくて、\u3000きれいです。",
          vietnamese: "Cô ấy là người như thế nào? – Trẻ và đẹp.",
          english:
            "What kind of person is she? ... She is young and beautiful.",
        },
        {
          japanese: "かれは \u3000ハンサムで、\u3000しんせつです。",
          vietnamese: "Anh ấy đẹp trai và tốt bụng.",
          english: "He is handsome and kind.",
        },
        {
          japanese: "あには \u300030さいで、\u3000どくしんです。",
          vietnamese: "Anh trai tôi 30 tuổi và độc thân.",
          english: "My older brother is 30 years old and single.",
        },
      ],
    },

    {
      type: "title",
      english: "2. Verb て から、Verb 2",
      vietnamese: "2. Động từ て から、động từ 2",
    },

    {
      type: "explanation",
      english:
        "Used to express that one action takes place only after another action has been completed, emphasizing the order and sequence of events.",
      vietnamese:
        "Dùng để biểu thị rằng một hành động chỉ xảy ra sau khi hành động khác đã hoàn thành, nhấn mạnh thứ tự và chuỗi sự kiện.",
      structure: "... V<sub>1</sub>てから、... V<sub>2</sub>",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "しごとが \u3000おわってから、\u3000レストランへ \u3000しょくじに \u3000いきます。",
          vietnamese:
            "Sau khi kết thúc công việc, tôi đi đến nhà hàng dùng bữa.",
          english: "After finishing work, I go to a restaurant to eat.",
        },
        {
          japanese:
            "でんわを \u3000かけてから、\u3000ともだちの \u3000うちへ \u3000いきます。",
          vietnamese: "Sau khi gọi điện thoại, tôi đi đến nhà của bạn.",
          english: "After making a phone call, I go to my friend's house.",
        },
      ],
    },

    {
      type: "title",
      english: "3. Noun1 は Noun2 が Adjective",
      vietnamese: "3. Danh từ 1 は Danh từ 2 が Tính từ",
    },

    {
      type: "explanation",
      english:
        "Used to describe a specific characteristic, feature, or aspect of a person, thing, or place.",
      vietnamese:
        "Dùng để miêu tả một đặc điểm, tính chất hoặc khía cạnh cụ thể của một người, vật hoặc địa điểm.",
      structure: "N₁は \u3000N₂が \u3000Adj",
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "かのじょは \u3000かわいくて、\u3000めが \u3000おおきいです。",
          vietnamese: "Cô ấy dễ thương và mắt to.",
          english: "She is cute and has big eyes.",
        },
      ],
    },

    {
      type: "title",
      english: "4. Noun を Verb",
      vietnamese: "4. Danh từ を Động từ",
    },

    {
      type: "explanation",
      english:
        "Used to indicate the point or place from which a person or object departs, exits, or moves away.",
      vietnamese:
        "Dùng để chỉ điểm hoặc nơi mà một người hoặc vật rời đi, ra khỏi, hoặc di chuyển đi xa.",
      structure: "Nを \u3000V",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "わたしは \u30007じに \u3000うちを \u3000でます。",
          vietnamese: "Tôi rời khỏi nhà lúc 7g.",
          english: "I leave my house at 7 o'clock.",
        },
        {
          japanese: "うめだで \u3000でんしゃを \u3000 おりました。",
          vietnamese: "Tôi đã xuống tàu điện ở Umeda.",
          english: "I got off the train at Umeda.",
        },
      ],
    },

    {
      type: "title",
      english: "5. どうやって",
      vietnamese: "5. どうやって",
    },

    {
      type: "explanation",
      english: "Used to ask for directions or how to do something.",
      vietnamese: "Dùng để hỏi xin sự chỉ đường đi hoặc cách làm gì đó.",
    },
    {
      type: "example",
      examples: [
        {
          japanese: "どうやって \u3000かいしゃへ \u3000いきますか。",
          vietnamese: "Bạn đi đến công ty bằng cách nào?",
          english: "How do you go to the company?",
        },
        {
          japanese: "... バスで \u3000かいしゃへ \u3000いきます。",
          vietnamese: "... Đi đến công ty bằng xe buýt.",
          english: "... I go to the company by bus.",
        },
        {
          japanese: "どうやって \u3000くうこうへ \u3000いきますか。",
          vietnamese: "Bạn đi đến sân bay bằng cách nào?",
          english: "How do you go to the airport?",
        },
        {
          japanese:
            "... うちから \u3000タクシーに \u3000のって、くうこうで \u3000おります。",
          vietnamese: "... Lên taxi từ nhà và xuống ở sân bay.",
          english: "... I take a taxi from home and get off at the airport.",
        },
      ],
    },

    {
      type: "title",
      english: "6. どれ / どの / どんな～",
      vietnamese: "6. どれ / どの / どんな～",
    },

    {
      type: "explanation",
      english: `どれ: used for selection without specifying noun. <br/>
         どの + N: used when choosing or identifying a specific person, thing, or place from a known group. The noun must be stated after どの. <br/>
         どんな + N: used to ask about the characteristics, qualities, appearance, nature, or type of a person, thing, place, or situation. It focuses on description rather than selection.`,
      vietnamese: `どれ: dùng để lựa chọn mà không cần chỉ định danh từ. <br/>
         どの + N: dùng khi chọn hoặc xác định một người, vật, hoặc địa điểm cụ thể từ một nhóm đã biết. Danh từ phải được nêu sau どの. <br/>
         どんな + N: dùng để hỏi về đặc điểm, chất lượng, ngoại hình, tính chất, hoặc loại của một người, vật, địa điểm, hoặc tình huống. Nó tập trung vào mô tả hơn là lựa chọn.`,
    },
    {
      type: "example",
      examples: [
        {
          japanese:
            "あなたの \u3000かばんは \u3000どれですか。 ... あの \u3000しろいのです。",
          vietnamese: "Túi của bạn là túi nào? ... Cái trắng ở đằng kia.",
          english: "Which one is your bag? ... That white one over there.",
        },
        {
          japanese: "ミラーさんは \u3000どれですか。 ... あの \u3000ひとです。",
          vietnamese: "Anh Miller là người nào? ... Người ở đằng kia.",
          english: "Which one is Mr. Miller? ... That person over there.",
        },
        {
          japanese:
            "どの \u3000かばんが \u3000あなたのですか。 ... あの \u3000あかい \u3000かばんです。",
          vietnamese: "Cái túi nào là của bạn? ... Cái túi đỏ ở đằng kia.",
          english: "Which bag is yours? ... That red bag over there.",
        },
        {
          japanese:
            "どんな \u3000かばんですか。 ... おおきくて、\u3000くろい \u3000かばんです。",
          vietnamese: "Cái túi như thế nào? ... Cái túi to và đen.",
          english: "What kind of bag is it? ... It's a big, black bag.",
        },
        {
          japanese:
            "どんな \u3000ひとですか。 ... しんせつで、\u3000やさしい \u3000ひとです。",
          vietnamese: "Người như thế nào? ... Người tốt bụng và dịu dàng.",
          english: "What kind of person is it? ... A kind and gentle person.",
        },
      ],
    },
  ],
};
