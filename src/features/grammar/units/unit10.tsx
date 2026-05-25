import { GrammarLesson } from './types';

export const unit10: GrammarLesson = {
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
};
