import React, { useState } from 'react';
import './Grammar.css';

interface GrammarLesson {
  id: string;
  title: string;
  japaneseTitle: string;
  content: GrammarContent[];
}

interface GrammarContent {
  type: 'title' | 'explanation' | 'particle' | 'example' | 'note' | 'practice';
  text?: string;
  japanese?: string;
  vietnamese?: string;
  examples?: GrammarExample[];
  items?: GrammarItem[];
}

interface GrammarExample {
  japanese: string;
  furigana?: string;
  english: string;
  vietnamese: string;
}

interface GrammarItem {
  particle?: string;
  meaning: string;
  usage: string;
  examples?: string[];
}

interface GrammarProps {
  onNavigate?: (page: string) => void;
}

export const Grammar: React.FC<GrammarProps> = ({ onNavigate }) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('unit1');
  const [expandedSection, setExpandedSection] = useState<string | null>('intro');

  const grammarLessons: Record<string, GrammarLesson> = {
    unit1: {
      id: 'unit1',
      title: 'Unit 1: Thì / Là - Trợ từ は, の, も, さん',
      japaneseTitle: 'ユニット１：これ・その・あれ',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 1, you will learn fundamental sentence patterns with です, possession markers with の, and polite expressions with さん.',
          vietnamese: 'ユニット１では、「です」を使った基本文、「の」を使った所有表現、「さん」を使った丁寧な表現を学びます。'
        },
        {
          type: 'title',
          text: '１. は / Là - Topic Particle & Sentence Pattern'
        },
        {
          type: 'explanation',
          text: 'The particle は marks the topic of the sentence.',
          vietnamese: 'じょし「は」は、文の主題を示します。「N1 は N2 です」という基本文型を作ります。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'わたしは がくせいです。',
              vietnamese: 'Tôi là học sinh.',
              english: 'I am a student.'
            },
            {
              japanese: 'あなたは がくせいですか。',
              vietnamese: 'Bạn có phải là học sinh không?',
              english: 'Are you a student?'
            },
            {
              japanese: 'いいえ、わたしは がくせいじゃありません。',
              vietnamese: 'Không, tôi không phải là học sinh.',
              english: 'No, I am not a student.'
            }
          ]
        },
        {
          type: 'note',
          text: 'です: used at the end of a sentence to form a predicate. じゃありません: negative form of です. か: used to form a question.',
          vietnamese: 'です：文の末尾で述語を作ります。じゃありません：「です」の否定形です。か：質問文を作ります。'
        },
        {
          type: 'title',
          text: '２. の / Của - Possession & Attribute Particle'
        },
        {
          type: 'explanation',
          text: 'The particle の indicates possession or relationships between nouns. Pattern: N1 の N2',
          vietnamese: 'じょし「の」は、名詞間の所有または結びつきを示します。「N1 の N2」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'わたしは UNOの しゃいんです。',
              vietnamese: 'Tôi là nhân viên công ty UNO.',
              english: 'I am an employee of UNO company.'
            },
            {
              japanese: 'わたしは ゆうびんきょくの がくせいです。',
              vietnamese: 'Tôi là học sinh của bưu điện.',
              english: 'I am a student at the post office.'
            }
          ]
        },
        {
          type: 'title',
          text: '３. も / Cũng - Also Particle'
        },
        {
          type: 'explanation',
          text: 'The particle も is used to say "also" or "too". It replaces は when expressing similarity.',
          vietnamese: 'じょし「も」は「も」を表します。「も」を使う場合、「は」の代わりに「も」を使います。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'A: わたしは いしゃです。Bあなたも いしゃですか。',
              vietnamese: 'A: Tôi là bác sĩ. B: Bạn cũng là bác sĩ phải không?',
              english: 'A: I am a doctor. B: Are you also a doctor?'
            },
            {
              japanese: 'B: いいえ、わたしは いしゃじゃありません。',
              vietnamese: 'B: Không, tôi không phải là bác sĩ.',
              english: 'B: No, I am not a doctor.'
            },
            {
              japanese: 'グエンさんも がくせいです。',
              vietnamese: 'Nguyễn cũng là học sinh.',
              english: 'Nguyen is also a student.'
            }
          ]
        },
        {
          type: 'title',
          text: '４. さん - Honorific Title'
        },
        {
          type: 'explanation',
          text: 'さん is used after names or professions to show respect. Never use it with your own name.',
          vietnamese: 'さん は、名前や職業の後に付ける敬語です。自分の名前には使いません。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'たなかさん',
              vietnamese: 'Anh Tanaka (Chị Tanaka)',
              english: 'Mr./Ms. Tanaka'
            },
            {
              japanese: 'せんせいさん',
              vietnamese: 'Thầy/Cô giáo',
              english: 'Teacher (respectful)'
            },
            {
              japanese: 'いしゃさん',
              vietnamese: 'Bác sĩ',
              english: 'Doctor (respectful)'
            }
          ]
        },
        {
          type: 'title',
          text: 'Patterns & Examples'
        },
        {
          type: 'note',
          text: 'Positive: N1 は N2 です。 | Negative: N1 は N2 じゃありません。 | Question: N1 は N2 ですか。',
          vietnamese: '肯定：N1 は N2 です。| 否定：N1 は N2 じゃありません。| 質問：N1 は N2 ですか。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'せんせいです。',
              vietnamese: 'Tôi là giáo viên.',
              english: 'I am a teacher.'
            },
            {
              japanese: 'せんせいじゃありません。',
              vietnamese: 'Tôi không phải là giáo viên.',
              english: 'I am not a teacher.'
            },
            {
              japanese: 'あなたは かいしゃいんですか。',
              vietnamese: 'Bạn có phải là nhân viên công ty không?',
              english: 'Are you a company employee?'
            },
            {
              japanese: 'はい、わたしは かいしゃいんです。',
              vietnamese: 'Có, tôi là nhân viên công ty.',
              english: 'Yes, I am a company employee.'
            }
          ]
        },
        {
          type: 'practice',
          items: [
            {
              meaning: 'I am a bank employee.',
              usage: 'ぎんこういん（銀行員）+ です'
            },
            {
              meaning: 'Sato is also a student.',
              usage: 'さとうさん + も + がくせい + です'
            },
            {
              meaning: 'This is my company\'s phone.',
              usage: 'わたしの かいしゃの でんわ'
            },
            {
              meaning: 'What is your profession?',
              usage: 'あなたは ～ですか？'
            }
          ]
        }
      ]
    },
    unit2: {
      id: 'unit2',
      title: 'Unit 2: これ・その・あれ / Demonstratives & Possession',
      japaneseTitle: 'ユニット２：これ・その・あれ・この・その・あの',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 2, you will learn demonstrative pronouns and adjectives that show distance and possession relationships.',
          vietnamese: 'ユニット２では、距離を示す指示代名詞と指示形容詞、および所有関係を学びます。'
        },
        {
          type: 'title',
          text: '１. これ・それ・あれ - Demonstrative Pronouns'
        },
        {
          type: 'explanation',
          text: 'これ, それ, あれ are pronouns that stand alone to point at objects. They cannot directly modify nouns.',
          vietnamese: 'これ、それ、あれは指示代名詞で、単独で物を指します。名詞を直接修飾することはできません。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'これは ペンです。',
              vietnamese: 'Cái này là bút.',
              english: 'This is a pen.'
            },
            {
              japanese: 'それは ほんです。',
              vietnamese: 'Cái đó là sách.',
              english: 'That is a book.'
            },
            {
              japanese: 'あれは つくえです。',
              vietnamese: 'Cái kia là cái bàn.',
              english: 'That over there is a desk.'
            }
          ]
        },
        {
          type: 'note',
          text: 'これ: near the speaker | それ: near the listener | あれ: far from both',
          vietnamese: 'これ：話者の近く｜それ：聞き手の近く｜あれ：二人から遠い'
        },
        {
          type: 'title',
          text: '２. この・その・あの - Demonstrative Adjectives'
        },
        {
          type: 'explanation',
          text: 'この, その, あの modify nouns directly and show distance. Pattern: この/その/あの + N は ～です。',
          vietnamese: 'この、その、あのは指示形容詞で、名詞を直接修飾します。「この/その/あの + N は ～です」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'このほんは にほんごのほんです。',
              vietnamese: 'Quyển sách này là sách tiếng Nhật.',
              english: 'This book is a Japanese book.'
            },
            {
              japanese: 'そのほんは わたしのほんです。',
              vietnamese: 'Quyển sách đó là sách của tôi.',
              english: 'That book is my book.'
            },
            {
              japanese: 'あのペンは だれのですか。',
              vietnamese: 'Cái bút kia là của ai?',
              english: 'Whose is that pen over there?'
            }
          ]
        },
        {
          type: 'title',
          text: '３. なん・なに - Question Words'
        },
        {
          type: 'explanation',
          text: 'なん and なに both mean "what". Use なん before counter words, なに before other words.',
          vietnamese: 'なん と なに は両方「何」を意味します。数詞の前には「なん」を、その他の単語の前には「なに」を使います。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'これは ほんですか、ペンですか。',
              vietnamese: 'Cái này là sách hay bút?',
              english: 'Is this a book or a pen?'
            },
            {
              japanese: 'ペンです。',
              vietnamese: 'Đó là bút.',
              english: 'It is a pen.'
            }
          ]
        },
        {
          type: 'title',
          text: '４. の - Possession & Omission'
        },
        {
          type: 'explanation',
          text: 'The particle の shows possession and relationship between nouns. When the noun is understood, の can replace it.',
          vietnamese: 'じょし「の」は所有と名詞間の関係を示します。名詞が理解されている場合、「の」がそれを置き換えることができます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'そのコンピューターは どこのですか。',
              vietnamese: 'Máy vi tính đó là từ đâu?',
              english: 'Where is that computer from?'
            },
            {
              japanese: 'わたしの でんわは どこのですか。',
              vietnamese: 'Điện thoại của tôi là từ đâu?',
              english: 'Where is my phone from?'
            },
            {
              japanese: 'あれは だれの かばんですか。',
              vietnamese: 'Cái balo kia là của ai?',
              english: 'Whose backpack is that over there?'
            },
            {
              japanese: 'さとうさんのです。',
              vietnamese: 'Của anh Sato.',
              english: 'It is Mr. Sato\'s.'
            },
            {
              japanese: 'このかばんは あなたのですか。',
              vietnamese: 'Cái balo này có phải của bạn không?',
              english: 'Is this backpack yours?'
            },
            {
              japanese: 'いいえ、わたしのじゃありません。',
              vietnamese: 'Không, nó không phải của tôi.',
              english: 'No, it is not mine.'
            }
          ]
        },
        {
          type: 'title',
          text: '５. お - Honorific Prefix'
        },
        {
          type: 'explanation',
          text: 'お is placed before certain nouns to add politeness and respect.',
          vietnamese: 'お は特定の名詞の前に付けて、丁寧さと敬意を加えます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'お国',
              vietnamese: 'Quốc gia (tôn trọng)',
              english: 'Country (respectful)'
            },
            {
              japanese: 'お酒',
              vietnamese: 'Rượu (tôn trọng)',
              english: 'Alcohol (respectful)'
            },
            {
              japanese: 'お茶',
              vietnamese: 'Trà (tôn trọng)',
              english: 'Tea (respectful)'
            }
          ]
        },
        {
          type: 'title',
          text: '６. そうですか - Expressing Recognition'
        },
        {
          type: 'explanation',
          text: 'そうですか is used to express recognition, surprise, or to confirm what you just heard. It means "Is that so?" or "I see."',
          vietnamese: 'そうですか は、新しい内容を聞いて驚きや確認を表す場合に使用します。「そうですね」もあります。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'そうですか。',
              vietnamese: 'Vậy à? / Thế à?',
              english: 'Is that so? / I see.'
            }
          ]
        },
        {
          type: 'title',
          text: '７. Response Patterns - はい・いいえ・そう'
        },
        {
          type: 'explanation',
          text: 'Responses vary depending on the question type. Use はい/いいえ for yes/no questions, そう for confirmation questions.',
          vietnamese: '質問の種類に応じて応答パターンが異なります。「はい」「いいえ」は yes/no 質問用、「そう」は確認質問用です。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'はい、かいしゃのです。',
              vietnamese: 'Có, đó là của công ty.',
              english: 'Yes, it is the company\'s.'
            },
            {
              japanese: 'いいえ、かいしゃのじゃありません。',
              vietnamese: 'Không, nó không phải của công ty.',
              english: 'No, it is not the company\'s.'
            },
            {
              japanese: 'はい、そうです。',
              vietnamese: 'Có, đúng vậy.',
              english: 'Yes, that\'s right.'
            },
            {
              japanese: 'いいえ、そうじゃありません。',
              vietnamese: 'Không, không phải vậy.',
              english: 'No, that\'s not right.'
            }
          ]
        },
        {
          type: 'practice',
          items: [
            {
              meaning: 'What is this? (using これ)',
              usage: 'これは なんですか。'
            },
            {
              meaning: 'That is my book. (using その)',
              usage: 'そのほんは わたしのです。'
            },
            {
              meaning: 'Where is that computer from?',
              usage: 'あのコンピューターは どこのですか。'
            },
            {
              meaning: 'Is this your pen?',
              usage: 'このペンは あなたのですか。'
            }
          ]
        }
      ]
    },
    unit3: {
      id: 'unit3',
      title: 'Unit 3: Locations & Direction - ここ・そこ・あそこ',
      japaneseTitle: 'ユニット３：ばしょ・ほうこう｜ここ・そこ・あそこ・どこ',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 3, you will learn location words and how to describe where places and people are located.',
          vietnamese: 'ユニット３では、場所を示す単語と、場所や人がどこに位置するかを説明する方法を学びます。'
        },
        {
          type: 'title',
          text: '１. ここ・そこ・あそこ・どこ - Place Words'
        },
        {
          type: 'explanation',
          text: 'ここ, そこ, あそこ are location words (different from これ, それ, あれ which refer to objects). どこ is used to ask "where".',
          vietnamese: 'ここ、そこ、あそこは場所を示す単語です（これ、それ、あれは物を指す単語とは異なります）。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'ここ：話者の近い場所',
              vietnamese: 'ここ (đây): Nơi gần người nói',
              english: 'ここ (here): Place near the speaker'
            },
            {
              japanese: 'そこ：聞き手の近い場所',
              vietnamese: 'そこ (đó): Nơi gần người nghe',
              english: 'そこ (there): Place near the listener'
            },
            {
              japanese: 'あそこ：二人から遠い場所',
              vietnamese: 'あそこ (ở kia): Nơi xa cả hai',
              english: 'あそこ (over there): Place far from both'
            },
            {
              japanese: 'どこ：質問「どこですか」',
              vietnamese: 'どこ (đâu): Câu hỏi "Ở đâu?"',
              english: 'どこ (where): Question "Where is it?"'
            }
          ]
        },
        {
          type: 'title',
          text: '２. Danh từ は ～です - Place Description Pattern'
        },
        {
          type: 'explanation',
          text: 'Use this pattern to describe what a place is or what is located at a place. Pattern: N1 は N2 です。',
          vietnamese: 'このパターンは、場所が何であるか、または場所に何があるかを説明するために使用されます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'あそこは トイレです。',
              vietnamese: 'Ở kia là phòng tắm.',
              english: 'That over there is a restroom.'
            },
            {
              japanese: 'あそこは ほんやです。',
              vietnamese: 'Ở kia là tiệm sách.',
              english: 'That over there is a bookstore.'
            },
            {
              japanese: 'やまださんは あのへやです。',
              vietnamese: 'Anh Yamada ở phòng nọ.',
              english: 'Mr. Yamada is in that room.'
            }
          ]
        },
        {
          type: 'title',
          text: '３. ここ・そこ・あそこ + です - Indicating Location'
        },
        {
          type: 'explanation',
          text: 'When answering where something is located, use N1 は ここ/そこ/あそこ です。',
          vietnamese: 'ある物や人がどこにあるかを示す場合、「N1 は ここ/そこ/あそこ です」という形式を使用します。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'エレベーターは どこですか。',
              vietnamese: 'Thang máy ở đâu?',
              english: 'Where is the elevator?'
            },
            {
              japanese: 'あそこは ぎんこうです。',
              vietnamese: 'Ở kia là ngân hàng.',
              english: 'That over there is a bank.'
            },
            {
              japanese: 'N1 の かいしゃは どこですか。',
              vietnamese: 'Công ty của N1 ở đâu?',
              english: 'Where is N1\'s company?'
            }
          ]
        },
        {
          type: 'title',
          text: '４. Quests about Location'
        },
        {
          type: 'explanation',
          text: 'When asking about the location of an object or person, you can use: どこですか。',
          vietnamese: '物や人の位置について質問する場合、「どこですか」を使用できます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'トレインは どこですか。',
              vietnamese: 'Tàu ở đâu?',
              english: 'Where is the train?'
            },
            {
              japanese: 'TYLは どこですか。',
              vietnamese: 'TYL ở đâu?',
              english: 'Where is TYL?'
            },
            {
              japanese: 'わたしは どこですか。',
              vietnamese: 'Tôi ở đâu?',
              english: 'Where am I?'
            }
          ]
        },
        {
          type: 'title',
          text: '５. の を使った質問 - Using の for Origin/Affiliation'
        },
        {
          type: 'explanation',
          text: 'Pattern: これ/それ/あれ は どこの N ですか。Use の to indicate what country or company something belongs to.',
          vietnamese: 'どこの に続く名詞は、対象物がどこから来たか、どこに属するかを示します。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'これは どこの パソコンですか。',
              vietnamese: 'Máy vi tính này từ đâu?',
              english: 'Where is this computer from?'
            },
            {
              japanese: 'これは どこの いんさつきですか。',
              vietnamese: 'Máy in này từ đâu?',
              english: 'Where is this printer from?'
            },
            {
              japanese: 'パワーでんきの カメラです。',
              vietnamese: 'Đó là máy ảnh của công ty Power Electric.',
              english: 'It is a camera from Power Electric company.'
            }
          ]
        },
        {
          type: 'practice',
          items: [
            {
              meaning: 'The bank is over there.',
              usage: 'ぎんこう + は + あそこ + です'
            },
            {
              meaning: 'Where is the library?',
              usage: 'としょかん + は + どこ + ですか'
            },
            {
              meaning: 'This is from the United States.',
              usage: 'これ + は + アメリカ + の + です'
            },
            {
              meaning: 'The restroom is here.',
              usage: 'トイレ + は + ここ + です'
            }
          ]
        }
      ]
    },
    unit4: {
      id: 'unit4',
      title: 'Unit 4: Verb Forms & Time Expressions',
      japaneseTitle: 'ユニット４：どうしのけい・じかんひょうげん',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 4, you will learn verb conjugations, time expressions, and how to indicate when and for how long actions occur.',
          vietnamese: 'ユニット４では、動詞の活用、時間表現、および行動がいつどのくらいの期間発生するかを示す方法を学びます。'
        },
        {
          type: 'title',
          text: '１. Vます・ません・ました・ませんでした - Verb Conjugations'
        },
        {
          type: 'explanation',
          text: 'Japanese verbs conjugate based on tense and politeness. The ます form is polite present/future. Pattern: Vます (do), Vません (don\'t do), Vました (did), Vませんでした (didn\'t do).',
          vietnamese: '動詞の活用形：Vます（する）、Vません（しない）、Vました（した）、Vませんでした（しなかった）'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'きょう べんきょうします。',
              vietnamese: 'Tôi học bài hôm nay.',
              english: 'I study today.'
            },
            {
              japanese: 'きょう べんきょうしません。',
              vietnamese: 'Tôi không học bài hôm nay.',
              english: 'I don\'t study today.'
            },
            {
              japanese: 'きのう べんきょうしました。',
              vietnamese: 'Tôi đã học bài hôm qua.',
              english: 'I studied yesterday.'
            },
            {
              japanese: 'きのう べんきょうしませんでした。',
              vietnamese: 'Tôi không học bài hôm qua.',
              english: 'I didn\'t study yesterday.'
            }
          ]
        },
        {
          type: 'note',
          text: 'When the subject is clear, the subject noun can be omitted. Verbs always come at the end of the clause in Japanese.',
          vietnamese: '主語が明確な場合、主語の名詞は省略できます。動詞は常に句の最後に来ます。'
        },
        {
          type: 'title',
          text: '２. Danh từ (thời gian) + に + Động từ - Time Particle'
        },
        {
          type: 'explanation',
          text: 'The particle に indicates a specific time when an action occurs. Pattern: N は V に ～。 Do not use に with relative time words like きょう, あした, きのう.',
          vietnamese: 'じょし「に」は、アクションが発生する具体的な時間を示します。「は」「V」「に」を含みます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'けさ（あなたは）なんじに おきましたか。',
              vietnamese: 'Sáng nay bạn thức dậy lúc mấy giờ?',
              english: 'What time did you wake up this morning?'
            },
            {
              japanese: 'こんばん（わたしは）どこへ いきますか。',
              vietnamese: 'Tối nay (tôi) sẽ đi đâu?',
              english: 'Where will I go tonight?'
            },
            {
              japanese: 'きのう（あなたは）べんきょうしましたか。',
              vietnamese: 'Hôm qua (bạn) có học bài không?',
              english: 'Did you study yesterday?'
            },
            {
              japanese: 'はい、わたしは べんきょうしました。',
              vietnamese: 'Có, tôi đã học bài.',
              english: 'Yes, I studied.'
            }
          ]
        },
        {
          type: 'note',
          text: 'Do NOT use に with: きょう (today), あした (tomorrow), きのう (yesterday), まいにち (every day), まいあさ (every morning), せんしゅう (last week), こんしゅう (this week), らいしゅう (next week), まいしゅう (every week), まいげつ (every month), ことし (this year), らいねん (next year), せんねん (last year)',
          vietnamese: 'に を使わない時間表現：きょう、あした、きのう、まいにち、まいあさ、せんしゅう、こんしゅう、らいしゅう、まいしゅう、まいげつ、ことし、らいねん、せんねん'
        },
        {
          type: 'title',
          text: '３. N から N まで - Duration or Range'
        },
        {
          type: 'explanation',
          text: 'から indicates the starting point and まで indicates the endpoint. Pattern: N1 から N2 まで です。',
          vietnamese: 'から は開始点、まで は終了点を示します。「N1 から N2 まで」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: '9じから 5じまで はたらきます。',
              vietnamese: 'Tôi làm việc từ 9 giờ sáng đến 5 giờ chiều.',
              english: 'I work from 9 AM to 5 PM.'
            },
            {
              japanese: '10じから べんきょうします。',
              vietnamese: 'Tôi sẽ học bài từ 10 giờ.',
              english: 'I will start studying from 10 AM.'
            }
          ]
        },
        {
          type: 'title',
          text: '４. N と N - Conjunction Particle'
        },
        {
          type: 'explanation',
          text: 'と is used to connect two nouns or to indicate companionship. Pattern: N1 と N2 で V。',
          vietnamese: 'と は二つの名詞を接続するために使用され、友情を示します。「N1 と N2 で V」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'こうえん で ともだち と はなします。',
              vietnamese: 'Tôi nói chuyện với bạn ở công viên.',
              english: 'I talk with my friend in the park.'
            },
            {
              japanese: 'すしと てんぷら を たべます。',
              vietnamese: 'Tôi ăn sushi và tempura.',
              english: 'I eat sushi and tempura.'
            }
          ]
        },
        {
          type: 'title',
          text: '５. ね - Particle for Confirmation'
        },
        {
          type: 'explanation',
          text: 'The particle ね is placed at the end of a sentence to express empathy, confirmation, or to seek agreement from the listener.',
          vietnamese: 'じょし「ね」は、共感、確認、または聞き手からの同意を求めるために文の最後に付けられます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'きょう は いい てんき ですね。',
              vietnamese: 'Hôm nay thời tiết đẹp phải không?',
              english: 'It\'s nice weather today, isn\'t it?'
            },
            {
              japanese: 'あなたも にほんご を べんきょう していますね。',
              vietnamese: 'Bạn cũng đang học tiếng Nhật, phải không?',
              english: 'You are also studying Japanese, aren\'t you?'
            },
            {
              japanese: 'これは こわいですね。',
              vietnamese: 'Cái này đáng sợ phải không?',
              english: 'This is scary, isn\'t it?'
            }
          ]
        },
        {
          type: 'title',
          text: '６. Common Patterns Summary'
        },
        {
          type: 'note',
          text: 'Pattern 1: N + は + V（ます/ません/ました/ませんでした）| Pattern 2: N + は + V + に （時間） | Pattern 3: N1 + から + N2 + まで + V | Pattern 4: N1 + と + N2 | Pattern 5: V + ね',
          vietnamese: 'パターン1：N + は + V（ます/ません/ました/ませんでした）| パターン2：N + は + に（時間）+ V | パターン3：N1 + から + N2 + まで + V | パターン4：N1 + と + N2 | パターン5：V + ね'
        },
        {
          type: 'practice',
          items: [
            {
              meaning: 'Did you study yesterday?',
              usage: 'きのう + は + べんきょう + しました + か'
            },
            {
              meaning: 'I work from 8 AM to 5 PM.',
              usage: '8じ + から + 5じ + まで + はたらきます'
            },
            {
              meaning: 'I talk with my friend.',
              usage: 'ともだち + と + はなします'
            },
            {
              meaning: 'What time did you wake up?',
              usage: 'なんじ + に + おきました + か'
            }
          ]
        }
      ]
    },
    unit6: {
      id: 'unit6',
      title: 'Unit 6: Direct Objects & Actions',
      japaneseTitle: 'ユニット６：ちょくせつもくてき・どうさ',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 6, you will learn how to mark direct objects, express actions, and invite people using various verb forms.',
          vietnamese: 'ユニット６では、直接目的語の標識方法、アクションの表現、および動詞形を使って人を招待する方法を学びます。'
        },
        {
          type: 'title',
          text: '１. Noun + を + Verb - Transitive Verbs'
        },
        {
          type: 'explanation',
          text: 'The particle を indicates the direct object of a transitive verb. Formula: N を V',
          vietnamese: 'じょし「を」は、他動詞の直接目的語を示します。「N を V」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'わたしは こんばん ごはんを たべます。',
              vietnamese: 'Tôi ăn cơm tối nay.',
              english: 'I eat rice tonight.'
            },
            {
              japanese: 'わたしは きのう にほんごを べんきょうしました。',
              vietnamese: 'Tôi đã học tiếng Nhật hôm qua.',
              english: 'I studied Japanese yesterday.'
            }
          ]
        },
        {
          type: 'title',
          text: '２. Noun + を + します - Performing Actions'
        },
        {
          type: 'explanation',
          text: 'The verb します has a wide range of use with nouns to indicate performing an action.',
          vietnamese: '動詞「します」は、名詞と共に様々な行動を示すために広く使用されます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'サッカーを します。',
              vietnamese: 'Tôi chơi bóng đá.',
              english: 'I play soccer.'
            },
            {
              japanese: 'パーティーを します。',
              vietnamese: 'Tôi tổ chức bữa tiệc.',
              english: 'I have a party.'
            },
            {
              japanese: 'しゅくだいを します。',
              vietnamese: 'Tôi làm bài tập về nhà.',
              english: 'I do homework.'
            }
          ]
        },
        {
          type: 'title',
          text: '３. なにを しますか - What Will You Do?'
        },
        {
          type: 'explanation',
          text: 'Used to ask what someone is going to do. Formula: なに を します か。',
          vietnamese: 'だれかが何をするのかを尋ねるために使用されます。「なに を します か」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'なにを しますか。',
              vietnamese: 'Bạn sẽ làm gì?',
              english: 'What are you going to do?'
            }
          ]
        },
        {
          type: 'title',
          text: '４. Nan (なん) vs. Nani (なに) - Question Words'
        },
        {
          type: 'explanation',
          text: 'Both mean "What," but usage depends on context. Use なん before words starting with た, だ, な row sounds (e.g., なんですか) or counter suffixes (e.g., なんさい). Use なに in most other cases, especially before を (e.g., なにをかいますか).',
          vietnamese: '両方「何」を意味しますが、使い方はコンテキストに依存します。「なん」は「た」「だ」「な」行の音の前に使用し、「なに」は他のほとんどの場合に使用します。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'なんですか。',
              vietnamese: 'Cái đó là gì?',
              english: 'What is it?'
            },
            {
              japanese: 'なんさい ですか。',
              vietnamese: 'Bạn bao nhiêu tuổi?',
              english: 'How old are you?'
            },
            {
              japanese: 'なにを かいますか。',
              vietnamese: 'Bạn sẽ mua gì?',
              english: 'What will you buy?'
            }
          ]
        },
        {
          type: 'title',
          text: '５. Noun (Location) + で + Verb - Place of Action'
        },
        {
          type: 'explanation',
          text: 'The particle で indicates the place where an action occurs. Formula: N (place) で V',
          vietnamese: 'じょし「で」は、行動が発生する場所を示します。「N（場所）で V」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'わたしは けさ としょかんで しんぶんを よみました。',
              vietnamese: 'Tôi đọc báo ở thư viện sáng nay.',
              english: 'I read the newspaper at the library this morning.'
            }
          ]
        },
        {
          type: 'title',
          text: '６. Verb + ませんか - Polite Invitation'
        },
        {
          type: 'explanation',
          text: 'A polite way to invite someone to do something or to make a suggestion.',
          vietnamese: 'だれかを何かすることに招待するか、提案をするための丁寧な方法です。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'いっしょに コーヒーを のみませんか。',
              vietnamese: 'Bạn có muốn uống cà phê với tôi không?',
              english: 'Won\'t you drink coffee with me?'
            }
          ]
        },
        {
          type: 'title',
          text: '７. Verb + ましょう - Let\'s...'
        },
        {
          type: 'explanation',
          text: 'Used to suggest an action positively or to accept an invitation. It expresses the speaker\'s intent and assumes the listener will agree.',
          vietnamese: 'アクションを前向きに提案するか、招待を受け入れるために使用されます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'ちょっと やすみましょう。',
              vietnamese: 'Hãy nghỉ một chút.',
              english: 'Let\'s take a break.'
            }
          ]
        },
        {
          type: 'title',
          text: '８. お Prefix - Politeness'
        },
        {
          type: 'explanation',
          text: 'The prefix お is attached to certain nouns to show politeness or respect toward the listener.',
          vietnamese: 'プリフィックス「お」は特定の名詞に付けられて、聞き手に対する丁寧さと尊重を示します。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'おさけ',
              vietnamese: 'Rượu (tôn trọng)',
              english: 'Alcohol (respectful)'
            },
            {
              japanese: 'おちゃ',
              vietnamese: 'Trà (tôn trọng)',
              english: 'Tea (respectful)'
            }
          ]
        },
        {
          type: 'practice',
          items: [
            {
              meaning: 'I eat sushi every day.',
              usage: 'すし + を + たべます + まいにち'
            },
            {
              meaning: 'What will you do tomorrow?',
              usage: 'あした + なに + を + します + か'
            },
            {
              meaning: 'I study at the library in the afternoon.',
              usage: 'ごご + としょかん + で + べんきょう + します'
            },
            {
              meaning: 'Won\'t you play soccer with me?',
              usage: 'いっしょに + サッカー + を + します + ませんか'
            }
          ]
        }
      ]
    },
    unit7: {
      id: 'unit7',
      title: 'Unit 7: Giving & Receiving - Transfer Actions',
      japaneseTitle: 'ユニット７：あげます・もらいます・ならいます',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 7, you will learn about giving, receiving, and borrowing. These are crucial for expressing actions between people.',
          vietnamese: 'ユニット７では、与える、受け取る、および借りるに関する表現を学びます。'
        },
        {
          type: 'title',
          text: '１. Noun (Tool/Means) + で + Verb - Method/Instrument'
        },
        {
          type: 'explanation',
          text: 'The particle で indicates the tool, method, or means by which an action is performed. Formula: N (tool/means) で V',
          vietnamese: 'じょし「で」は、行動が実行される道具、方法、または手段を示します。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'スプーンで たべます。',
              vietnamese: 'Tôi ăn bằng thìa.',
              english: 'I eat with a spoon.'
            }
          ]
        },
        {
          type: 'title',
          text: '２. [Word/Sentence] は [Language]ご で なんですか - Language Translation'
        },
        {
          type: 'explanation',
          text: 'This pattern is used to ask how to say a word or sentence in another language. Formula: [Word/Sentence] は [Language]ご で なん ですか。',
          vietnamese: 'このパターンは、別の言語で単語または文をどのように言うかを尋ねるために使用されます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: '「ありがとう」は えいごで なんですか。',
              vietnamese: '\"Cảm ơn\" trong tiếng Anh là gì?',
              english: 'How do you say "Arigato" in English?'
            },
            {
              japanese: '「Thank you」です。',
              vietnamese: 'Đó là \"Thank you\".',
              english: 'It is "Thank you."'
            }
          ]
        },
        {
          type: 'title',
          text: '３. Giving: N1 は N2 に N3 を あげます/かします/おしえます'
        },
        {
          type: 'explanation',
          text: 'Used when giving objects, lending things, or teaching information to someone. The recipient is marked with に (ni). Verbs: あげます (give), かします (lend), おしえます (teach).',
          vietnamese: 'ものを与えたり、貸したり、情報を教えたりする場合に使用されます。受取人は「に」でマークされます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'わたしは たんじょうびに ははに おくりものを あげました。',
              vietnamese: 'Tôi đã tặng quà cho mẹ vào sinh nhật.',
              english: 'I gave a gift to my mother on her birthday.'
            },
            {
              japanese: 'わたしは ともだちに にほんごを おしえます。',
              vietnamese: 'Tôi dạy tiếng Nhật cho bạn.',
              english: 'I teach Japanese to my friend.'
            },
            {
              japanese: 'わたしは まいにち かれに でんわを かけます。',
              vietnamese: 'Tôi gọi điện cho anh ấy mỗi ngày.',
              english: 'I call him every day.'
            }
          ]
        },
        {
          type: 'title',
          text: '４. Receiving: N1 は N2 に/から N3 を もらいます/かります/ならいます'
        },
        {
          type: 'explanation',
          text: 'Used when receiving objects, borrowing, or learning from someone. に or から can be used for the giver. Verbs: もらいます (receive), かります (borrow), ならいます (learn).',
          vietnamese: 'ものを受け取ったり、借りたり、誰かから学んだりする場合に使用されます。「に」または「から」を使用できます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'わたしは きょねんの クリスマスに ははに シャツを もらいました。',
              vietnamese: 'Tôi nhận áo sơ mi từ mẹ vào Giáng sinh năm ngoái.',
              english: 'I received a shirt from my mother last Christmas.'
            },
            {
              japanese: 'わたしは ちゅうごくじんに ちゅうごくごを ならいます。',
              vietnamese: 'Tôi học tiếng Trung từ một người Trung Quốc.',
              english: 'I learn Chinese from a Chinese person.'
            },
            {
              japanese: 'ぎんこうから おかねを かりました。',
              vietnamese: 'Tôi đã vay tiền từ ngân hàng.',
              english: 'I borrowed money from the bank.'
            }
          ]
        },
        {
          type: 'title',
          text: '５. もう + Verb (Past Tense) - Already'
        },
        {
          type: 'explanation',
          text: 'もう (mou) means "already." It is used with a past tense verb to indicate an action is finished. Formula: もう V-ました',
          vietnamese: 'もう（もう）は「もう」を意味します。過去時制動詞と共に使用されて、行動が完了したことを示します。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'もう にもつを おくりましたか。',
              vietnamese: 'Bạn đã gửi bưu kiện chưa?',
              english: 'Have you sent the mail yet?'
            },
            {
              japanese: 'はい、もう おくりました。',
              vietnamese: 'Có, tôi đã gửi rồi.',
              english: 'Yes, I already sent it.'
            },
            {
              japanese: 'いいえ、まだです。',
              vietnamese: 'Không, chưa.',
              english: 'No, not yet.'
            }
          ]
        },
        {
          type: 'title',
          text: '６. Omission of Particles - Implicit Meaning'
        },
        {
          type: 'explanation',
          text: 'In conversation, particles are sometimes omitted or the topic is understood from context to make the sentence more natural.',
          vietnamese: '会話では、文をより自然にするために、助詞が省略されることがあります。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'この スプーン、 すてきですね。',
              vietnamese: 'Cái muỗng này, xinh đẹp phải không?',
              english: 'This spoon, it\'s pretty!'
            }
          ]
        },
        {
          type: 'practice',
          items: [
            {
              meaning: 'I write with a pen.',
              usage: 'ペン + で + かきます'
            },
            {
              meaning: 'How do you say that in Japanese?',
              usage: 'それ + は + にほんご + で + なん + ですか'
            },
            {
              meaning: 'I gave him a book.',
              usage: 'かれ + に + ほん + を + あげました'
            },
            {
              meaning: 'I already finished my homework.',
              usage: 'もう + しゅくだい + を + しました'
            }
          ]
        }
      ]
    },
    unit8: {
      id: 'unit8',
      title: 'Unit 8: Adjectives - Descriptions & Qualities',
      japaneseTitle: 'ユニット８：けいようし・せつめい',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 8, you will learn about Japanese adjectives and how to use them to describe nouns and characteristics. Adjectives are divided into two categories: i-adjectives and na-adjectives.',
          vietnamese: 'ユニット８では、日本語の形容詞と、それらを使って名詞と特性を説明する方法を学びます。'
        },
        {
          type: 'title',
          text: '１. Introduction to Adjectives'
        },
        {
          type: 'explanation',
          text: 'In Japanese, adjectives describe the state or characteristics of a noun. They are divided into two categories: i-adjectives (い形容詞) and na-adjectives (な形容詞), each with different conjugation rules.',
          vietnamese: '日本語では、形容詞は名詞の状態または特性を説明します。２つのカテゴリに分かれています：い形容詞とな形容詞。'
        },
        {
          type: 'title',
          text: '２. Affirmative & Negative Forms'
        },
        {
          type: 'explanation',
          text: 'Adjectives have different forms for affirmative (positive) and negative statements.',
          vietnamese: '形容詞は肯定文と否定文で異なる形を持ちます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'きょうは ひまです。',
              vietnamese: 'Hôm nay tôi rãnh.',
              english: 'Today is my day off.'
            },
            {
              japanese: 'その ほんは おもしろいです。',
              vietnamese: 'Quyển sách đó thú vị.',
              english: 'That book is interesting.'
            },
            {
              japanese: 'ビエンホアは しずかな まちです。',
              vietnamese: 'Biên Hòa là một thành phố yên tĩnh.',
              english: 'Bien Hoa is a quiet city.'
            },
            {
              japanese: 'うみの みずは きれいじゃ ありません。',
              vietnamese: 'Nước biển không sạch.',
              english: 'The sea water is not clean.'
            },
            {
              japanese: 'にほんごは むずかしくない です。',
              vietnamese: 'Tiếng Nhật không khó.',
              english: 'Japanese is not difficult.'
            },
            {
              japanese: 'いい ですが、よくない です。',
              vietnamese: 'Tốt nhưng không tốt lắm.',
              english: 'Good but not very good.'
            }
          ]
        },
        {
          type: 'title',
          text: '３. Connecting Sentences with が (But)'
        },
        {
          type: 'explanation',
          text: 'Used to connect two sentences with opposing meanings. Formula: Sentence 1 + が, Sentence 2',
          vietnamese: '相反する意味の2つの文を接続するために使用されます。「文1 + が、文2」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'にほんの たべものは おいしいですが、たかいです。',
              vietnamese: 'Thức ăn Nhật rất ngon nhưng đắt.',
              english: 'Japanese food is delicious but expensive.'
            }
          ]
        },
        {
          type: 'title',
          text: '４. Degree Adverbs: とても & あまり'
        },
        {
          type: 'explanation',
          text: 'とても (very) is used in positive sentences. あまり (not very) is used with negative verbs/adjectives.',
          vietnamese: '「とても」は肯定文で使用されます。「あまり」は否定文で使用されます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'わたしの へやは とても きれいです。',
              vietnamese: 'Phòng của tôi rất sạch.',
              english: 'My room is very clean.'
            },
            {
              japanese: 'えいごは あまり むずかしくない です。',
              vietnamese: 'Tiếng Anh không khó lắm.',
              english: 'English is not very difficult.'
            }
          ]
        },
        {
          type: 'title',
          text: '５. N は どうですか - How is N?'
        },
        {
          type: 'explanation',
          text: 'Used to ask for an opinion or impression about something. Formula: N は どう です か。',
          vietnamese: '誰かの意見または印象を求めるために使用されます。「N は どう ですか」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'にほんごは どうですか。',
              vietnamese: 'Tiếng Nhật thế nào?',
              english: 'How is Japanese?'
            },
            {
              japanese: 'むずかしいです。',
              vietnamese: 'Nó khó.',
              english: 'It is difficult.'
            }
          ]
        },
        {
          type: 'title',
          text: '６. N1 は どんな N2 ですか - What kind of N2?'
        },
        {
          type: 'explanation',
          text: 'Used when asking for a description of a specific noun. Formula: N1 は どんな N2 です か。',
          vietnamese: '特定の名詞の説明を求めるために使用されます。「N1 は どんな N2 ですか」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'ビエンホアは どんな まちですか。',
              vietnamese: 'Biên Hòa là thành phố như thế nào?',
              english: 'What kind of city is Bien Hoa?'
            },
            {
              japanese: 'しずかな まちです。',
              vietnamese: 'Đó là một thành phố yên tĩnh.',
              english: 'It is a quiet city.'
            }
          ]
        },
        {
          type: 'title',
          text: '７. そうですね - I see / Let me think'
        },
        {
          type: 'explanation',
          text: 'This phrase is used to show agreement or to give yourself a moment to think before answering a question.',
          vietnamese: 'このフレーズは、同意を示すか、質問に答える前に考える時間を与えるために使用されます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'おしごとは どうですか。',
              vietnamese: 'Công việc thế nào?',
              english: 'How is your work?'
            },
            {
              japanese: 'そうですね。とても おもしろいです。',
              vietnamese: 'Để tôi xem... rất thú vị.',
              english: 'Let me see... it\'s very interesting.'
            }
          ]
        },
      ]
    },
    unit5: {
      id: 'unit5',
      title: 'Unit 5: Movement & Direction - へ・と・いつ',
      japaneseTitle: 'ユニット５：うごき・ほうこう',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 5, you will learn about movement verbs, directional particles, and how to describe where you are going and with whom.',
          vietnamese: 'ユニット５では、移動動詞、方向助詞、および誰とどこに行くかについて学びます。'
        },
        {
          type: 'title',
          text: '１. Noun (Place) + へ + Movement Verb'
        },
        {
          type: 'explanation',
          text: 'The particle へ (pronounced "e") indicates the direction or destination of a movement. Formula: N (place) へ V. Verbs: いきます (go), きます (come), かえります (return home).',
          vietnamese: 'じょし「へ」（「え」と発音）は、移動の方向または目的地を示します。「N（場所）へ V」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'きのう わたしは スーパーへ いきました。',
              vietnamese: 'Hôm qua tôi đã đi siêu thị.',
              english: 'Yesterday, I went to the supermarket.'
            },
            {
              japanese: 'こんばん わたしは 10じに うちへ かえります。',
              vietnamese: 'Tối nay tôi sẽ về nhà lúc 10 giờ.',
              english: 'I will return home at 10 PM tonight.'
            },
            {
              japanese: 'きのう あなたは どこへ いきましたか。',
              vietnamese: 'Hôm qua bạn đã đi đâu?',
              english: 'Did you go anywhere yesterday?'
            },
            {
              japanese: 'いいえ、わたしは どこへも いきませんでした。',
              vietnamese: 'Không, tôi không đi đâu cả.',
              english: 'No, I didn\'t go anywhere.'
            }
          ]
        },
        {
          type: 'title',
          text: '２. どこへも + Verb (Negative) - Not Anywhere'
        },
        {
          type: 'explanation',
          text: 'This pattern means "not going anywhere." Formula: どこへも いきません。',
          vietnamese: 'このパターンは「どこへも行きません」という意味です。「どこ」は「どこへも」に置き換わり、否定の意味になります。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'どこへも いきません。',
              vietnamese: 'Tôi không đi đâu cả.',
              english: 'I\'m not going anywhere.'
            }
          ]
        },
        {
          type: 'title',
          text: '３. Noun (Vehicle) + で + Movement Verb'
        },
        {
          type: 'explanation',
          text: 'The particle で indicates the means of transportation. Formula: N (vehicle) で V. Note: If you go on foot, use あるいて (aruite) without the particle で.',
          vietnamese: 'じょし「で」は、交通手段を示します。徒歩の場合は「あるいて」を使用します。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'けさ わたしは バスで かいしゃへ きました。',
              vietnamese: 'Sáng nay tôi đã đến công ty bằng xe buýt.',
              english: 'This morning, I came to the company by bus.'
            },
            {
              japanese: 'えきから あるいて かえりました。',
              vietnamese: 'Tôi đi bộ từ ga về nhà.',
              english: 'I walked home from the station.'
            }
          ]
        },
        {
          type: 'title',
          text: '４. Noun (Person/Animal) + と + Verb'
        },
        {
          type: 'explanation',
          text: 'The particle と means "with" a person or animal. Formula: N (person) と V. Note: If you do something alone, use ひとりで (hitori de).',
          vietnamese: 'じょし「と」は、人または動物との「一緒に」を意味します。一人でする場合は「ひとりで」を使用します。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'あした わたしは あさ 9じに ともだちと ぎんこうへ いきます。',
              vietnamese: 'Ngày mai sáng lúc 9 giờ tôi sẽ đi ngân hàng với bạn.',
              english: 'Tomorrow morning, I will go to the bank with a friend at 9 AM.'
            },
            {
              japanese: 'わたしは ひとりで うちへ かえります。',
              vietnamese: 'Tôi sẽ về nhà một mình.',
              english: 'I return home alone.'
            }
          ]
        },
        {
          type: 'title',
          text: '５. いつ (When) - Time Questions'
        },
        {
          type: 'explanation',
          text: 'いつ (Itsu) is used to ask "when" an action will happen. It does not require the particle に after it.',
          vietnamese: 'いつ（いつ）は、行動がいつ発生するかを尋ねるために使用されます。「に」助詞は必要ありません。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'あなたは いつ くにへ かえりますか。',
              vietnamese: 'Bạn sẽ về nước khi nào?',
              english: 'When will you return home?'
            }
          ]
        },
        {
          type: 'title',
          text: '６. Particle よ (Yo) - Emphasis'
        },
        {
          type: 'explanation',
          text: 'Placed at the end of a sentence to emphasize new information or express a strong opinion to the listener.',
          vietnamese: '文の最後に置かれて、新しい情報を強調するか、強い意見を表現します。'
        },
        {
          type: 'note',
          text: 'Usage: Used when the speaker wants to inform the listener of something they don\'t know.',
          vietnamese: '使用法：話者が聞き手が知らないことを知らせたいときに使用します。'
        },
        {
          type: 'title',
          text: '７. そうですね (That\'s right / I agree)'
        },
        {
          type: 'explanation',
          text: 'Used to show agreement or sympathy with what the speaker has said.',
          vietnamese: '話者が言ったことに同意または同情を示すために使用されます。'
        },
        {
          type: 'practice',
          items: [
            {
              meaning: 'I went to the market yesterday.',
              usage: 'きのう + いちば + へ + いきました'
            },
            {
              meaning: 'Where did you go by train?',
              usage: 'でんしゃ + で + どこ + へ + いきましたか'
            },
            {
              meaning: 'Will you go with your sister?',
              usage: 'あね + と + いきますか'
            },
            {
              meaning: 'When will you return home?',
              usage: 'いつ + うち + へ + かえりますか'
            }
          ]
        }
      ]
    },
    unit9: {
      id: 'unit9',
      title: 'Unit 9: Preferences & Possession - が Particle',
      japaneseTitle: 'ユニット９：このみ・しょゆう｜が',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 9, you will learn to express preferences, abilities, and possession using the particle が instead of を.',
          vietnamese: 'ユニット９では、「が」を使って好き嫌い、能力、および所有を表現する方法を学びます。'
        },
        {
          type: 'title',
          text: '１. Noun + が + Verb/Adjective - Possession & Understanding'
        },
        {
          type: 'explanation',
          text: 'The particle が is used instead of を to mark the object of certain verbs and adjectives that express preference, ability, or possession.',
          vietnamese: 'じょし「が」は、好み、能力、または所有を表す特定の動詞と形容詞の目的語をマークするために「を」の代わりに使用されます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'あかい くるまが あります。',
              vietnamese: 'Tôi có một chiếc ô tô màu đỏ.',
              english: 'I have a red car.'
            },
            {
              japanese: 'あした やくそくが あります。',
              vietnamese: 'Tôi có một cuộc hẹn vào ngày mai.',
              english: 'I have an appointment tomorrow.'
            },
            {
              japanese: 'えいご と にほんごが わかります。',
              vietnamese: 'Tôi hiểu tiếng Anh và tiếng Nhật.',
              english: 'I understand English and Japanese.'
            }
          ]
        },
        {
          type: 'title',
          text: '２. Preferences & Skills - すきです・きらいです・じょうずです・へたです'
        },
        {
          type: 'explanation',
          text: 'Use が to express preferences and skills with these adjectives.',
          vietnamese: 'これらの形容詞で「が」を使用して、好みとスキルを表現します。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'えいごが じょうずですが、にほんごが へたです。',
              vietnamese: 'Tôi giỏi tiếng Anh nhưng kém tiếng Nhật.',
              english: 'I am good at English but bad at Japanese.'
            },
            {
              japanese: 'えいがが きらいです。',
              vietnamese: 'Tôi ghét phim.',
              english: 'I hate movies.'
            }
          ]
        },
        {
          type: 'title',
          text: '３. どんな + Noun - What Kind Of...?'
        },
        {
          type: 'explanation',
          text: 'Used to ask for a specific category or preference within a group. Formula: どんな N が すき ですか。',
          vietnamese: 'グループ内の特定のカテゴリまたは好みを尋ねるために使用されます。「どんな + N + が + すき + ですか」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'どんな スポーツが すきですか。',
              vietnamese: 'Bạn thích môn thể thao nào?',
              english: 'What kind of sports do you like?'
            },
            {
              japanese: 'テニスが すきです。',
              vietnamese: 'Tôi thích tennis.',
              english: 'I like tennis.'
            },
            {
              japanese: 'どんな たべものが すきですか。',
              vietnamese: 'Bạn thích ăn gì?',
              english: 'What kind of food do you like?'
            },
            {
              japanese: 'ベトナムりょうりが すきです。',
              vietnamese: 'Tôi thích ẩm thực Việt Nam.',
              english: 'I like Vietnamese food.'
            }
          ]
        },
        {
          type: 'title',
          text: '４. Sentence 1 + から + Sentence 2 - Because...'
        },
        {
          type: 'explanation',
          text: 'The particle から connects a reason (Sentence 1) with a result (Sentence 2). Formula: [Reason] から [Result].',
          vietnamese: 'じょし「から」は、理由（文1）と結果（文2）を接続します。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'おかねが ありませんから、どこも いきません。',
              vietnamese: 'Vì tôi không có tiền, tôi không đi đâu.',
              english: 'Because I don\'t have money, I\'m not going anywhere.'
            },
            {
              japanese: 'やくそくが ありますから、はやく かえります。',
              vietnamese: 'Vì tôi có cuộc hẹn, tôi sẽ về sớm.',
              english: 'Because I have an appointment, I\'m going home early.'
            }
          ]
        },
        {
          type: 'title',
          text: '５. どうして (Why?) - Asking for Reasons'
        },
        {
          type: 'explanation',
          text: 'Used to ask for a reason. The answer usually ends with から.',
          vietnamese: '理由を尋ねるために使用されます。答えは通常「から」で終わります。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'どうして あさごはんを たべませんか。',
              vietnamese: 'Tại sao bạn không ăn sáng?',
              english: 'Why don\'t you eat breakfast?'
            },
            {
              japanese: 'じかんが ありませんから。',
              vietnamese: 'Vì tôi không có thời gian.',
              english: 'Because I don\'t have time.'
            }
          ]
        },
        {
          type: 'practice',
          items: [
            {
              meaning: 'I have a dog.',
              usage: 'いぬ + が + あります'
            },
            {
              meaning: 'What sports do you like?',
              usage: 'どんな + スポーツ + が + すき + ですか'
            },
            {
              meaning: 'Because I am busy, I cannot go.',
              usage: 'いそがしい + から + いきません'
            },
            {
              meaning: 'Why don\'t you like Japanese food?',
              usage: 'どうして + にほんりょうり + が + きらい + ですか'
            }
          ]
        }
      ]
    },
    unit10: {
      id: 'unit10',
      title: 'Unit 10: Existence & Location - あります・います',
      japaneseTitle: 'ユニット１０：ばしょ・そんざい',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 10, you will learn to express existence and location using あります and います depending on whether the subject is living or non-living.',
          vietnamese: 'ユニット１０では、主語が生きているか、生きていないかに応じて「あります」と「います」を使って存在と場所を表現する方法を学びます。'
        },
        {
          type: 'title',
          text: '１. Existence: あります vs. います'
        },
        {
          type: 'explanation',
          text: 'In Japanese, the verb for "to exist" or "to have" depends on whether the subject is living or non-living. います is used for living things (people, animals). あります is used for non-living things (objects, plants, events).',
          vietnamese: '日本語では、「存在する」または「持っている」動詞は、主語が生きているか、生きていないかに応じて異なります。「います」は生き物に、「あります」は無生物に使用されます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'わたしの うちに いぬと ねこが います。',
              vietnamese: 'Nhà tôi có một chú chó và một chú mèo.',
              english: 'My house has a dog and a cat.'
            },
            {
              japanese: 'わたしは おかねが たくさん あります。',
              vietnamese: 'Tôi có rất nhiều tiền.',
              english: 'I have a lot of money.'
            }
          ]
        },
        {
          type: 'title',
          text: '２. Location of Existence: [Place] に [Noun] が あります/います'
        },
        {
          type: 'explanation',
          text: 'Use this pattern to say "There is a [Noun] in [Place]." Formula: Place に N が あります/います',
          vietnamese: 'このパターンは「[場所]に[名詞]があります/います」という意味で使われます。「場所 に N が あります/います」という形式で使われます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'にわに おとこのこが います。',
              vietnamese: 'Có một cậu bé ở trong vườn.',
              english: 'There is a child in the garden.'
            },
            {
              japanese: 'つくえの うえに じしょが あります。',
              vietnamese: 'Có một cuốn từ điển trên bàn.',
              english: 'There is a dictionary on the desk.'
            },
            {
              japanese: 'ちかに なにが ありますか。',
              vietnamese: 'Gì ở tầng hầm?',
              english: 'What is in the basement?'
            }
          ]
        },
        {
          type: 'title',
          text: '３. Position of Subject: [Noun] は [Place] に あります/います'
        },
        {
          type: 'explanation',
          text: 'Use this pattern to say "[Noun] is at [Place]." This focuses more on the subject\'s location. Formula: N は Place に あります/います',
          vietnamese: 'このパターンは「[名詞]は[場所]にあります/います」という意味で、主語の位置に焦点を当てます。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'あの おんなののこは うけつけに います。',
              vietnamese: 'Cô gái đó ở quầy lễ tân.',
              english: 'That girl is at the reception desk.'
            },
            {
              japanese: 'ミラーさんは どこに いますか。',
              vietnamese: 'Anh Miller ở đâu?',
              english: 'Where is Mr. Miller?'
            },
            {
              japanese: 'じむしょに います。',
              vietnamese: 'Anh ấy ở văn phòng.',
              english: 'He is in the office.'
            }
          ]
        },
        {
          type: 'title',
          text: '４. Relative Position: N1 (Thing/Place) の N2 (Position)'
        },
        {
          type: 'explanation',
          text: 'To describe specific locations (like "inside the box" or "behind the door"), use the particle の with position words.',
          vietnamese: '「箱の中」または「ドアの後ろ」のような特定の場所を説明するために、「の」を使用してポジション単語を使用します。'
        },
        {
          type: 'note',
          text: 'Position Words: うえ (above/on) | した (below/under) | まえ (in front) | うしろ (behind) | なか (inside) | そと (outside) | となり (next to) | ちかく (near) | あいだ (between)',
          vietnamese: 'ポジション単語：うえ（上）| した（下）| まえ（前）| うしろ（後ろ）| なか（中）| そと（外）| となり（隣）| ちかく（近く）| あいだ（間）'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'ドアの うしろに ねこが います。',
              vietnamese: 'Có một chú mèo ở phía sau cánh cửa.',
              english: 'There is a cat behind the door.'
            },
            {
              japanese: 'こうえんの まえに ぎんこうが あります。',
              vietnamese: 'Có một ngân hàng ở phía trước công viên.',
              english: 'There is a bank in front of the park.'
            },
            {
              japanese: 'おとこのひとと おんなのひとの あいだに パンダが います。',
              vietnamese: 'Có một chú gấu trúc ở giữa người đàn ông và người phụ nữ.',
              english: 'There is a panda between the man and woman.'
            }
          ]
        },
        {
          type: 'title',
          text: '５. Listing Nouns: と vs. や'
        },
        {
          type: 'explanation',
          text: 'と is used to list everything specifically (a complete list). や is used to list a few examples (implies there are other things too). や is often used with など at the end.',
          vietnamese: '「と」はすべてをリストアップするために使用され、「や」は例をリストアップするために使用されます（他にもあることを意味します）。'
        },
        {
          type: 'example',
          examples: [
            {
              japanese: 'かばんの なかに ペンや ほんなどが あります。',
              vietnamese: 'Có những thứ như bút và sách trong cái túi.',
              english: 'There are things like pens and books in the bag.'
            }
          ]
        },
        {
          type: 'practice',
          items: [
            {
              meaning: 'There is a cat in the garden.',
              usage: 'にわ + に + ねこ + が + います'
            },
            {
              meaning: 'I have a lot of books.',
              usage: 'ほん + が + たくさん + あります'
            },
            {
              meaning: 'Where is the teacher?',
              usage: 'せんせい + は + どこ + に + います + か'
            },
            {
              meaning: 'There is a park near my house.',
              usage: 'わたしの うち + の + ちかく + に + こうえん + が + あります'
            }
          ]
        }
      ]
    },
    unit11: {
        id: 'unit11',
        title: 'Unit 11: Counters and Quantities',
        japaneseTitle: 'ユニット１１：かぞえかた・りょう・ひんど',
        content: [
            {
                type: 'explanation',
                text: 'In Unit 11, you will learn Japanese counters, quantity expressions, duration, frequency, and the particle だけ.',
                vietnamese: 'ユニット１１では、日本語の助数詞、数量表現、時間の長さ、頻度表現、「だけ」の使い方を学びます。'
            },

            {
                type: 'title',
                text: '１. Common Counters - Counting Objects and People'
            },

            {
                type: 'explanation',
                text: 'Japanese uses different counters depending on the object type, shape, or category.',
                vietnamese: '日本語では、物の種類や形によって異なる助数詞を使います。'
            },

            {
                type: 'example',
                examples: [
                    {
                    japanese: 'ひとつ、ふたつ、みっつ',
                    vietnamese: 'Một cái, hai cái, ba cái',
                    english: 'One item, two items, three items'
                    },
                    {
                    japanese: 'ひとり、ふたり、さんにん',
                    vietnamese: 'Một người, hai người, ba người',
                    english: 'One person, two people, three people'
                    },
                    {
                    japanese: 'きってを ５まい かいました。',
                    vietnamese: 'Tôi đã mua 5 con tem.',
                    english: 'I bought 5 stamps.'
                    },
                    {
                    japanese: 'パソコンが ２だい あります。',
                    vietnamese: 'Có 2 máy tính.',
                    english: 'There are 2 computers.'
                    }
                ]
            },

            {
                type: 'note',
                text: '~つ: general objects | ~にん: people | ~まい: thin objects | ~だい: machines/vehicles | ~さい: age',
                vietnamese: '〜つ：đồ vật chung｜〜にん：người｜〜まい：vật mỏng｜〜だい：máy móc, xe cộ｜〜さい：tuổi'
            },

            {
                type: 'title',
                text: '２. Time Duration Counters'
            },

            {
                type: 'explanation',
                text: 'Special counters are used for minutes, hours, days, weeks, months, and years.',
                vietnamese: '分、時間、日、週間、か月、年には特別な助数詞があります。'
            },

            {
                type: 'example',
                examples: [
                    {
                    japanese: 'いっぷん',
                    vietnamese: '1 phút',
                    english: '1 minute'
                    },
                    {
                    japanese: 'いちじかん',
                    vietnamese: '1 giờ',
                    english: '1 hour'
                    },
                    {
                    japanese: 'よっか',
                    vietnamese: '4 ngày',
                    english: '4 days'
                    },
                    {
                    japanese: 'いっしゅうかん',
                    vietnamese: '1 tuần',
                    english: '1 week'
                    },
                    {
                    japanese: 'いっかげつ',
                    vietnamese: '1 tháng',
                    english: '1 month'
                    },
                    {
                    japanese: 'いちねん',
                    vietnamese: '1 năm',
                    english: '1 year'
                    }
                ]
            },

            {
                type: 'title',
                text: '３. Sentence Patterns for Quantities'
            },

            {
                type: 'explanation',
                text: 'The quantity expression usually comes after the particle and before the verb.',
                vietnamese: '数量表現は通常、助詞の後、動詞の前に置かれます。'
            },

            {
                type: 'note',
                text: 'Structure: Noun + Particle + Quantity + Verb',
                vietnamese: '文型：名詞 + 助詞 + 数量 + 動詞'
            },

            {
                type: 'example',
                examples: [
                    {
                    japanese: 'こんしゅう りんごを ４つ かいました。',
                    vietnamese: 'Tuần này tôi đã mua 4 quả táo.',
                    english: 'I bought 4 apples this week.'
                    },
                    {
                    japanese: 'わたしは きのう きってを ５まい かいました。',
                    vietnamese: 'Hôm qua tôi đã mua 5 con tem.',
                    english: 'Yesterday, I bought 5 stamps.'
                    }
                ]
            },

            {
                type: 'title',
                text: '４. Asking About Quantity'
            },

            {
                type: 'explanation',
                text: 'Use いくつ or counter question words such as なんにん, なんまい to ask quantity.',
                vietnamese: '数量を尋ねる時、「いくつ」や「なんにん」「なんまい」などを使います。'
            },

            {
                type: 'example',
                examples: [
                    {
                    japanese: 'りんごが いくつ ありますか。',
                    vietnamese: 'Có bao nhiêu quả táo?',
                    english: 'How many apples are there?'
                    },
                    {
                    japanese: '３つ あります。',
                    vietnamese: 'Có 3 quả.',
                    english: 'There are 3.'
                    },
                    {
                    japanese: 'クラスに がくせいが なんにん いますか。',
                    vietnamese: 'Trong lớp có bao nhiêu học sinh?',
                    english: 'How many students are in the class?'
                    }
                ]
            },

            {
                type: 'title',
                text: '５. Duration and Approximate Time'
            },

            {
                type: 'explanation',
                text: 'どのくらい asks about duration. ぐらい expresses approximation.',
                vietnamese: '「どのくらい」は時間の長さを尋ね、「ぐらい」はおよその数量を表します。'
            },

            {
                type: 'example',
                examples: [
                    {
                    japanese: 'うちから がいしゃまで どのくらい かかりますか。',
                    vietnamese: 'Từ nhà đến công ty mất bao lâu?',
                    english: 'How long does it take from home to the company?'
                    },
                    {
                    japanese: '１５ふん ぐらいです。',
                    vietnamese: 'Khoảng 15 phút.',
                    english: 'About 15 minutes.'
                    }
                ]
            },

            {
                type: 'title',
                text: '６. Frequency Expressions'
            },

            {
                type: 'explanation',
                text: 'Frequency is expressed using a time period plus に and ～かい.',
                vietnamese: '頻度は「期間 + に + ～回」を使って表します。'
            },

            {
                type: 'note',
                text: 'Structure: Time Period + に + Number of times (～かい) + Verb',
                vietnamese: '文型：期間 + に + 回数（〜かい）+ 動詞'
            },

            {
                type: 'example',
                examples: [
                    {
                    japanese: '１しゅうかんに ２かい テニスを します。',
                    vietnamese: 'Tôi chơi tennis 2 lần một tuần.',
                    english: 'I play tennis twice a week.'
                    },
                    {
                    japanese: '１かげつに １かい えいがを みます。',
                    vietnamese: 'Tôi xem phim một lần một tháng.',
                    english: 'I watch a movie once a month.'
                    }
                ]
            },
            {
                type: 'title',
                text: '７. だけ - Only'
            },
            {
                type: 'explanation',
                text: 'だけ means "only" or "just" and is placed after nouns or quantities.',
                vietnamese: '「だけ」は「だけ・のみ」を意味し、名詞や数量の後ろに置きます。'
            },

            {
                type: 'example',
                examples: [
                    {
                    japanese: 'やすみの ひは にちようび だけ です。',
                    vietnamese: 'Ngày nghỉ chỉ là Chủ nhật.',
                    english: 'The day off is only Sunday.'
                    },
                    {
                    japanese: 'わたしの クラスに おとこの ひとが ひとり だけ います。',
                    vietnamese: 'Trong lớp tôi chỉ có một nam.',
                    english: 'There is only one man in my class.'
                    }
                ]
            },

            {
                type: 'title',
                text: '８. Common Patterns Summary'
            },

            {
                type: 'note',
                text: 'Pattern 1: N + を + Quantity + V | Pattern 2: N + が + いくつ + ありますか | Pattern 3: Time + に + Frequency + V | Pattern 4: Quantity + ぐらい | Pattern 5: N + だけ',
                vietnamese: 'パターン1：N + を + 数量 + V｜パターン2：N + が + いくつ + ありますか｜パターン3：時間 + に + 頻度 + V｜パターン4：数量 + ぐらい｜パターン5：N + だけ'
            },

            {
                type: 'practice',
                items: [
                    {
                    meaning: 'I bought 3 books.',
                    usage: 'ほんを ３さつ かいました'
                    },
                    {
                    meaning: 'How many people are there?',
                    usage: 'なんにん いますか'
                    },
                    {
                    meaning: 'I study Japanese twice a week.',
                    usage: '１しゅうかんに ２かい にほんごを べんきょうします'
                    },
                    {
                    meaning: 'There is only one teacher.',
                    usage: 'せんせいが ひとり だけ います'
                    }
                ]
            }
        ]
    },
    unit12: {
      id: 'unit12',
      title: 'Unit 12: Past Tense and Comparisons',
      japaneseTitle: 'ユニット１２：かこけい・ひかく',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 12, you will learn how to express past states, compare things, and use superlatives in Japanese.',
          vietnamese: 'ユニット１２では、過去の状態、比較表現、最上級表現の使い方を学びます。'
        },

        {
          type: 'title',
          text: '１. Past Tense of Nouns and Na-Adjectives'
        },

        {
          type: 'explanation',
          text: 'To describe noun and な-adjective states in the past, change です to でした. Negative past uses じゃありませんでした.',
          vietnamese: '名詞とな形容詞の過去形では、「です」を「でした」に変えます。否定過去形は「じゃありませんでした」を使います。'
        },

        {
          type: 'note',
          text: 'Affirmative: ~でした | Negative: ~じゃありませんでした',
          vietnamese: '肯定：〜でした｜否定：〜じゃありませんでした'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'きのうは ひまでした。',
              vietnamese: 'Hôm qua tôi rảnh.',
              english: 'I was free yesterday.'
            },
            {
              japanese: 'しけんは かんたんじゃ ありませんでした。',
              vietnamese: 'Kỳ thi không dễ.',
              english: 'The exam was not easy.'
            },
            {
              japanese: 'まちは にぎやかでした。',
              vietnamese: 'Thành phố đã nhộn nhịp.',
              english: 'The city was lively.'
            }
          ]
        },

        {
          type: 'title',
          text: '２. Past Tense of I-Adjectives'
        },

        {
          type: 'explanation',
          text: 'For い-adjectives, remove the final い before adding the past endings.',
          vietnamese: 'い形容詞では、最後の「い」を取ってから過去形を作ります。'
        },

        {
          type: 'note',
          text: 'Affirmative: ~かったです | Negative: ~くなかったです',
          vietnamese: '肯定：〜かったです｜否定：〜くなかったです'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'きのうは あつかったです。',
              vietnamese: 'Hôm qua trời nóng.',
              english: 'It was hot yesterday.'
            },
            {
              japanese: 'パーティーは あまり たのしくなかったです。',
              vietnamese: 'Bữa tiệc không vui lắm.',
              english: 'The party was not very fun.'
            },
            {
              japanese: 'そのえいがは おもしろかったです。',
              vietnamese: 'Bộ phim đó rất thú vị.',
              english: 'That movie was interesting.'
            }
          ]
        },

        {
          type: 'title',
          text: '３. Comparisons Between Two Items'
        },

        {
          type: 'explanation',
          text: 'Use より to compare two things. The item before より is the comparison standard.',
          vietnamese: '二つのものを比較する時、「より」を使います。「より」の前の名詞が比較対象になります。'
        },

        {
          type: 'note',
          text: 'Structure: N1 は N2 より Adjective です',
          vietnamese: '文型：N1 は N2 より 形容詞です'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'このくるまは あのくるまより おおきいです。',
              vietnamese: 'Chiếc xe này lớn hơn chiếc xe kia.',
              english: 'This car is bigger than that car.'
            },
            {
              japanese: 'にほんごは えいごより むずかしいです。',
              vietnamese: 'Tiếng Nhật khó hơn tiếng Anh.',
              english: 'Japanese is more difficult than English.'
            }
          ]
        },

        {
          type: 'title',
          text: '４. Choosing Between Two Items (どちら)'
        },

        {
          type: 'explanation',
          text: 'どちら is used when comparing or choosing between two items.',
          vietnamese: '「どちら」は二つのものを比較したり選択したりする時に使います。'
        },

        {
          type: 'note',
          text: 'Question: N1 と N2 と どちらが Adjective ですか。 | Answer: N1/N2 のほうが Adjective です。',
          vietnamese: '質問：N1 と N2 と どちらが 形容詞ですか。｜答え：N1/N2 のほうが 形容詞です。'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'にほんごと えいごと どちらが むずかしいですか。',
              vietnamese: 'Tiếng Nhật và tiếng Anh, cái nào khó hơn?',
              english: 'Which is more difficult, Japanese or English?'
            },
            {
              japanese: 'にほんごのほうが むずかしいです。',
              vietnamese: 'Tiếng Nhật khó hơn.',
              english: 'Japanese is more difficult.'
            },
            {
              japanese: 'どちらも おいしいです。',
              vietnamese: 'Cả hai đều ngon.',
              english: 'Both are delicious.'
            }
          ]
        },

        {
          type: 'title',
          text: '５. Superlatives (いちばん)'
        },

        {
          type: 'explanation',
          text: 'いちばん is used to express the most outstanding item within a group.',
          vietnamese: '「いちばん」はグループの中で最も優れているものを表します。'
        },

        {
          type: 'note',
          text: 'Structure: N1 の なかで なに/どこ/だれ/いつ が いちばん Adjective ですか。',
          vietnamese: '文型：N1 の なかで なに/どこ/だれ/いつ が いちばん 形容詞ですか。'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'ベトナムの なかで どこが いちばん きれいですか。',
              vietnamese: 'Ở Việt Nam, nơi nào đẹp nhất?',
              english: 'Which place is the most beautiful in Vietnam?'
            },
            {
              japanese: 'ハノイが いちばん きれいだと おもいます。',
              vietnamese: 'Tôi nghĩ Hà Nội đẹp nhất.',
              english: 'I think Hanoi is the most beautiful.'
            },
            {
              japanese: 'クラスで だれが いちばん せが たかいですか。',
              vietnamese: 'Ai cao nhất lớp?',
              english: 'Who is the tallest in the class?'
            }
          ]
        },

        {
          type: 'title',
          text: '６. Pronoun Replacement with の'
        },

        {
          type: 'explanation',
          text: 'The particle の can replace a noun that has already been mentioned to avoid repetition.',
          vietnamese: '「の」は既に述べた名詞の代わりに使うことができます。'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'カリナさんの かばんは どれですか。',
              vietnamese: 'Cặp của Karina là cái nào?',
              english: 'Which one is Karina’s bag?'
            },
            {
              japanese: 'あの あかいのです。',
              vietnamese: 'Là cái màu đỏ kia.',
              english: 'It is the red one over there.'
            },
            {
              japanese: 'わたしのは このしろいのです。',
              vietnamese: 'Của tôi là cái màu trắng này.',
              english: 'Mine is this white one.'
            }
          ]
        },

        {
          type: 'title',
          text: '７. Common Patterns Summary'
        },

        {
          type: 'note',
          text: 'Pattern 1: N / な-adjective + でした | Pattern 2: い-adjective → ~かったです | Pattern 3: N1 は N2 より Adjective です | Pattern 4: N1 と N2 と どちらが Adjective ですか | Pattern 5: N の なかで いちばん',
          vietnamese: 'パターン1：名詞・な形容詞 + でした｜パターン2：い形容詞 → 〜かったです｜パターン3：N1 は N2 より 形容詞です｜パターン4：N1 と N2 と どちらが 形容詞ですか｜パターン5：N の なかで いちばん'
        },

        {
          type: 'practice',
          items: [
            {
              meaning: 'Yesterday was cold.',
              usage: 'きのうは さむかったです'
            },
            {
              meaning: 'Math was not difficult.',
              usage: 'すうがくは むずかしくなかったです'
            },
            {
              meaning: 'This book is more interesting than that book.',
              usage: 'このほんは あのほんより おもしろいです'
            },
            {
              meaning: 'Which is more convenient, car or train?',
              usage: 'くるまと でんしゃと どちらが べんりですか'
            },
            {
              meaning: 'Tokyo is the most crowded city in Japan.',
              usage: 'にほんで とうきょうが いちばん にぎやかです'
            }
          ]
        }
      ]
    },
    unit13: {
      id: 'unit13',
      title: 'Unit 13: Wants and Purposes',
      japaneseTitle: 'ユニット１３：きぼう・もくてき',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 13, you will learn how to express desires, purposes of movement, indefinite question words, and polite honorific expressions.',
          vietnamese: 'ユニット１３では、欲しいもの、したいこと、移動の目的、不定疑問詞、丁寧な敬語表現を学びます。'
        },

        {
          type: 'title',
          text: '１. ほしいです - Want Something'
        },

        {
          type: 'explanation',
          text: 'ほしいです is used to express that the speaker wants a noun or object.',
          vietnamese: '「ほしいです」は、話者が何か物を欲しい時に使います。'
        },

        {
          type: 'note',
          text: 'Structure: N が ほしいです',
          vietnamese: '文型：N が ほしいです'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'わたしは あたらしい くるまが ほしいです。',
              vietnamese: 'Tôi muốn một chiếc xe mới.',
              english: 'I want a new car.'
            },
            {
              japanese: 'わたしは おおきな いえが ほしいです。',
              vietnamese: 'Tôi muốn một ngôi nhà lớn.',
              english: 'I want a big house.'
            },
            {
              japanese: 'いま カメラが ほしいです。',
              vietnamese: 'Bây giờ tôi muốn máy ảnh.',
              english: 'I want a camera now.'
            }
          ]
        },

        {
          type: 'title',
          text: '２. ～たいです - Want to Do'
        },

        {
          type: 'explanation',
          text: 'たいです is attached to the verb stem to express the desire to do an action.',
          vietnamese: '「たいです」は動詞のます形の語幹に付けて、「〜したい」という希望を表します。'
        },

        {
          type: 'note',
          text: 'Structure: V（ます-stem） + たいです',
          vietnamese: '文型：V（ます形語幹）+ たいです'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'わたしは きょう うちへ はやく かえりたいです。',
              vietnamese: 'Hôm nay tôi muốn về nhà sớm.',
              english: 'I want to go home early today.'
            },
            {
              japanese: 'わたしは スーパーで くろい かばんを かいたいです。',
              vietnamese: 'Tôi muốn mua cái cặp màu đen ở siêu thị.',
              english: 'I want to buy a black bag at the supermarket.'
            },
            {
              japanese: 'にほんへ いきたいです。',
              vietnamese: 'Tôi muốn đi Nhật.',
              english: 'I want to go to Japan.'
            }
          ]
        },

        {
          type: 'note',
          text: 'Do not use ～たいです to directly ask another person’s desire. Use ～ませんか for invitations instead.',
          vietnamese: '相手の希望を直接聞く時には「〜たいです」を使いません。招待には「〜ませんか」を使います。'
        },

        {
          type: 'title',
          text: '３. Purpose of Movement'
        },

        {
          type: 'explanation',
          text: 'Use に with movement verbs to express the purpose of going, coming, or returning somewhere.',
          vietnamese: '移動動詞と一緒に「に」を使って、移動の目的を表します。'
        },

        {
          type: 'note',
          text: 'Structure: Place へ V（ます-stem）/N に いきます・きます・かえります',
          vietnamese: '文型：場所 へ V（ます形語幹）/名詞 に いきます・きます・かえります'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'わたしは スーパーへ おかしを かいに いきます。',
              vietnamese: 'Tôi đi siêu thị để mua bánh kẹo.',
              english: 'I go to the supermarket to buy snacks.'
            },
            {
              japanese: 'わたしは にほんへ けいざいの べんきょうに きました。',
              vietnamese: 'Tôi đến Nhật để học kinh tế.',
              english: 'I came to Japan to study economics.'
            },
            {
              japanese: 'ともだちに あいに いきます。',
              vietnamese: 'Tôi đi gặp bạn.',
              english: 'I go to meet my friend.'
            }
          ]
        },

        {
          type: 'title',
          text: '４. Particles に and へ'
        },

        {
          type: 'explanation',
          text: 'に indicates time or purpose, while へ indicates direction or destination.',
          vietnamese: '「に」は時間や目的を表し、「へ」は方向や目的地を表します。'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'けさ わたしは ７じに うちを でました。',
              vietnamese: 'Sáng nay tôi ra khỏi nhà lúc 7 giờ.',
              english: 'This morning I left home at 7.'
            },
            {
              japanese: 'こんばん わたしは きっさてんに はいります。',
              vietnamese: 'Tối nay tôi sẽ vào quán cà phê.',
              english: 'Tonight I will enter a coffee shop.'
            },
            {
              japanese: 'とうきょうへ いきます。',
              vietnamese: 'Tôi đi Tokyo.',
              english: 'I go to Tokyo.'
            }
          ]
        },

        {
          type: 'title',
          text: '５. どこか and なにか'
        },

        {
          type: 'explanation',
          text: 'どこか means “somewhere” and なにか means “something.” They are used for indefinite questions or statements.',
          vietnamese: '「どこか」は「どこか」、「なにか」は「何か」を意味します。'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'ふゆやすみは どこか いきましたか。',
              vietnamese: 'Kỳ nghỉ đông bạn có đi đâu không?',
              english: 'Did you go somewhere during winter vacation?'
            },
            {
              japanese: 'おなかが すきましたから、なにか たべたいです。',
              vietnamese: 'Vì đói nên tôi muốn ăn cái gì đó.',
              english: 'Because I am hungry, I want to eat something.'
            },
            {
              japanese: 'だれか きましたか。',
              vietnamese: 'Có ai đến không?',
              english: 'Did someone come?'
            }
          ]
        },

        {
          type: 'title',
          text: '６. Honorific Prefix ご〜'
        },

        {
          type: 'explanation',
          text: 'ご is added before certain nouns to make expressions more polite and respectful.',
          vietnamese: '「ご」は名詞の前に付けて、丁寧で敬意のある表現にします。'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'ごちゅうもんは？',
              vietnamese: 'Anh/Chị gọi món gì ạ?',
              english: 'What would you like to order?'
            },
            {
              japanese: 'ごかぞくは おげんきですか。',
              vietnamese: 'Gia đình bạn có khỏe không?',
              english: 'Is your family well?'
            },
            {
              japanese: 'ごしゅっしんは どちらですか。',
              vietnamese: 'Quê quán của bạn ở đâu?',
              english: 'Where are you from?'
            }
          ]
        },

        {
          type: 'title',
          text: '７. Common Patterns Summary'
        },

        {
          type: 'note',
          text: 'Pattern 1: N が ほしいです | Pattern 2: V（ます-stem）+ たいです | Pattern 3: Place へ Purpose に いきます | Pattern 4: どこか / なにか | Pattern 5: ご + Noun',
          vietnamese: 'パターン1：N が ほしいです｜パターン2：V（ます形語幹）+ たいです｜パターン3：場所 へ 目的 に いきます｜パターン4：どこか・なにか｜パターン5：ご + 名詞'
        },

        {
          type: 'practice',
          items: [
            {
              meaning: 'I want a new phone.',
              usage: 'あたらしい でんわが ほしいです'
            },
            {
              meaning: 'I want to eat sushi.',
              usage: 'すしを たべたいです'
            },
            {
              meaning: 'I go to the library to study.',
              usage: 'としょかんへ べんきょうに いきます'
            },
            {
              meaning: 'Did you buy something?',
              usage: 'なにか かいましたか'
            },
            {
              meaning: 'What would you like to drink?',
              usage: 'ごちゅうもんは？'
            }
          ]
        }
      ]
    },
    unit14: {
      id: 'unit14',
      title: 'Unit 14: Te-form and Related Expressions',
      japaneseTitle: 'ユニット１４：てけい・かんれんぶんけい',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 14, you will learn the Japanese て-form, polite requests, progressive tense, offers of help, and important particle usage.',
          vietnamese: 'ユニット１４では、日本語の「て形」、丁寧な依頼、進行形、申し出表現、助詞の使い方を学びます。'
        },

        {
          type: 'title',
          text: '１. Verb Groups and Te-form Conjugation'
        },

        {
          type: 'explanation',
          text: 'Japanese verbs are divided into three groups. The conjugation into て-form depends on the verb group and ending.',
          vietnamese: '日本語の動詞は３つのグループに分かれています。て形への変化は動詞の種類によって異なります。'
        },

        {
          type: 'note',
          text: 'Group I: います/ちます/ります → って | みます/びます/にます → んで | きます → いて | ぎます → いで | します → して | Exception: いきます → いって',
          vietnamese: 'グループI：います・ちます・ります → って｜みます・びます・にます → んで｜きます → いて｜ぎます → いで｜します → して｜例外：いきます → いって'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'かいます → かって',
              vietnamese: 'Mua → hãy mua / mua rồi',
              english: 'buy → buy (te-form)'
            },
            {
              japanese: 'よみます → よんで',
              vietnamese: 'Đọc → hãy đọc / đọc rồi',
              english: 'read → read (te-form)'
            },
            {
              japanese: 'ききます → きいて',
              vietnamese: 'Nghe → hãy nghe',
              english: 'listen → listen (te-form)'
            },
            {
              japanese: 'いそぎます → いそいで',
              vietnamese: 'Vội → hãy vội',
              english: 'hurry → hurry (te-form)'
            },
            {
              japanese: 'はなします → はなして',
              vietnamese: 'Nói → hãy nói',
              english: 'speak → speak (te-form)'
            },
            {
              japanese: 'いきます → いって',
              vietnamese: 'Đi → hãy đi',
              english: 'go → go (te-form)'
            }
          ]
        },

        {
          type: 'note',
          text: 'Group II: Remove ます and add て | Group III: します → して, きます → きて',
          vietnamese: 'グループII：ますを取って「て」を付ける｜グループIII：します → して、きます → きて'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'たべます → たべて',
              vietnamese: 'Ăn → hãy ăn',
              english: 'eat → eat (te-form)'
            },
            {
              japanese: 'ねます → ねて',
              vietnamese: 'Ngủ → hãy ngủ',
              english: 'sleep → sleep (te-form)'
            },
            {
              japanese: 'みます → みて',
              vietnamese: 'Xem → hãy xem',
              english: 'watch → watch (te-form)'
            },
            {
              japanese: 'べんきょうします → べんきょうして',
              vietnamese: 'Học → hãy học',
              english: 'study → study (te-form)'
            },
            {
              japanese: 'きます → きて',
              vietnamese: 'Đến → hãy đến',
              english: 'come → come (te-form)'
            }
          ]
        },

        {
          type: 'title',
          text: '２. ～てください - Polite Requests'
        },

        {
          type: 'explanation',
          text: '～てください is used to politely request or instruct someone to do something.',
          vietnamese: '「〜てください」は、相手に丁寧に依頼や指示をする時に使います。'
        },

        {
          type: 'note',
          text: 'Structure: V（て-form） + ください',
          vietnamese: '文型：V（て形）+ ください'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'すみませんが、ボールペンで かいて ください。',
              vietnamese: 'Xin lỗi, vui lòng viết bằng bút bi.',
              english: 'Excuse me, please write with a ballpoint pen.'
            },
            {
              japanese: 'ここに じゅうしょと なまえを かいて ください。',
              vietnamese: 'Vui lòng viết địa chỉ và tên vào đây.',
              english: 'Please write your address and name here.'
            },
            {
              japanese: 'まって ください。',
              vietnamese: 'Xin hãy đợi.',
              english: 'Please wait.'
            }
          ]
        },

        {
          type: 'title',
          text: '３. ～ています - Present Progressive'
        },

        {
          type: 'explanation',
          text: '～ています is used to describe actions currently in progress.',
          vietnamese: '「〜ています」は、今進行中の動作を表します。'
        },

        {
          type: 'note',
          text: 'Structure: V（て-form） + います',
          vietnamese: '文型：V（て形）+ います'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'いま にほんごを べんきょうして います。',
              vietnamese: 'Bây giờ tôi đang học tiếng Nhật.',
              english: 'I am studying Japanese now.'
            },
            {
              japanese: 'ミラーさんは いま でんわを かけて います。',
              vietnamese: 'Anh Miller đang gọi điện thoại.',
              english: 'Mr. Miller is making a phone call now.'
            },
            {
              japanese: 'こどもが あそんで います。',
              vietnamese: 'Bọn trẻ đang chơi.',
              english: 'The children are playing.'
            }
          ]
        },

        {
          type: 'title',
          text: '４. ～ましょうか - Offering Help'
        },

        {
          type: 'explanation',
          text: '～ましょうか is used when offering to do something for another person.',
          vietnamese: '「〜ましょうか」は、相手のために何かを申し出る時に使います。'
        },

        {
          type: 'note',
          text: 'Structure: V（ます-stem） + ましょうか',
          vietnamese: '文型：V（ます形語幹）+ ましょうか'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'あついですね。まどを あけましょうか。',
              vietnamese: 'Nóng nhỉ. Tôi mở cửa sổ giúp nhé?',
              english: 'It is hot, isn’t it? Shall I open the window?'
            },
            {
              japanese: 'にもつを もちましょうか。',
              vietnamese: 'Tôi mang hành lý giúp nhé?',
              english: 'Shall I carry your luggage?'
            },
            {
              japanese: 'ええ、おねがいします。',
              vietnamese: 'Vâng, nhờ bạn.',
              english: 'Yes, please.'
            }
          ]
        },

        {
          type: 'title',
          text: '５. Particle が for Natural Phenomena'
        },

        {
          type: 'explanation',
          text: 'When describing natural phenomena or objective states, が is often used instead of は.',
          vietnamese: '自然現象や客観的な状態を説明する時、「は」ではなく「が」を使うことがあります。'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'あめが ふって います。',
              vietnamese: 'Trời đang mưa.',
              english: 'It is raining.'
            },
            {
              japanese: 'ゆきが ふって います。',
              vietnamese: 'Trời đang có tuyết.',
              english: 'It is snowing.'
            },
            {
              japanese: 'かぜが つよいです。',
              vietnamese: 'Gió mạnh.',
              english: 'The wind is strong.'
            }
          ]
        },

        {
          type: 'title',
          text: '６. すみませんが vs しつれいですが'
        },

        {
          type: 'explanation',
          text: 'すみませんが is used before requests or to get attention. しつれいですが is used before asking personal or sensitive information.',
          vietnamese: '「すみませんが」は依頼や呼びかけの前に使い、「しつれいですが」は個人的な質問の前に使います。'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'すみませんが、えんぴつを かして ください。',
              vietnamese: 'Xin lỗi, cho tôi mượn bút chì được không?',
              english: 'Excuse me, please lend me a pencil.'
            },
            {
              japanese: 'しつれいですが、おなまえは？',
              vietnamese: 'Xin thất lễ, tên của bạn là gì?',
              english: 'Excuse me, but what is your name?'
            },
            {
              japanese: 'しつれいですが、おいくつですか。',
              vietnamese: 'Xin thất lễ, bạn bao nhiêu tuổi?',
              english: 'Excuse me, but how old are you?'
            }
          ]
        },

        {
          type: 'title',
          text: '７. Common Patterns Summary'
        },

        {
          type: 'note',
          text: 'Pattern 1: V（て-form）+ ください | Pattern 2: V（て-form）+ います | Pattern 3: V（ます-stem）+ ましょうか | Pattern 4: Natural phenomenon + が | Pattern 5: すみませんが / しつれいですが',
          vietnamese: 'パターン1：V（て形）+ ください｜パターン2：V（て形）+ います｜パターン3：V（ます形語幹）+ ましょうか｜パターン4：自然現象 + が｜パターン5：すみませんが・しつれいですが'
        },

        {
          type: 'practice',
          items: [
            {
              meaning: 'Please read this book.',
              usage: 'このほんを よんで ください'
            },
            {
              meaning: 'I am eating lunch now.',
              usage: 'いま ひるごはんを たべて います'
            },
            {
              meaning: 'Shall I help you?',
              usage: 'てつだいましょうか'
            },
            {
              meaning: 'It is raining now.',
              usage: 'あめが ふって います'
            },
            {
              meaning: 'Excuse me, may I ask your address?',
              usage: 'しつれいですが、じゅうしょは？'
            }
          ]
        }
      ]
    },
    unit15: {
      id: 'unit15',
      title: 'Unit 15: Permission, Prohibition, and States',
      japaneseTitle: 'ユニット１５：きょか・きんし・じょうたい',
      content: [
        {
          type: 'explanation',
          text: 'In Unit 15, you will learn how to ask for permission, prohibit actions, express continuing states, and use particles with certain verbs.',
          vietnamese: 'ユニット１５では、許可の求め方、禁止表現、継続状態、および特定の動詞と助詞の使い方を学びます。'
        },

        {
          type: 'title',
          text: '１. ～てもいいです - Asking for Permission'
        },

        {
          type: 'explanation',
          text: '～てもいいです is used to ask for or give permission to do something.',
          vietnamese: '「〜てもいいです」は、何かをしてもよいか尋ねたり、許可を与えたりする時に使います。'
        },

        {
          type: 'note',
          text: 'Question: V（て-form） + も いいですか。 | Permission: V（て-form） + も いいです。',
          vietnamese: '質問：V（て形）+ も いいですか｜許可：V（て形）+ も いいです'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'ここで たばこを すっても いいですか。',
              vietnamese: 'Tôi hút thuốc ở đây có được không?',
              english: 'May I smoke here?'
            },
            {
              japanese: 'ここに すわっても いいですか。',
              vietnamese: 'Tôi ngồi ở đây được không?',
              english: 'May I sit here?'
            },
            {
              japanese: 'ええ、いいですよ。',
              vietnamese: 'Vâng, được chứ.',
              english: 'Yes, of course.'
            }
          ]
        },

        {
          type: 'title',
          text: '２. ～てはいけません - Prohibition'
        },

        {
          type: 'explanation',
          text: '～てはいけません is used to prohibit or forbid actions.',
          vietnamese: '「〜てはいけません」は、禁止や「〜してはいけない」を表します。'
        },

        {
          type: 'note',
          text: 'Structure: V（て-form） + は いけません',
          vietnamese: '文型：V（て形）+ は いけません'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'ここで おさけを のんでは いけません。',
              vietnamese: 'Ở đây không được uống rượu.',
              english: 'You must not drink alcohol here.'
            },
            {
              japanese: 'ここに はいっては いけません。',
              vietnamese: 'Không được vào đây.',
              english: 'You must not enter here.'
            },
            {
              japanese: 'しゃしんを とっては いけません。',
              vietnamese: 'Không được chụp hình.',
              english: 'You must not take photos.'
            }
          ]
        },

        {
          type: 'title',
          text: '３. ～ています - Continuing States and Habits'
        },

        {
          type: 'explanation',
          text: 'In addition to ongoing actions, ～ています can also describe continuing states, occupations, or habitual situations.',
          vietnamese: '「〜ています」は進行中の動作だけでなく、継続状態、職業、習慣も表します。'
        },

        {
          type: 'note',
          text: 'State Result: action completed but result remains | Habit/Occupation: repeated or ongoing activity',
          vietnamese: '状態結果：動作の結果が現在も続く｜習慣・職業：繰り返し行う活動'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'わたしは けっこんして います。',
              vietnamese: 'Tôi đã kết hôn.',
              english: 'I am married.'
            },
            {
              japanese: 'わたしは たなかさんの じゅうしょを しって います。',
              vietnamese: 'Tôi biết địa chỉ của anh Tanaka.',
              english: 'I know Mr. Tanaka’s address.'
            },
            {
              japanese: 'わたしは IMCで はたらいて います。',
              vietnamese: 'Tôi đang làm việc tại công ty IMC.',
              english: 'I work at IMC company.'
            },
            {
              japanese: 'わたしは パワーでんきで コンピューターを つくって います。',
              vietnamese: 'Tôi làm nghề sản xuất máy tính tại công ty Power Electric.',
              english: 'I make computers at Power Electric.'
            }
          ]
        },

        {
          type: 'title',
          text: '４. Particle に with Certain Verbs'
        },

        {
          type: 'explanation',
          text: 'The particle に is used after destination or target nouns with verbs such as はいります, のります, and すわります.',
          vietnamese: '助詞「に」は、「はいります」「のります」「すわります」などの動詞と一緒に使われます。'
        },

        {
          type: 'note',
          text: 'Common verbs: はいります（enter）, のります（ride）, すわります（sit）',
          vietnamese: '代表的な動詞：はいります（入る）、のります（乗る）、すわります（座る）'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'ここに はいっては いけません。',
              vietnamese: 'Không được vào đây.',
              english: 'You must not enter here.'
            },
            {
              japanese: 'ここに すわっても いいですか。',
              vietnamese: 'Tôi ngồi đây được không?',
              english: 'May I sit here?'
            },
            {
              japanese: 'バスに のります。',
              vietnamese: 'Tôi lên xe buýt.',
              english: 'I get on the bus.'
            }
          ]
        },

        {
          type: 'title',
          text: '５. Particle に for Placement Location'
        },

        {
          type: 'explanation',
          text: 'The particle に can indicate the place where something is placed or left after an action.',
          vietnamese: '助詞「に」は、物や人が行動の結果として置かれる場所を示します。'
        },

        {
          type: 'note',
          text: 'Structure: Place に Object を Verb',
          vietnamese: '文型：場所 に 物 を 動詞'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'ここに くるまを とめて ください。',
              vietnamese: 'Hãy đỗ xe ở đây.',
              english: 'Please park the car here.'
            },
            {
              japanese: 'ここに じゅうしょを かいて ください。',
              vietnamese: 'Hãy viết địa chỉ vào đây.',
              english: 'Please write your address here.'
            },
            {
              japanese: 'テーブルに ほんを おきました。',
              vietnamese: 'Tôi đã đặt quyển sách lên bàn.',
              english: 'I placed the book on the table.'
            }
          ]
        },

        {
          type: 'title',
          text: '６. Common Response Patterns'
        },

        {
          type: 'explanation',
          text: 'There are common ways to respond to permission and prohibition expressions.',
          vietnamese: '許可や禁止の表現には、よく使われる返答パターンがあります。'
        },

        {
          type: 'example',
          examples: [
            {
              japanese: 'ええ、いいですよ。',
              vietnamese: 'Vâng, được chứ.',
              english: 'Yes, that is fine.'
            },
            {
              japanese: 'すみませんが、ちょっと…',
              vietnamese: 'Xin lỗi nhưng hơi khó...',
              english: 'I am sorry, but...'
            },
            {
              japanese: 'いいえ、いけません。',
              vietnamese: 'Không, không được.',
              english: 'No, you may not.'
            }
          ]
        },

        {
          type: 'title',
          text: '７. Common Patterns Summary'
        },

        {
          type: 'note',
          text: 'Pattern 1: V（て-form）+ も いいですか | Pattern 2: V（て-form）+ は いけません | Pattern 3: V（て-form）+ います | Pattern 4: Place に + movement verb | Pattern 5: Place に Object を V',
          vietnamese: 'パターン1：V（て形）+ も いいですか｜パターン2：V（て形）+ は いけません｜パターン3：V（て形）+ います｜パターン4：場所 に + 移動動詞｜パターン5：場所 に 物 を V'
        },

        {
          type: 'practice',
          items: [
            {
              meaning: 'May I use this computer?',
              usage: 'この コンピューターを つかっても いいですか'
            },
            {
              meaning: 'You must not swim here.',
              usage: 'ここで およいでは いけません'
            },
            {
              meaning: 'I know Mr. Sato.',
              usage: 'さとうさんを しって います'
            },
            {
              meaning: 'Please put the bag here.',
              usage: 'ここに かばんを おいて ください'
            },
            {
              meaning: 'I work at a bank.',
              usage: 'ぎんこうで はたらいて います'
            }
          ]
        }
      ]
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const renderContent = (content: GrammarContent, index: number) => {
    switch (content.type) {
      case 'title':
        return (
          <h3 key={index} className="grammar-section-title">
            {content.text}
          </h3>
        );

      case 'explanation':
        return (
          <div key={index} className="grammar-explanation">
            <p className="english">{content.text}</p>
            {content.vietnamese && <p className="vietnamese">【{content.vietnamese}】</p>}
          </div>
        );

      case 'example':
        return (
          <div key={index} className="grammar-examples">
            {content.examples?.map((ex, idx) => (
              <div key={idx} className="example-item">
                <div className="example-japanese">{ex.japanese}</div>
                <div className="example-translation">
                  <span className="english">→ {ex.english}</span>
                  <span className="vietnamese">→ {ex.vietnamese}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'note':
        return (
          <div key={index} className="grammar-note">
            <p className="english">
              <strong>💡 {content.text}</strong>
            </p>
            {content.vietnamese && (
              <p className="vietnamese">
                <strong>【{content.vietnamese}】</strong>
              </p>
            )}
          </div>
        );

      case 'practice':
        return (
          <div key={index} className="grammar-practice">
            {content.items?.map((item, idx) => (
              <div key={idx} className="practice-item">
                <div className="practice-meaning">{item.meaning}</div>
                <div className="practice-hint">💡 {item.usage}</div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const lesson = grammarLessons[selectedUnit];

  return (
    <div className="grammar-container">
      <div className="grammar-sidebar">
        <h2 className="grammar-sidebar-title">📚 Grammar Units</h2>
        <div className="grammar-units-list">
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit1' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit1')}
          >
            <span className="unit-number">1</span>
            <span className="unit-name">Unit 1</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit2' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit2')}
          >
            <span className="unit-number">2</span>
            <span className="unit-name">Unit 2</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit3' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit3')}
          >
            <span className="unit-number">3</span>
            <span className="unit-name">Unit 3</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit4' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit4')}
          >
            <span className="unit-number">4</span>
            <span className="unit-name">Unit 4</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit5' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit5')}
          >
            <span className="unit-number">5</span>
            <span className="unit-name">Unit 5</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit6' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit6')}
          >
            <span className="unit-number">6</span>
            <span className="unit-name">Unit 6</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit7' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit7')}
          >
            <span className="unit-number">7</span>
            <span className="unit-name">Unit 7</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit8' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit8')}
          >
            <span className="unit-number">8</span>
            <span className="unit-name">Unit 8</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit9' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit9')}
          >
            <span className="unit-number">9</span>
            <span className="unit-name">Unit 9</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit10' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit10')}
          >
            <span className="unit-number">10</span>
            <span className="unit-name">Unit 10</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit11' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit11')}
          >
            <span className="unit-number">11</span>
            <span className="unit-name">Unit 11</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit12' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit12')}
          >
            <span className="unit-number">12</span>
            <span className="unit-name">Unit 12</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit13' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit13')}
          >
            <span className="unit-number">13</span>
            <span className="unit-name">Unit 13</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit14' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit14')}
          >
            <span className="unit-number">14</span>
            <span className="unit-name">Unit 14</span>
          </button>
          <button
            className={`grammar-unit-btn ${selectedUnit === 'unit15' ? 'active' : ''}`}
            onClick={() => setSelectedUnit('unit15')}
          >
            <span className="unit-number">15</span>
            <span className="unit-name">Unit 15</span>
          </button>
        </div>
      </div>

      <div className="grammar-main">
        <div className="grammar-header">
          <h1 className="grammar-title">{lesson.title}</h1>
          <p className="grammar-subtitle">{lesson.japaneseTitle}</p>
        </div>

        <div className="grammar-content">
          {lesson.content.map((contentItem, index) => (
            <div key={index}>{renderContent(contentItem, index)}</div>
          ))}
        </div>

        <div className="grammar-footer">
          <button className="grammar-nav-btn prev" onClick={() => onNavigate?.('home')}>
            ← Back to Home
          </button>
          <button 
            className="grammar-nav-btn next" 
            onClick={() => {
              const units = ['unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 'unit7', 'unit8', 'unit9', 'unit10', 'unit11', 'unit12', 'unit13', 'unit14', 'unit15'];
              const currentIndex = units.indexOf(selectedUnit);
              if (currentIndex < units.length - 1) {
                setSelectedUnit(units[currentIndex + 1]);
              }
            }}
            disabled={selectedUnit === 'unit15'}
          >
            Next Unit →
          </button>
        </div>
      </div>
    </div>
  );
};
