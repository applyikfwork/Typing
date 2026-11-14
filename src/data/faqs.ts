export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'exam' | 'hindi' | 'scoring';
}

export const FREQUENTLY_ASKED_QUESTIONS: FAQItem[] = [
  {
    category: 'scoring',
    question: 'How is Words Per Minute (WPM) calculated on TypeBharat?',
    answer: 'TypeBharat follows the international typing convention where one "word" is standardized as exactly 5 characters (letters, spaces, and punctuation). Standard WPM is calculated as: (Correct Characters / 5) / (Elapsed Time in Minutes). This ensures fair measurement regardless of whether a passage has long or short words.',
  },
  {
    category: 'scoring',
    question: 'What is the difference between Gross WPM and Net WPM?',
    answer: 'Gross WPM measures your raw keystroke rate regardless of errors: (Total Characters Typed / 5) / Minutes. Net WPM factors in your uncorrected errors: Gross WPM - (Errors / Minutes). Examination authorities such as SSC and CPCT evaluate qualifying speed using Net WPM standards.',
  },
  {
    category: 'exam',
    question: 'What typing speed is required for SSC CHSL and SSC CGL?',
    answer: 'For SSC CHSL (LDC/JSA), the standard requirement is 35 WPM in English (equivalent to 10,500 key depressions per hour) or 30 WPM in Hindi (9,000 KDPH) in a 10-minute test. For SSC CGL DEST, the benchmark is 2,000 key depressions in 15 minutes (approx 27 WPM). Permissible error rates usually range between 5% and 7% for Unreserved candidates.',
  },
  {
    category: 'exam',
    question: 'What are the qualifying speed slabs in the MP CPCT Exam?',
    answer: 'For the MP CPCT (Computer Proficiency Certification Test), the minimum qualifying benchmark is 30 Net WPM in English and 20 Net WPM in Hindi. Higher speed slabs award higher percentiles: English 30-40 WPM (50%), 41-50 WPM (60%), 51-60 WPM (70%), 61-70 WPM (80%), and 71+ WPM (90%). Hindi slabs start at 20-25 WPM (50%) up to 41+ WPM (90%).',
  },
  {
    category: 'hindi',
    question: 'How do I type in Hindi Unicode on TypeBharat?',
    answer: 'TypeBharat natively evaluates Hindi in standard Devanagari Unicode. To type, enable Hindi keyboard input on your operating system (such as Windows Inscript Keyboard, Hindi Indic Input, or Google Input Tools). On Windows, you can add it via Settings -> Time & Language -> Language -> Add Hindi. On mobile phones, switch your Gboard or keyboard language to Hindi.',
  },
  {
    category: 'hindi',
    question: 'Which Hindi layout should I learn: Inscript or Remington Gail?',
    answer: 'Inscript is the official keyboard layout standardized by the Indian Department of Electronics and is built into all modern operating systems without third-party software. Remington Gail layout is based on traditional mechanical typewriter keys. If starting fresh, Inscript is highly recommended. However, both are accepted in exams like CPCT.',
  },
  {
    category: 'general',
    question: 'Does TypeBharat save my typing passages or personal data on a server?',
    answer: 'No. TypeBharat operates completely client-side in your web browser. Your completed test history, personal best speeds, accuracy records, and settings are stored locally on your device via HTML5 LocalStorage. No registration, login, or personal details are required.',
  },
  {
    category: 'general',
    question: 'How much daily practice is recommended to improve typing speed?',
    answer: 'Consistent daily practice of 15 to 25 minutes is vastly more effective than typing for two hours once a week. Focusing on finger positioning, eliminating looking down at the keyboard, and maintaining 95%+ accuracy typically yields an improvement of 10 to 15 WPM within 3 to 4 weeks.',
  },
  {
    category: 'general',
    question: 'Can I use TypeBharat on a mobile phone or tablet?',
    answer: 'Yes! TypeBharat is fully responsive. On smartphones, our typing arena integrates with mobile virtual keyboards and supports composition events for phonetic and Devanagari typing. You can also connect a USB or Bluetooth physical keyboard to your tablet or mobile phone for authentic exam preparation.',
  },
];
