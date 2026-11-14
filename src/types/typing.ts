export type Language = 'english' | 'hindi';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type TestMode = 'timed' | 'practice' | 'exam' | 'words' | 'sentences' | 'free';

export type PracticeCategory = 
  | 'home-row'
  | 'top-row'
  | 'bottom-row'
  | 'numbers-symbols'
  | 'common-words'
  | 'sentences'
  | 'speed-builder'
  | 'accuracy-focus'
  | 'general'
  | 'hindi-matras'
  | 'hindi-conjuncts'
  | 'hindi-words'
  | 'hindi-sentences';

export type ExamType = 
  | 'general'
  | 'cpct-english'
  | 'cpct-hindi'
  | 'ssc-chsl'
  | 'ssc-cgl'
  | 'railway-rrb'
  | 'court-typist';

export interface Passage {
  id: string;
  title: string;
  text: string;
  language: Language;
  difficulty: Difficulty;
  category: string;
  wordCount: number;
  characterCount: number;
  source?: string;
}

export interface TestResult {
  id: string;
  timestamp: number;
  dateString: string;
  language: Language;
  mode: TestMode;
  durationSeconds: number;
  elapsedSeconds: number;
  grossWpm: number;
  netWpm: number;
  standardWpm: number; // (correctChars / 5) / (elapsedMinutes)
  accuracy: number;
  totalCharsTyped: number;
  correctChars: number;
  incorrectChars: number;
  backspacesUsed: number;
  passageId: string;
  passageTitle: string;
  examType?: ExamType;
  examPassed?: boolean;
  keyErrors: Record<string, number>;
}

export interface UserStats {
  totalTestsTaken: number;
  totalTimeTypedMinutes: number;
  personalBestWpm: number;
  averageWpm: number;
  bestAccuracy: number;
  averageAccuracy: number;
  recentResults: TestResult[];
  weakKeys: Record<string, number>;
  practiceDaysStreak: number;
  lastPracticeDate: string;
}

export interface ExamConfig {
  id: ExamType;
  name: string;
  shortName: string;
  conductingBody: string;
  officialUrl: string;
  language: Language;
  durationMinutes: number;
  targetSpeedWpm: number;
  targetDepressionsPerHour?: number;
  maxErrorRatePercent: number;
  backspaceAllowed: boolean;
  rulesDescription: string[];
  calculationMethod: string;
  officialPatternNotes: string[];
  disclaimer: string;
}

export interface TypingSettings {
  soundEnabled: boolean;
  keyboardGuideVisible: boolean;
  fontSize: 'small' | 'medium' | 'large';
  strictMode: boolean; // Cannot proceed if current char is wrong
  smoothCaret: boolean;
}
