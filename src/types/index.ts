export type JLPTLevel = 'ALL' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export interface WordItem {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  jlpt: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  partOfSpeech?: string;
  note?: string;
}

export interface DialogueTurn {
  id: string;
  speaker: string;
  role: 'user' | 'partner' | 'narrator';
  avatar?: string;
  text: string;
  reading?: string;
  translation: string;
  words?: WordItem[];
  culturalTip?: string;
}

export interface ConversationScenario {
  id: string;
  title: string;
  subtitle: string;
  category: 'convenience' | 'izakaya' | 'travel' | 'work' | 'subculture' | 'daily' | 'shopping' | 'hospital' | 'lifestyle' | 'business';
  jlpt: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  description: string;
  turns: DialogueTurn[];
}

export interface ReadingSentence {
  original: string;
  ruby: string; // HTML-friendly or structured
  translation: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  format: 'tweet' | 'blog' | 'lightnovel' | 'column';
  author?: string;
  authorHandle?: string;
  timestamp?: string;
  jlpt: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  topicTag: string;
  sentences: ReadingSentence[];
  vocabulary: WordItem[];
  culturalInsight?: string;
}

export interface MemeItem {
  id: string;
  term: string;
  reading: string;
  romaji: string;
  meaning: string;
  origin: string; // 2ch/5ch, X, TikTok, NicoNico, etc.
  category: 'net_slang' | 'sns' | 'otaku' | 'buzzword';
  dangerLevel: 'safe' | 'caution' | 'danger';
  dangerLabel: string;
  dangerExplanation: string;
  example: string;
  exampleReading: string;
  exampleMeaning: string;
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  tags: string[];
}

export interface RetroWordItem {
  id: string;
  term: string;
  reading: string;
  era: 'showa_70s' | 'bubble_80s' | 'heisei_90s' | 'heisei_00s';
  eraLabel: string;
  literalMeaning: string;
  actualUsage: string;
  modernEquivalents: string[];
  backgroundStory: string;
  reactionLevel: '폭소' | '아재 취급' | '어리둥절' | '레트로 멋쟁이';
  example: string;
  exampleMeaning: string;
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export interface QuizQuestion {
  id: string;
  category: 'meme' | 'retro' | 'dialogue' | 'reading';
  jlpt?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  question: string;
  contextSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
