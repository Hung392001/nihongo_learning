export interface GrammarExample {
  japanese: string;
  furigana?: string;
  english: string;
  vietnamese: string;
}

export interface GrammarItem {
  particle?: string;
  meaning: string;
  vietnameseMeaning?: string;
  usage: string;
  vietnameseUsage?: string;
  examples?: string[];
}

export interface TextItem {
  text?: string;
  english?: string;
  vietnamese?: string;
  structure?: string;
}

export interface GrammarContent {
  type: 'title' | 'explanation' | 'particle' | 'example' | 'note' | 'practice' | 'table';
  text?: string | TextItem[];
  japanese?: string;
  english?: string;
  vietnamese?: string;
  structure?: string;
  examples?: GrammarExample[];
  items?: GrammarItem[];
}

export interface TitleContent {
  english?: string;
  vietnamese?: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  content: GrammarContent[];
}
