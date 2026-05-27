export interface GrammarExample {
  japanese: string;
  furigana?: string;
  english: string;
  vietnamese: string;
}

export interface GrammarItem {
  particle?: string;
  meaning: string;
  usage: string;
  examples?: string[];
}

export interface TextItem {
  text: string;
  vietnamese?: string;
}

export interface GrammarContent {
  type: 'title' | 'explanation' | 'particle' | 'example' | 'note' | 'practice';
  text?: string | TextItem[];
  japanese?: string;
  vietnamese?: string;
  examples?: GrammarExample[];
  items?: GrammarItem[];
}

export interface GrammarLesson {
  id: string;
  title: string;
  content: GrammarContent[];
}
